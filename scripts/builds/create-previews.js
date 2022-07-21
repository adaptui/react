const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const globFs = require("glob-fs")({ gitignore: false });
const outdent = require("outdent");

const {
  createFile,
  createDirectory,
  readFile,
  joinCwd,
} = require("../utils/common-utils");
const transpileTs = require("../utils/transpile-ts");

const addPackageName = string =>
  string
    .replace("../../index", "@adaptui/react")
    .replace("../../../index", "@adaptui/react")
    .replace(/\.\.\/\.\.\/.+stories(.+.component)/gm, ".$1");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const createTemplateFile = (code, name, type, dir, pathName) => {
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

  const templateDir = joinCwd(templatesFolderPath);
  createDirectory(templateDir);

  const code = readFile(joinCwd(filePath));
  createTemplateFile(code, componentName, componentType, templateDir);

  const jsCode = transpileTs(code);
  createTemplateFile(jsCode, componentName, "jsx", templateDir);

  try {
    const otherStoryComponentRegex = /\.\.\/.+\/stories\/.+/gm;
    const otherStoryComponentPaths = code.match(otherStoryComponentRegex);

    if (otherStoryComponentPaths?.length > 0) {
      otherStoryComponentPaths.forEach(path => {
        const componentName = path
          .replace(/\.\.\/.+\//gm, "")
          .replace(/.component";/gm, "");
        const componentFilePath = path.replace(
          /\.\.\/\.\.\/(.+)";/gm,
          "src/$1.tsx",
        );

        const otherStoryComponentCode = readFile(joinCwd(componentFilePath));
        createTemplateFile(
          otherStoryComponentCode,
          componentName,
          "tsx",
          templateDir,
        );

        const jsCode = transpileTs(otherStoryComponentCode);
        createTemplateFile(jsCode, componentName, "jsx", templateDir);
      });
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const cssFilePath = joinCwd(
      `${storiesDirectory}${path.sep}${componentName}.css`,
    );
    if (fs.existsSync(cssFilePath)) {
      const cssCode = readFile(cssFilePath);
      createTemplateFile(cssCode, componentName, "css", templateDir);
    }
  } catch (error) {
    console.error(error);
  }
};

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

files.forEach(filePath => generatePreviewTemplateFiles(filePath));

console.log(chalk.blueBright.bold(`\nTemplates created successfully..`));
