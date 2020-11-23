const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const outdent = require("outdent");
const { Project, ts } = require("ts-morph");

const { walkSync, createFile } = require("./fs-utils");
const injectMdContent = require("./inject-md-content");

const {
  getProps,
  getJsDocs,
  getPublicFiles,
  getModuleName,
  getEscapedName,
  getDeclaration,
  sortSourceFiles,
  isOptionsDeclaration,
  isStateReturnDeclaration,
} = require("./utils");

const docsFolder = path.resolve(process.cwd(), "docs");
const PROPS_INJECT_FLAG = /\<\!\-\- INJECT_PROPS (.*) \-\-\>/m;

const readmeTemplates = walkSync(docsFolder);

readmeTemplates.forEach(readme => {
  const mdContent = fs.readFileSync(readme, { encoding: "utf-8" });

  mdContent.split("\n").map(line => {
    const lineMatch = line.match(PROPS_INJECT_FLAG);
    if (lineMatch) {
      run(path.join(process.cwd(), lineMatch[1]), path.join(readme));
    }
  });
});

function run(rootPath, readmeTemplatePath) {
  const types = getPropTypes(rootPath);

  injectPropTypes(types, readmeTemplatePath);
}

/**
 * Inject prop types tables into README.md files
 * @param {string} rootPath
 */
function getPropTypes(rootPath) {
  const stateTypes = [];

  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
    addFilesFromTsConfig: false,
  });

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

  return types;
}

function injectPropTypes(types, readmeTemplatePath) {
  const mdContents = fs.readFileSync(readmeTemplatePath, { encoding: "utf-8" });
  const basename = path.basename(readmeTemplatePath);
  const propTypesMarkdown = getPropTypesMarkdown(types);
  const markdown = injectMdContent(
    mdContents,
    PROPS_INJECT_FLAG,
    () => propTypesMarkdown,
  );

  createFile(path.join(docsFolder, basename), markdown);

  console.log(chalk.green("Injected prop types in", basename));
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
    return outdent`<code title="${encode(type)}">${encode(
      type.substring(0, 47),
    )}...</code>`;
  }
  return `<code>${encode(type)}</code>`;
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
  const name = `**\`${prop.name}\`**${symbol} `;

  return outdent`
    - ${name}
    ${prop.type}
    ${prop.description.split("\n\n").join("\n\n  ")}
  `;
}

function getSummaryDetails(stateProps) {
  return outdent`
    <details><summary>${stateProps.length} state props</summary>
    > These props are returned by the state hook. You can spread them into this component (\`{...state}\`) or pass them separately. You can also provide these props from your own state logic.
    
    ${stateProps.map(getPropTypesRow).join("\n")}
    
    </details>
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
      const hiddenRows = stateProps.length ? getSummaryDetails(stateProps) : "";

      return outdent`
        ### \`${title}\`
        ${rows || (hiddenRows ? "" : "No props to show")}
        ${hiddenRows}
      `;
    })
    .join("\n\n");

  return outdent`
    <!-- Automatically generated -->
    ${content}
  `;
}
