const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const outdent = require("outdent");
const { Project, ts } = require("ts-morph");
const prettier = require("prettier/standalone");
const markdownParser = require("prettier/parser-markdown");
const prettierConfig = require("../.prettierrc.json");

const injectMdContent = require("./inject-md-content");
const { walkSync, createFile } = require("./fsUtils");
const { getEscapedName, getPublicFiles, sortSourceFiles } = require("./utils");

const docsFolder = path.resolve(process.cwd(), "docs");
// const docsTemplateFolder = path.resolve(process.cwd(), "docs-templates");
const COMPOSE_INJECT_FLAG = /\<\!\-\- INJECT_COMPOSITION (.*) \-\-\>/m;

const readmeTemplates = walkSync(docsFolder);

readmeTemplates.forEach(readme => {
  const mdContent = fs.readFileSync(readme, { encoding: "utf-8" });

  mdContent.split("\n").map(line => {
    const lineMatch = line.match(COMPOSE_INJECT_FLAG);
    if (lineMatch) {
      console.log(path.join(process.cwd(), lineMatch[1]));
      run(path.join(process.cwd(), lineMatch[1]), path.join(readme));
    }
  });
});

function run(rootPath, readmeTemplatePath) {
  const compose = getComposition(rootPath);
  console.log(compose);

  injectComposition(compose, readmeTemplatePath);
}

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
      const moduleName = sourceFile.getBaseNameWithoutExtension();
      if (
        ts.SyntaxKind.PropertyAssignment &&
        getEscapedName(node) === "compose"
      ) {
        const ValueDeclaration = node.getSymbol().getValueDeclaration();
        const initializer = ValueDeclaration.compilerNode.initializer;

        if (initializer.kind === ts.SyntaxKind.ArrayLiteralExpression) {
          compose[moduleName] = initializer.elements.map(v => v.escapedText);
        }

        if (initializer.kind === ts.SyntaxKind.Identifier) {
          compose[moduleName] = initializer.escapedText;
        }
      }
    });
  });

  return compose;
}

function injectComposition(compose, readmeTemplatePath) {
  const mdContents = fs.readFileSync(readmeTemplatePath, { encoding: "utf-8" });
  const moduleName = path.basename(readmeTemplatePath);

  const compositionMarkdown = getMarkdown(compose);
  try {
    const markdown = injectMdContent(
      mdContents,
      COMPOSE_INJECT_FLAG,
      () => compositionMarkdown,
    );

    createFile(
      path.join(docsFolder, moduleName),
      prettier.format(markdown, {
        parser: "markdown",
        plugins: [markdownParser],
        ...prettierConfig,
      }),
    );

    console.log(
      chalk.bold(
        chalk.green(
          "Injected composition in",
          path.basename(readmeTemplatePath),
        ),
      ),
    );
  } catch (e) {
    console.log(e);
    // do nothing
  }
}

function getMarkdown(compose) {
  const hookLinks = {
    useComposite: "https://reakit.io/docs/composite",
    useCompositeItem: "https://reakit.io/docs/composite",
    unstable_useId: "https://reakit.io/docs/id",
    useDisclosureContent: "https://reakit.io/docs/disclosure",
    useButton: "https://reakit.io/docs/button",
    useBox: "https://reakit.io/docs/box",
    useClickable: "https://reakit.io/docs/clickable",
    useLink: "./link.md",
  };

  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });
  const content = Object.keys(compose).map(moduleName => {
    const module = compose[moduleName];

    const composition =
      typeof module === "string"
        ? `[${module}](${hookLinks[module]})`
        : formatter.format(
            module.map(item => {
              return `[${item}](${hookLinks[item]})`;
            }),
          );

    return outdent`
      - ${moduleName} uses ${composition}
    `;
  });

  return content.join("\n");
}
