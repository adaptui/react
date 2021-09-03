const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const globFs = require("glob-fs")();
const outdent = require("outdent");

const transpileTs = require("./transpile-ts");
const { createFile, createDirectory } = require("./utils/fs-utils");

function globRecurse(file) {
  // `file.pattern` is an object with a `glob` (string) property
  file.recurse = file.pattern.glob.indexOf("**") !== -1;
  return file;
}

const componentArg = process.argv[2];
const folderToRead = componentArg
  ? `src/${componentArg}/**/*.component.*`
  : "src/**/*.component.*";
//

/**
 * Get all the files from the folder.
 */
const files = globFs.use(globRecurse).readdirSync(folderToRead, {});

const addPackageName = string =>
  string
    .replace("../../index", "@renderlesskit/react")
    .replace("../../../index", "@renderlesskit/react");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const createTemplateFile = (code, name, type, dir) => {
  const componentName = `${name}${capitalizeFirstLetter(type)}`;
  const finalCode = addPackageName(code);
  const template = outdent`
  export const ${componentName} = ${JSON.stringify(finalCode)}

  export default ${componentName};
  `;
  const templatePath = path.join(dir, `${componentName}.ts`);

  createFile(templatePath, template);

  console.log(chalk.green.bold(`CREATED: ${componentName}`));
};

const generatePreviewTemplateFiles = filePath => {
  const storiesDirectory = path.dirname(filePath);
  const templatesFolderPath = `${storiesDirectory}${path.sep}templates`;
  const componentName = path.basename(filePath).replace(".component.tsx", "");
  const componentType = path.extname(filePath).replace(".", "");

  const templateDir = path.join(process.cwd(), templatesFolderPath);
  createDirectory(templateDir);

  let code = fs.readFileSync(path.join(process.cwd(), filePath), {
    encoding: "utf8",
  });
  createTemplateFile(code, componentName, componentType, templateDir);

  const jsCode = transpileTs(code);
  createTemplateFile(jsCode, componentName, "jsx", templateDir);

  try {
    const cssFilePath = path.join(
      process.cwd(),
      `${storiesDirectory}${path.sep}${componentName}.css`,
    );
    if (fs.existsSync(cssFilePath)) {
      const cssCode = fs.readFileSync(cssFilePath, { encoding: "utf8" });
      createTemplateFile(cssCode, componentName, "css", templateDir);
    }
  } catch (err) {
    console.error(err);
  }
};

files.forEach(filePath => generatePreviewTemplateFiles(filePath));

console.log(chalk.blueBright.bold(`\nTemplates created successfully..`));
