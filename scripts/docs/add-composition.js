const path = require("path");
const outdent = require("outdent");
const { Project } = require("ts-morph");

const { addMdContent } = require("./utils");
const {
  getPublicFiles,
  sortSourceFiles,
  isStatePropsDeclaration,
  isOptionsDeclaration,
  getEscapedName,
} = require("../utils/index");

// eslint-disable-next-line no-useless-escape
const COMPOSITION_ADD_FLAG = /\<\!\-\- INJECT_COMPOSITION (.*) \-\-\>/m;

const addComposition = docsTemplate => {
  return addMdContent(
    docsTemplate,
    COMPOSITION_ADD_FLAG,
    (line, regexMatched) => {
      const composites = getComposition(
        path.join(process.cwd(), regexMatched[1]),
      );

      return getMarkdown(composites);
    },
  );
};

module.exports = { addComposition };

function getComposition(rootPath) {
  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
    addFilesFromTsConfig: false,
  });

  const publicPaths = Object.values(getPublicFiles(rootPath));
  const sourceFiles = project.addSourceFilesAtPaths(publicPaths);
  project.resolveSourceFileDependencies();
  const compose = {};

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
              otherMultipleTypes.push(otherPropsName);
            }
          });
        }

        compose[moduleName] = otherMultipleTypes;
      }
    });
  });

  return compose;
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

function getMarkdown(compose) {
  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });
  const content = Object.keys(compose).map(moduleName => {
    const module = compose[moduleName];
    const RoleText = "`" + "Role" + "`";
    let composition = [];

    if (module.length > 0) {
      composition = module.map(item => "`" + item + "`");
    } else {
      composition = /.+StateProps$/.test(moduleName)
        ? ["its own state"]
        : ["`" + RoleText + "`"];
    }

    const formattedComposition = formatter.format(composition);
    const finalModuleName = /.+StateProps$/.test(moduleName)
      ? moduleName.replace(/Props$/, "")
      : moduleName.replace(/Options$/, "");

    return outdent`
      - ${finalModuleName} uses ${formattedComposition}
    `;
  });

  const finalContent = content.filter(Boolean);

  const isEmpty = finalContent.length === 0;

  if (isEmpty) return "";

  return outdent`
  ## Composition

  ${finalContent.join("\n")}`;
}
