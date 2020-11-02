const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const globFs = require("glob-fs")();
const transpileTs = require("./transpile-ts");

function recurse(file) {
  // `file.pattern` is an object with a `glob` (string) property
  file.recurse = file.pattern.glob.indexOf("**") !== -1;
  return file;
}

// Create a new folder at the specified path
function createDirectory(path) {
  console.log("%c path", "color: #cc0088", path);
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  } catch (err) {
    console.error(`[createDirectory]: Failed to create director at ${path}`);
  }
}

function createFile(filePath, fileContent = "") {
  fs.writeFile(filePath, fileContent, error => {
    if (error) {
      console.log(`Failed to create ${filePath}`, chalk.red.bold("ERROR"));
      throw error;
    }

    console.log(`Create ${filePath}`, chalk.green.bold("DONE"));
  });
}

const generateJsFiles = filePath => {
  const accordionComponent = fs.readFileSync(
    path.join(process.cwd(), filePath),
    { encoding: "utf8" },
  );
  const appTemplateJs = transpileTs(accordionComponent);
  const templateFilePath = filePath
    .replace("stories", "stories/__js")
    .replace(".tsx", ".jsx");
  const templateDir = path.join(
    process.cwd(),
    templateFilePath.substring(0, templateFilePath.lastIndexOf("/")),
  );

  createDirectory(templateDir);

  const templatePath = path.join(process.cwd(), templateFilePath);

  createFile(templatePath, appTemplateJs);
};

const files = globFs.use(recurse).readdirSync("**/*.component.tsx", {});
files.forEach(filePath => generateJsFiles(filePath));
