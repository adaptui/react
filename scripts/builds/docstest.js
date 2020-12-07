const path = require("path");
const glob = require("glob");
const { promisify } = require("util");
const docgen = require("react-docgen-typescript");

const rootDir = path.join(__dirname, "..", "..");
const sourcePath = path.join(rootDir, "src");

const tsConfigPath = path.join(rootDir, "tsconfig.json");

const globAsync = promisify(glob);

const main = async () => {
  const componentFiles = await findComponentFiles();

  const parsedInfo = parseInfo(componentFiles);
  console.log("%c parsedInfo", "color: #e50000", parsedInfo);
};

main();

/**
 * Find all TypeScript files which could contain component definitions
 */
async function findComponentFiles() {
  const tsFiles = await globAsync("./**/*.@(ts|tsx)", {
    cwd: sourcePath,
  });
  const toBeFiltered = [
    "stories",
    "__tests__",
    "helpers",
    "__keys.ts",
    "utils",
    "toast",
    "types.ts",
    "index.ts",
  ];

  return tsFiles.filter(file => !toBeFiltered.find(f => file.includes(f)));
}

/**
 * Parse files with react-doc-gen-typescript
 */
function parseInfo(filePaths) {
  const { parse } = docgen.withCustomConfig(tsConfigPath, {
    shouldRemoveUndefinedFromOptional: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldExtractValuesFromUnion: true,
    propFilter: (prop, component) => {
      if (prop.parent) {
        if (prop.parent.fileName.includes("node_modules")) {
          return false;
        }
      }

      console.log("%c prop", "color: #ffa640", prop.type.value);
      return true;
    },
  });

  const absoluteFilePath = path.join(sourcePath, filePaths[0]);

  return parse(absoluteFilePath);
}
