const path = require("path");
const { Project, SymbolFlags, TypeFormatFlags } = require("ts-morph");

const defaultTsConfigFilePath = path.join(process.cwd(), "tsconfig.json");

const projects = new Map();

const project = tsConfigFilePath => {
  const project = projects.get(tsConfigFilePath);
  const result =
    project ??
    new Project({
      tsConfigFilePath,
    });
  projects.set(tsConfigFilePath, result);
  return result;
};
/**
 * You have a type A that depends on type C that depends on type B through
 * a complex or just somewhat complex set of manipulations - Pick, Omit,
 * typeof const or whatever else.
 *
 * You want to make it visible that changes in type B change type A in
 * a more explicit way.
 *
 * Solution:
 * Create a test where you have a snapshot of a type which turns a complex type
 * into plain structure without all the complexities. That is - when type B changes
 * you would explicitly see all the types/interfaces it affected.
 */
function typeFootprint(fileName, typeName, opts) {
  const p = project(opts?.tsConfigFilePath ?? defaultTsConfigFilePath);
  const s = p.addSourceFileAtPath(fileName);
  const a = s.getTypeAliasOrThrow(typeName);
  const t = a.getType();

  const text = footprintOfType({
    type: t,
    node: a,
    overrides: opts?.overrides,
  });

  return `type ${typeName} = ` + text;
}

module.exports = { typeFootprint };

function isPrimitive(type) {
  if (type.isString()) {
    return true;
  }
  if (type.isStringLiteral()) {
    return true;
  }
  if (type.isUndefined()) {
    return true;
  }
  if (type.isNull()) {
    return true;
  }
  if (type.isUnknown()) {
    return true;
  }
  if (type.isAny()) {
    return true;
  }
  if (type.isNumber()) {
    return true;
  }
  if (type.isNumberLiteral()) {
    return true;
  }
  if (type.isBoolean()) {
    return true;
  }
  if (type.isBooleanLiteral()) {
    return true;
  }
  if (intrinsicNameOf(type) === "void") {
    // isVoid
    return true;
  }
  return false;
}

function isPromise(type) {
  const symbol = type.getSymbol();
  if (!type.isObject() || !symbol) {
    return false;
  }
  const args = type.getTypeArguments();
  return symbol.getName() === "Promise" && args.length === 1;
}

function isSimpleSignature(type) {
  if (!type.isObject()) {
    return false;
  }
  const sigs = type.getCallSignatures();
  const props = type.getProperties();
  const args = type.getTypeArguments();
  const indexType = type.getNumberIndexType();
  const stringType = type.getStringIndexType();
  return (
    sigs.length === 1 &&
    props.length === 0 &&
    args.length === 0 &&
    !indexType &&
    !stringType
  );
}

function intrinsicNameOf(type) {
  return type.compilerType.intrinsicName;
}

