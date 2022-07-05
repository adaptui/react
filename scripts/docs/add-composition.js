const path = require("path");
const outdent = require("outdent");
const { Project, ts } = require("ts-morph");

const { addMdContent } = require("./utils");
const { getPublicFiles, sortSourceFiles } = require("../utils/index");

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

  let compose = {};

  sortSourceFiles(sourceFiles).forEach(sourceFile => {
    sourceFile.forEachDescendant(node => {
      const kind = node.getKind();

      if (kind === ts.SyntaxKind.TypeAliasDeclaration) {
        const typeAliasDeclaration = node
          .getChildrenOfKind(ts.SyntaxKind.Identifier)[0]
          .getText();

        const isOptionsType = /.+Options$/.test(typeAliasDeclaration);

        if (isOptionsType) {
          const identifiers = node.getDescendantsOfKind(
            ts.SyntaxKind.Identifier,
          );

          const options = identifiers
            .map(identifier => {
              const identifierText = identifier.getText();

              if (
                /.+Options$/.test(identifierText) &&
                identifierText !== typeAliasDeclaration
              ) {
                return identifierText;
              }
              return null;
            })
            .filter(Boolean);

          const module = typeAliasDeclaration.replace(/Options$/, "");

          const composition = options.map(option => {
            return `use${option.replace(/Options$/, "")}`;
          });

          compose[module] = composition;
        }
      }
    });
  });

  return compose;
}

function getMarkdown(compose) {
  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });
  const content = Object.keys(compose).map(moduleName => {
    const module = compose[moduleName];

    const composition = formatter.format(
      module.map(item => {
        return "`" + item + "`";
      }),
    );

    return outdent`
      - ${moduleName} uses ${composition}
    `;
  });

  return outdent`
  ## Composition

  ${content.join("\n")}`;
}
