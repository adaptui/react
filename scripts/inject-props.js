const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const inject = require("md-node-inject");
const { Project, ts } = require("ts-morph");
const toMarkdown = require("ast-to-markdown");
const ast = require("@textlint/markdown-to-ast");

const { walkSync, createFile, isDirectory } = require("./fsUtils");

const docsFolder = path.resolve(process.cwd(), "docs");
const docsTemplatesFolder = path.resolve(process.cwd(), "docs-templates");
const PROPS_INJECT_FLAG = /\<\!\-\- INJECT_PROPS (.*) \-\-\>/m;

const readmeTemplates = walkSync(docsTemplatesFolder);

readmeTemplates.forEach(readme => {
  const mdContent = fs.readFileSync(readme, { encoding: "utf-8" });

  mdContent.split("\n").map(line => {
    const lineMatch = line.match(PROPS_INJECT_FLAG);
    if (lineMatch) {
      injectPropTypes(
        path.join(process.cwd(), lineMatch[1]),
        path.join(readme),
      );
    }
  });
});

/**
 * Inject prop types tables into README.md files
 * @param {string} rootPath
 */
function injectPropTypes(rootPath, readmeTemplatePath) {
  const stateTypes = [];

  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
    addFilesFromTsConfig: false,
  });

  const mdContents = fs.readFileSync(readmeTemplatePath, { encoding: "utf-8" });

  if (/#\s?Props/.test(mdContents)) {
    const tree = ast.parse(mdContents);
    const publicPaths = Object.values(getPublicFiles(rootPath));
    const sourceFiles = project.addSourceFilesAtPaths(publicPaths);
    project.resolveSourceFileDependencies();
    const types = {};

    sortSourceFiles(sourceFiles).forEach(sourceFile => {
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

    const propTypesMarkdown = getPropTypesMarkdown(types);
    try {
      const merged = inject("Props", tree, ast.parse(propTypesMarkdown));
      const markdown = toMarkdown(merged).trimLeft();
      createFile(
        path.join(docsFolder, path.basename(readmeTemplatePath)),
        markdown,
      );

      console.log(
        chalk.bold(
          chalk.green(
            "Injected prop types in",
            path.basename(readmeTemplatePath),
          ),
        ),
      );
    } catch (e) {
      // do nothing
    }
  }
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
  if (isDirectory(path.join(rootPath, filename))) {
    return true;
  }
  return /\.(j|t)sx?$/.test(filename);
}

/**
 * @param {string} path
 */
function removeExt(path) {
  return path.replace(/\.[^.]+$/, "");
}

/**
 * Ensure that paths are consistent across Windows and non-Windows platforms.
 * @param {string} filePath
 */
function normalizePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

/**
 * Returns { index: "path/to/index", moduleName: "path/to/moduleName" }
 * @param {string} rootPath
 * @param {string} prefix
 */
function getPublicFiles(rootPath, prefix = "") {
  return fs
    .readdirSync(rootPath)
    .filter(filename => isPublicModule(rootPath, filename))
    .filter(filename => !rootPath.match(/stories/))
    .sort() // Ensure consistent order across platforms
    .reduce((acc, filename) => {
      const filePath = path.join(rootPath, filename);
      const childFiles =
        isDirectory(filePath) &&
        getPublicFiles(filePath, path.join(prefix, filename));
      return {
        ...(childFiles || {
          [removeExt(
            normalizePath(path.join(prefix, filename)),
          )]: normalizePath(filePath),
        }),
        ...acc,
      };
    }, {});
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
function isInitialStateDeclaration(node) {
  const kindName = node.getKindName();
  const escapedName = getEscapedName(node);
  return (
    kindName === "TypeAliasDeclaration" && /.+InitialState$/.test(escapedName)
  );
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
 * @param {import("ts-morph").Symbol} symbol
 * @returns {string}
 */
function getComment(symbol) {
  const jsDocs = getJsDocs(symbol);
  if (!jsDocs) return "";
  return jsDocs.getDescription().trim();
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
function isPropsDeclaration(node) {
  return isOptionsDeclaration(node) || isInitialStateDeclaration(node);
}

/**
 * @param {ReturnType<typeof createPropTypeObject>} prop
 */
function getPropTypesRow(prop) {
  const symbol = /unstable_/.test(prop.name)
    ? ' <span title="Experimental">⚠️</span>'
    : "";
  const name = `**\`${prop.name}\`**${symbol}`;

  return `- ${name}
  ${prop.type}
  ${prop.description.split("\n\n").join("\n\n  ")}
`;
}

/**
 * @param {Record<string, ReturnType<typeof createPropTypeObject>>} types
 */
function getPropTypesMarkdown(types) {
  const content = Object.keys(types)
    .map(title => {
      const props = types[title];
      const rows = props.map(getPropTypesRow).join("\n");
      const stateProps = props.stateProps || [];
      const hiddenRows = stateProps.length
        ? `
<details><summary>${stateProps.length} state props</summary>
> These props are returned by the state hook. You can spread them into this component (\`{...state}\`) or pass them separately. You can also provide these props from your own state logic.
${stateProps.map(getPropTypesRow).join("\n")}
</details>`
        : "";

      return `
### \`${title}\`
${rows || (hiddenRows ? "" : "No props to show")}
${hiddenRows}`;
    })
    .join("\n\n");

  return `
<!-- Automatically generated -->
${content}`;
}
