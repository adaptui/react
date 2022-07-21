const path = require("path");
const outdent = require("outdent");
const { Project, ts } = require("ts-morph");

const {
  getProps,
  getJsDocs,
  getPublicFiles,
  getEscapedName,
  getDeclaration,
  sortSourceFiles,
  isOptionsDeclaration,
  isStatePropsDeclaration,
} = require("../utils");
const { addMdContent } = require("./utils");
const { typeFootprint } = require("./typeFootPrint");

// eslint-disable-next-line no-useless-escape
const PROPS_INJECT_FLAG = /\<\!\-\- INJECT_PROPS (.*) \-\-\>/m;

const addProps = docsTemplate => {
  return addMdContent(docsTemplate, PROPS_INJECT_FLAG, (line, regexMatched) => {
    const types = getPropTypes(path.join(process.cwd(), regexMatched[1]));

    return getPropTypesMarkdown(types);
  });
};

module.exports = { addProps };

/**
 * Inject prop types tables into README.md files
 * @param {string} rootPath
 */
function getPropTypes(rootPath) {
  const otherTypes = [];

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
      if (isStatePropsDeclaration(node) || isOptionsDeclaration(node)) {
        const otherMultipleTypes = [];
        const moduleName = getEscapedName(node);
        const childCount = node.getChildCount();

        if (node.getChildAtIndex(childCount - 2)) {
          const n = node.getChildAtIndex(childCount - 2);

          const children = getChildrenRecursive(n).flat();

          children.forEach(child => {
            if (child.getKindName() === "AmpersandToken") return;

            const otherPropsName = getOtherPropsName(node, child.getText());

            if (otherPropsName) {
              const regex = /(\w+)\?:/gm;
              const matches = typeFootprint(child).match(regex);
              const _matches = matches.map(m => m.slice(0, -2));

              otherMultipleTypes.push({ [otherPropsName]: _matches });
              otherTypes.push(..._matches);
            }
          });
        }

        const propTypes = createPropTypeObjects(node);
        const ownPropTypes = propTypes.filter(
          prop => !otherTypes.includes(prop.name),
        );
        const otherPropTypes = propTypes.filter(prop =>
          otherTypes.includes(prop.name),
        );

        types[moduleName] = ownPropTypes;

        const otherMultiplePropTypes = otherMultipleTypes.reduce(
          (acc, curr) => {
            const [key, values] = Object.entries(curr)[0];
            const propTypes = acc[key] || [];
            const _propTypes = [...propTypes, ...values];
            const _otherPropTypes = otherPropTypes.filter(prop =>
              _propTypes.includes(prop.name),
            );

            return { ...acc, [key]: _otherPropTypes };
          },
          {},
        );

        types[moduleName].otherProps = otherMultiplePropTypes;
      }
    });
  });

  return types;
}

const getChildrenRecursive = (node, callStackLevel = 0) => {
  if (node.getKindName() !== "IntersectionType" && callStackLevel === 0) {
    return [node];
  }
  const children = node.getChildren();

  if (callStackLevel === 2) {
    return node;
  }

  if (children.length > 0) {
    return children.map(child =>
      getChildrenRecursive(child, callStackLevel + 1),
    );
  }

  return [node];
};

/**
 * @param {import("ts-morph").Node<Node>} node
 */
function createPropTypeObjects(node) {
  const props = getProps(node);
  // Remove all "as" type as we don't want to appear in the table
  const _props = props.filter(prop => prop.getEscapedName() !== "as");
  return _props.map(prop => createPropTypeObject(prop));
}

/**
 * @param {import("ts-morph").Symbol} prop
 */
function getPropType(prop) {
  const declaration = getDeclaration(prop);
  const type = declaration
    .getType()
    .getText(undefined, ts.TypeFormatFlags.None);

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
 * @param {import("ts-morph").Symbol} prop
 */
function createPropTypeObject(prop) {
  return {
    name: prop.getEscapedName(),
    description: getComment(prop),
    type: getPropType(prop),
  };
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
function getOtherPropsName(node, str) {
  const statePropsRegex = /\w+StateProps/gm;
  const OptionsRegex = /\w+Options/gm;
  const finalRegex = isStatePropsDeclaration(node)
    ? statePropsRegex
    : OptionsRegex;
  const matches = str.match(finalRegex);

  if (matches) return matches[0];

  return null;
}

/**
 * @param {ReturnType<typeof createPropTypeObject>} prop
 */
function getPropTypesRow(prop) {
  const symbol = /unstable_/.test(prop.name)
    ? ' <span title="Experimental">⚠️</span>'
    : "";
  const name = `**\`${prop.name}\`**${symbol} `;
  const desc = prop.description.replace(/\r?\n|\r/g, "");

  return outdent`
    | ${name} | ${prop.type.replace(/\|/g, "\\|")} | ${desc} |
  `;
}

const tableHeader = outdent`
| Name  | Type | Description |
| :--- |:---|:---|
`;

function getSummaryDetails(otherProps) {
  const otherPropsObjectKeys = Object.keys(otherProps);
  const content = otherPropsObjectKeys
    .map(title => {
      const props = otherProps[title];
      const rows = props.map(getPropTypesRow).join("\n");

      return outdent`
        <details><summary>${title} props</summary>
        > These props are returned by the other props You can also provide these props.

        ${tableHeader}
        ${rows}

        </details>
      `;
    })
    .join("\n\n");

  return content;
}

/**
 * @param {Record<string, ReturnType<typeof createPropTypeObject>>} types
 */
function getPropTypesMarkdown(types) {
  const typesObjectKeys = Object.keys(types);

  const content = typesObjectKeys
    .map(title => {
      const props = types[title];
      const rows = props.map(getPropTypesRow).join("\n");
      const otherProps = props.otherProps;
      const hiddenRows = getSummaryDetails(otherProps);

      const table = outdent`
        ${tableHeader}
        ${rows}
      `;

      return outdent`
        ### \`${title}\`

        ${rows.length < 1 ? (hiddenRows ? "" : "No props to show") : table}

        ${hiddenRows}
      `;
    })
    .join("\n\n");

  return outdent`
    ## Props

    ${content}
  `;
}
