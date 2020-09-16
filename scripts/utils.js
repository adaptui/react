const { join, dirname, basename } = require("path");
const { toUpper, snakeCase, isEqual } = require("lodash");
const prettier = require("prettier");
const {
  readdirSync,
  writeFileSync,
  lstatSync,
  existsSync,
} = require("fs-extra");
const { Project } = require("ts-morph");
const chalk = require("chalk");

function log(...args) {
  console.log(...args);
}

/**
 * Converts ./path/to/file.js to ./path/to
 * @param {string} dir
 */
function resolveDir(dir) {
  if (!/\.(t|j)s$/.test(dir)) {
    return dir;
  }
  return dirname(dir);
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
          [removeExt(normalizePath(join(prefix, filename)))]: normalizePath(
            path,
          ),
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

  if (!moduleName.endsWith("State")) {
    return `${acc}export ${finalString}`;
  }
  return `${acc}${finalString}`;
}

/**
 * Create __keys.json files
 * @param {string} rootPath
 */
function makeKeys(rootPath) {
  const pkg = getPackage(rootPath);

  const filesByModules = getPublicFilesByModules(getSourcePath(rootPath));
  const project = new Project({
    tsConfigFilePath: join(rootPath, "tsconfig.json"),
    addFilesFromTsConfig: false,
  });
  const created = [];

  Object.entries(filesByModules).forEach(([modulePath, paths]) => {
    const sourceFiles = project.addSourceFilesAtPaths(paths);
    const keys = {};
    const stateKeys = [];

    sortSourceFiles(sourceFiles).forEach(sourceFile => {
      sourceFile.forEachChild(node => {
        if (isStateReturnDeclaration(node) || isOptionsDeclaration(node)) {
          const literalNode = isOptionsDeclaration(node)
            ? getLiteralNode(node)
            : node;
          const props = literalNode ? getPropsNames(literalNode, true) : [];
          if (isStateReturnDeclaration(node)) {
            for (const prop of props) {
              if (!stateKeys.includes(prop)) {
                stateKeys.push(prop);
              }
            }
            keys[getModuleName(node)] = props;
          } else {
            keys[getModuleName(node)] = [...stateKeys, ...props];
          }
        }
      });
    });

    if (!Object.keys(keys).length) return;

    const normalizedKeys = replaceSubsetInObject(sortStateSets(keys));
    const contents = Object.entries(normalizedKeys).reduce(reduceKeys, "");
    created.push(chalk.bold(chalk.green(basename(modulePath))));

    writeFileSync(
      join(modulePath, "__keys.ts"),
      prettier.format(`// Automatically generated\n${contents}`, {
        parser: "babel-ts",
      }),
    );
  });

  if (created.length) {
    log(
      [
        "",
        `Generated keys in ${chalk.bold(pkg.name)}:`,
        `${created.join(", ")}`,
      ].join("\n"),
    );
  }
}

module.exports = {
  hasTSConfig,
  makeKeys,
};
