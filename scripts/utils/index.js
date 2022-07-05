// Taken from: https://github.com/reakit/reakit/blob/6f6d1ad9177156cafa4adf9c987a43c79a1bbb90/scripts/build/utils.js
const { lstatSync, existsSync, readdirSync } = require("fs-extra");
const { join } = require("path");

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
    kindName === "TypeAliasDeclaration" && /.+StateProps$/.test(escapedName)
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
