const fs = require("fs");
const path = require("path");
const outdent = require("outdent");
const { Project, ts } = require("ts-morph");

const injectMdContent = require("./inject-md-content");
const { getEscapedName, getPublicFiles, sortSourceFiles } = require("./index");

const COMPOSE_INJECT_FLAG = /\<\!\-\- INJECT_COMPOSITION (.*) \-\-\>/m;

const injectComposition = docsTemplate => {
  return injectMdContent(
    docsTemplate,
    COMPOSE_INJECT_FLAG,
    (line, regexMatched) => {
      const composites = getComposition(
        path.join(process.cwd(), regexMatched[1]),
      );
      return getMarkdown(composites);
    },
  );
};

module.exports = injectComposition;

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

function getMarkdown(compose) {
  const hookLinks = {
    useComposite: "https://reakit.io/docs/composite",
    useCompositeItem: "https://reakit.io/docs/composite",
    unstable_useId: "https://reakit.io/docs/id",
    useDialog: "https://reakit.io/docs/dialog/",
    useDialogDisclosure: "https://reakit.io/docs/dialog/",
    useDisclosureContent: "https://reakit.io/docs/disclosure",
    usePopover: "https://reakit.io/docs/popover/",
    usePopoverDisclosure: "https://reakit.io/docs/popover/",
    useButton: "https://reakit.io/docs/button",
    useBox: "https://reakit.io/docs/box",
    useRole: "https://reakit.io/docs/role",
    useInput: "https://reakit.io/docs/input/",
    useClickable: "https://reakit.io/docs/clickable",
    useLink: "./link.md",
    usePickerBase: "./picker-base.md",
    usePickerBaseContent: "./picker-base.md",
    usePickerBaseTrigger: "./picker-base.md",
    useSegment: "./segment.md",
    useSegmentField: "./segment.md",
    useSelectItem: "./select.md",
    useSelectList: "./select.md",
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