function footprintOfType(params) {
  const { type, node, overrides, flags = [], callStackLevel = 0 } = params;

  if (callStackLevel > 2) {
    // too deep?
    return "'...'";
  }

  const next = (nextType, nextFlags = []) => {
    return footprintOfType({
      type: nextType,
      node,
      overrides,
      flags: nextFlags,
      callStackLevel: callStackLevel + 1,
    });
  };

  const indent = (text, lvl = 1) => text.replace(/^/gm, " ".repeat(lvl * 2));

  const defaultFormat = () => {
    return type.getText(
      node,
      TypeFormatFlags.UseSingleQuotesForStringLiteralType,
    );
  };

  const symbol = type.getAliasSymbol();
  if (overrides && symbol) {
    const result = overrides[symbol.getName()];
    if (result) {
      return result;
    }
  }

  if (isPrimitive(type)) {
    return defaultFormat();
  }

  if (type.isArray()) {
    const subType = type.getArrayElementTypeOrThrow();
    if (isPrimitive(subType)) {
      return `${next(subType)}[]`;
    } else {
      return `Array<\n${indent(next(subType))}\n>`;
    }
  }

  if (type.isTuple()) {
    const types = type.getTupleElements();
    return [
      "[\n",
      indent(types.map(type => next(type)).join(",\n")),
      "\n]",
    ].join("");
  }

  if (type.isObject() && isPromise(type)) {
    const first = type.getTypeArguments()[0];
    if (!first) {
      throw new Error("This should not have happened");
    }
    if (isPrimitive(first)) {
      return `Promise<${next(first)}>`;
    } else {
      return `Promise<\n${indent(next(first))}\n>`;
    }
  }

  if (type.isObject() && isSimpleSignature(type)) {
    return signatures(type.getCallSignatures(), "type", next);
  }

  if (type.isObject()) {
    const props = type.getProperties();
    const sigs = type.getCallSignatures();
    const numIndex = type.getNumberIndexType();
    const stringIndex = type.getStringIndexType();
    if (props.length === 0 && sigs.length === 0 && !numIndex && !stringIndex) {
      return "{}";
    }
    const sigsText = signatures(sigs, "declaration", next);
    const propsText = properties(props, node, next);
    const numIndexText = numIndex && `[index: number]: ${next(numIndex)};`;
    const stringIndexText =
      stringIndex && `[index: string]: ${next(stringIndex)};`;
    return [
      "{\n",
      numIndexText && indent(numIndexText),
      stringIndexText && indent(stringIndexText),
      sigs.length > 0 && indent(sigsText),
      props.length > 0 && indent(propsText),
      "\n}",
    ]
      .filter(Boolean)
      .join("");
  }

  if (type.isUnion()) {
    return type
      .getUnionTypes()
      .filter(type => {
        if (flags.includes("remove-undefined-from-intersections")) {
          return !type.isUndefined();
        }
        return true;
      })
      .map(type => next(type))
      .join(" | ");
  }

  if (type.isIntersection()) {
    console.log(
      "%cty",
      "color: #e57373",
      type.getIntersectionTypes().forEach(type => {
        console.log(type.getText());
      }),
    );
    return type
      .getIntersectionTypes()
      .map(type => next(type))
      .join(" & ");
  }

  // when you encounter this, consider changing the function
  return "TODO";
}

function properties(props, node, next) {
  return props.map(value => property(value, node, next)).join("\n");
}

function property(prop, node, next) {
  const type = prop.getTypeAtLocation(node);
  const sigs = type.getCallSignatures();
  const firstSig = sigs?.[0];
  if (
    isSimpleSignature(type) &&
    !prop.hasFlags(SymbolFlags.Optional) &&
    firstSig
  ) {
    return signature(firstSig, "declaration", next, prop.getName()) + ";";
  }
  const isOptional = prop.hasFlags(SymbolFlags.Optional);
  return [
    prop.getName(),
    isOptional ? "?" : "",
    ": ",
    next(type, [isOptional && "remove-undefined-from-intersections"]),
    ";",
  ].join("");
}

function signatures(sigs, variant, next) {
  return sigs.map(sig => signature(sig, variant, next)).join("\n");
}

function signature(sig, variant, next, methodName) {
  const name = sig.getDeclaration().getSymbol()?.getName();
  const nameToUse =
    methodName ?? (["__type", "__call"].includes(name ?? "") ? "" : name);
  const params = sig.getParameters();
  return [
    variant === "declaration" ? nameToUse : "",
    "(",
    params
      .map(param =>
        [
          param.getName(),
          param.hasFlags(SymbolFlags.Optional) ? "?" : "",
          ": ",
          param
            .getDeclarations()
            .map(decl => next(decl.getType(), []))
            .join(","),
        ].join(""),
      )
      .join(", "),
    ")",
    variant === "declaration" ? ": " : " => ",
    next(sig.getReturnType(), []),
  ].join("");
}
