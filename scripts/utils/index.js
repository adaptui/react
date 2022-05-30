// Taken from: https://github.com/reakit/reakit/blob/6f6d1ad9177156cafa4adf9c987a43c79a1bbb90/scripts/build/utils.js
const {
  lstatSync,
  existsSync,
  readdirSync,
  writeFileSync,
} = require("fs-extra");
const chalk = require("chalk");
const prettier = require("prettier");
const { join, dirname, basename } = require("path");
const { toUpper, snakeCase, isEqual } = require("lodash");
const { Project } = require("ts-morph");

function log(...args) {
  console.log(...args);
}

/**
 * @param {string} rootPath
 */
function getPackage(rootPath) {
  return require(join(rootPath, "package.json"));
}

/**
 * @param {string} path
 */
function removeExt(path) {
  return path.replace(/\.[^.]+$/, "");
}

/**
 * @param {string} path
 */
function isDirectory(path) {
  return lstatSync(path).isDirectory();
}

/**
 * @param {string} rootPath
 */
function getSourcePath(rootPath) {
  return join(rootPath, "src");
}

/**
 * Ensure that paths are consistent across Windows and non-Windows platforms.
 * @param {string} filePath
 */
function normalizePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

/**
 * Filters out files starting with __
 * Includes directories and TS/JS files.
 * @param {string} rootPath
 * @param {string} filename
 */
function isPublicModule(rootPath, filename) {
  const isPrivate = /^__/.test(filename);
  if (isPrivate) {
    return false;
  }
  if (isDirectory(join(rootPath, filename))) {
    return true;
  }
  return /\.(j|t)sx?$/.test(filename);
}

/**
 * Returns { index: "path/to/index", moduleName: "path/to/moduleName" }
 * @param {string} rootPath
 * @param {string} prefix
 */
function getPublicFiles(rootPath, prefix = "") {
  return readdirSync(rootPath)
    .filter(filename => isPublicModule(rootPath, filename))
    .sort() // Ensure consistent order across platforms
    .reduce((acc, filename) => {
      const path = join(rootPath, filename);
      const childFiles =
        isDirectory(path) && getPublicFiles(path, join(prefix, filename));
      return {
        ...(childFiles || {
          [removeExt(normalizePath(join(prefix, filename)))]:
            normalizePath(path),
        }),
        ...acc,
      };
    }, {});
}

/**
 * Returns the same as getPublicFiles, but grouped by modules.
 * Like { "path/to/moduleName": ["path/to/moduleName/file1", "path/to/moduleName/file2"] }
 * @param {string} rootPath
 */
function getPublicFilesByModules(rootPath) {
  const publicFiles = getPublicFiles(rootPath);
  return Object.values(publicFiles).reduce((acc, path) => {
    const moduleName = dirname(path);
    acc[moduleName] = [...(acc[moduleName] || []), path];
    return acc;
  }, {});
}

/**
 * @param {string} rootPath
 */
function hasTSConfig(rootPath) {
  return existsSync(join(rootPath, "tsconfig.json"));
}

/**
 * @param {import("ts-morph").Node<Node>} node
 */
function getEscapedName(node) {
  const symbol = node.getSymbol();
  return symbol && symbol.getEscapedName();
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
function isOptionsDeclaration(node) {
  const kindName = node.getKindName();
  const escapedName = getEscapedName(node);
  return kindName === "TypeAliasDeclaration" && /.+Options$/.test(escapedName);
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
  if (!getDeclaration(symbol).getJsDocs) return;
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
 * @param {import("ts-morph").Node<Node>} node
 * @param {boolean} includePrivate
 */
function getPropsNames(node, includePrivate) {
  return getProps(node, includePrivate).map(prop => prop.getEscapedName());
}

/**
 * @param {import("ts-morph").SourceFile[]} sourceFiles
 */
function sortSourceFiles(sourceFiles) {
  return sourceFiles.sort((a, b) => {
    const aName = a.getBaseNameWithoutExtension();
    const bName = b.getBaseNameWithoutExtension();
    if (/State/.test(aName)) return -1;
    if (/State/.test(bName) || aName > bName) return 1;
    if (aName < bName) return -1;
    return 0;
  });
}
/**
 * @param {import("ts-morph").Node<Node>} node
 * @return {import("ts-morph").Node<Node>|null}
 */
function getLiteralNode(node) {
  if (node.getKindName() === "TypeLiteral") {
    return node;
  }
  const children = node.getChildren();
  for (const child of children) {
    const result = getLiteralNode(child);
    if (result) {
      return result;
    }
  }
  return null;
}

/**
 * @param {string} moduleName
 */
function getKeysName(moduleName) {
  return `${toUpper(snakeCase(moduleName))}_KEYS`;
}

/**
 * @param {any[]} a
 * @param {any[]} b
 */
function isSubsetOf(a, b) {
  return a.length && b.length && a.every(item => b.includes(item));
}

/**
 * @param {Object} object
 */
function sortStateSets(object) {
  return Object.entries(object)
    .sort(([aKey, aValue], [bKey, bValue]) => {
      if (aKey.endsWith("State") && bKey.endsWith("State")) {
        if (isSubsetOf(aValue, bValue)) return -1;
        if (isSubsetOf(bValue, aValue)) return 1;
      }
      return 0;
    })
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

/**
 * @param {Object} object
 */
function replaceSubsetInObject(object) {
  const finalObj = {};
  Object.entries(object).forEach(([key, array]) => {
    const refs = Object.entries(finalObj)
      .filter(([, items]) => isSubsetOf(items, array))
      .map(([k]) => k);

    finalObj[key] = [
      ...refs.map(ref => `...${getKeysName(ref)}`),
      ...array.filter(item => !refs.some(ref => object[ref].includes(item))),
    ];
  });
  if (!isEqual(object, finalObj)) {
    return replaceSubsetInObject(finalObj);
  }
  return finalObj;
}

/**
 * @param {string} acc
 * @param {[string, string[]]} entry
 */
function reduceKeys(acc, [moduleName, array]) {
  const declaration = `const ${getKeysName(moduleName)}`;
  const value = `${JSON.stringify(array)} as const`
    // "...FOO_KEYS" -> ...FOO_KEYS (without quotes)
    .replace(/"([.A-Z_]+)"/g, "$1")
    // [...FOO_KEYS] as const -> FOO_KEYS
    .replace(/\[\.\.\.([A-Z_]+)\] as const/g, "$1");

  const finalString = `${declaration} = ${value};\n`;

  return `${acc}export ${finalString}`;
}

module.exports = {
  getPackage,
  hasTSConfig,
  getProps,
  getEscapedName,
  getModuleName,
  getDeclaration,
  isOptionsDeclaration,
  isStateReturnDeclaration,
  sortSourceFiles,
  getPublicFiles,
  getJsDocs,
};
