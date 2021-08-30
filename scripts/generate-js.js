const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const globFs = require("glob-fs")();
const outdent = require("outdent");
const { camelCase, startCase } = require("lodash");

const {
  walkSync,
  createFile,
  getDirectories,
  createDirectory,
} = require("./utils/fs-utils");
const transpileTs = require("./transpile-ts");

// -> get all the component folders [accordion, breadcrumb...]
// -> find all the .components inside the folders
// -> create object with component pairs
// { accordion: [Accordion.component.tsx, AccordionStyled.component.tsx] }
// -> loop through them and create template.ts file
function getComponentFolderPairs() {
  const componentFolders = getDirectories(
    path.resolve(__dirname, "../src"),
  ).filter(path => !path.match(/(__mocks__|utils)/));

  const components = componentFolders.reduce((prev, curr) => {
    const folderName = path.basename(curr);
    const allfiles = walkSync(`${curr}${path.sep}stories`).filter(fn =>
      fn.match(/(\.component\.tsx|\.css)$/),
    );

    return { ...prev, [folderName]: allfiles };
  }, {});

  console.log(
    chalk.blueBright.bold(`\nComponent Folder Pairs Successfully Created..`),
  );

  return components;
}

function generateImportString(component, index) {
  const componentPath = component.split("stories")[1].replace(/\\/g, "/");
  const jsComponentName = componentPath.replace("tsx", "jsx");
  const componentName = path.basename(componentPath);
  const templateVarName = camelCase(
    componentName.replace(".component.tsx", "").replace(".css", ""),
  );

  const warningMsg =
    index === 0
      ? "// Auto Generated File, Do not modify directly!! execute `yarn generatejs` to regenerate\n"
      : "";

  let importString = outdent`
    ${warningMsg}
    // @ts-ignore
    export { default as ${templateVarName}Template } from "!!raw-loader!.${componentPath}";\n
    // @ts-ignore
    export { default as ${templateVarName}TemplateJs } from "!!raw-loader!./__js${jsComponentName}";\n
  `;

  if (componentPath.endsWith(".css")) {
    importString = outdent`
    ${warningMsg}
    // @ts-ignore
    export { default as ${templateVarName}CssTemplate } from "!!raw-loader!.${componentPath}";\n
    `;
  }

  return importString;
}

function generateTemplateFile() {
  const components = getComponentFolderPairs();
  console.log(chalk.blueBright.bold(`Generating template.ts files..`));

  Object.keys(components).forEach(componentName => {
    const templateFilePath = path.join(
      __dirname,
      "../src",
      componentName,
      "stories",
      "templates.ts",
    );

    createFile(templateFilePath, "");

    const componentPairs = components[componentName];
    componentPairs.forEach((component, index) => {
      const importString = generateImportString(component, index);
      console.log(
        chalk.green.bold(
          `CREATED: ${startCase(componentName)} templates at ${chalk.cyanBright(
            path.relative("./", templateFilePath),
          )}`,
        ),
      );

      fs.appendFileSync(templateFilePath, importString, "UTF-8", {
        flags: "a+",
      });
    });
  });
}

const generateJsFiles = filePath => {
  const code = fs.readFileSync(path.join(process.cwd(), filePath), {
    encoding: "utf8",
  });

  const transpiledCode = transpileTs(code);
  const templateFilePath = filePath
    .replace("stories", `stories${path.sep}__js`)
    .replace(".tsx", ".jsx");
  const templateDir = path.join(process.cwd(), path.dirname(templateFilePath));

  createDirectory(templateDir);

  const componentName = path.basename(templateFilePath);
  const templatePath = path.join(templateDir, componentName);

  console.log(chalk.green.bold(`CREATED: ${componentName}`));

  createFile(templatePath, transpiledCode);
};

function globRecurse(file) {
  // `file.pattern` is an object with a `glob` (string) property
  file.recurse = file.pattern.glob.indexOf("**") !== -1;
  return file;
}

const files = globFs.use(globRecurse).readdirSync("**/*.component.tsx", {});

console.log(chalk.blueBright.bold(`Generating JS Files..`));
files.forEach(filePath => generateJsFiles(filePath));

generateTemplateFile();
