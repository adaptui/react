// THIS FILE IS FOR DEBUGGING

const fs = require("fs");
const path = require("path");
const { Project, ts } = require("ts-morph");

const accordionPath = path.join(
  process.cwd(),
  "src/Accordion/AccordionState.ts",
);
const rootPath = process.cwd();

const project = new Project({
  tsConfigFilePath: path.join(rootPath, "tsconfig.json"),
  addFilesFromTsConfig: false,
});

console.log(accordionPath);
const sourceFiles = project.addSourceFilesAtPaths([accordionPath]);
project.resolveSourceFileDependencies();
const stateTypes = [];
const types = {};
const created = [];

sourceFiles.forEach(sourceFile => {
  sourceFile.forEachChild(node => {
    if (isStateReturnDeclaration(node)) {
      const propTypes = createPropTypeObjects(rootPath, node);
      stateTypes.push(...propTypes.map(prop => prop.name));
    }
    if (isPropsDeclaration(node)) {
      const moduleName = getModuleName(node);
      const propTypes = createPropTypeObjects(rootPath, node);

      if (isInitialStateDeclaration(node)) {
        types[moduleName] = propTypes;
      } else {
        const propTypesWithoutState = propTypes.filter(
          prop => !stateTypes.includes(prop.name),
        );
        const propTypesReturnedByState = propTypes.filter(prop =>
          stateTypes.includes(prop.name),
        );
        types[moduleName] = propTypesWithoutState;
        types[moduleName].stateProps = propTypesReturnedByState;
      }
    }
  });
});

console.log(types, stateTypes);

/**
 * @param {string} rootPath
 * @param {import("ts-morph").Node<Node>} node
 */
function createPropTypeObjects(rootPath, node) {
  return getProps(node).map(prop => createPropTypeObject(rootPath, prop));
}

/**
 * @param {string} rootPath
 * @param {import("ts-morph").Symbol} prop
 */
function createPropTypeObject(rootPath, prop) {
  return {
    name: prop.getEscapedName(),
    description: getComment(prop),
    type: getPropType(rootPath, prop),
  };
}

/**
 * @param {import("ts-morph").Node<Node>} node
 */
function getModuleName(node) {
  return getEscapedName(node)
    .replace("unstable_", "")
    .replace(/^(.+)InitialState$/, "use$1State")
    .replace(/^(.+)StateReturn$/, "$1State")
    .replace("Options", "");
}

/**
 * @param {string} rootPath
 * @param {import("ts-morph").Symbol} prop
 */
function getPropType(rootPath, prop) {
  const declaration = getDeclaration(prop);
  const type = declaration
    .getType()
    .getText(undefined, ts.TypeFormatFlags.InTypeAlias);

  const encode = text =>
    text.replace(/[\u00A0-\u9999<>&"]/gim, i => `&#${i.charCodeAt(0)};`);

  if (type.length > 50) {
    return `<code title="${encode(type)}">${encode(
      type.substring(0, 47),
    )}...</code>`;
  }
  return `<code>${encode(type)}</code>`;
}

/**
 * @param {import("ts-morph").Node<Node>} node
 * @param {boolean} includePrivate
 */
function getProps(node, includePrivate) {
  const props = node.getType().getProperties();
  if (includePrivate) {
    return props;
  }
  return props.filter(prop => !getTagNames(prop).includes("JSDocPrivateTag"));
}

/**
 * @param {import("ts-morph").Symbol} symbol
 * @returns {string}
 */
function getComment(symbol) {
  const jsDocs = getJsDocs(symbol);
  if (!jsDocs) return "";
  return jsDocs.getDescription().trim();
}

/**
 * @param {import("ts-morph").Symbol} symbol
 */
function getDeclaration(symbol) {
  const declarations = symbol.getDeclarations();
  return declarations[0];
}

/**
 * @param {import("ts-morph").Symbol} symbol
 */
function getJsDocs(symbol) {
  const jsDocs = getDeclaration(symbol).getJsDocs();
  return jsDocs[jsDocs.length - 1];
}

/**
 * @param {import("ts-morph").Symbol} prop
 * @returns {string[]}
 */
function getTagNames(prop) {
  const jsDocs = getJsDocs(prop);
  if (!jsDocs) return [];
  // Object.getOwnPropertyNames(Object.getPrototypeOf(jsDocs));
  return jsDocs.getTags().map(tag => tag.getKindName());
}

/**
 * @param {import("ts-morph").Node<Node>} node
 */
function isStateReturnDeclaration(node) {
  const kindName = node.getKindName();
  const escapedName = getEscapedName(node);
  return (
    kindName === "TypeAliasDeclaration" && /.+StateReturn$/.test(escapedName)
  );
}

/**
 * @param {import("ts-morph").Node<Node>} node
 */
function isPropsDeclaration(node) {
  return isOptionsDeclaration(node) || isInitialStateDeclaration(node);
}

/**
 * @param {import("ts-morph").Node<Node>} node
 */
function isOptionsDeclaration(node) {
  const kindName = node.getKindName();
  const escapedName = getEscapedName(node);
  return kindName === "TypeAliasDeclaration" && /.+Options$/.test(escapedName);
}

/**
 * @param {import("ts-morph").Node<Node>} node
 */
function isInitialStateDeclaration(node) {
  const kindName = node.getKindName();
  const escapedName = getEscapedName(node);
  return (
    kindName === "TypeAliasDeclaration" && /.+InitialState$/.test(escapedName)
  );
}

/**
 * @param {import("ts-morph").Node<Node>} node
 */
function getEscapedName(node) {
  const symbol = node.getSymbol();
  return symbol && symbol.getEscapedName();
}
