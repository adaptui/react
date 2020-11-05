const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const globFs = require("glob-fs")();
const transpileTs = require("./transpile-ts");
const outdent = require("outdent");
const { camelCase } = require("lodash");

function recurse(file) {
  // `file.pattern` is an object with a `glob` (string) property
  file.recurse = file.pattern.glob.indexOf("**") !== -1;
  return file;
}

// Create a new folder at the specified path
function createDirectory(path) {
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
  });
}

const generateJsFiles = filePath => {
  const code = fs.readFileSync(path.join(process.cwd(), filePath), {
    encoding: "utf8",
  });

  const transpiledCode = transpileTs(code);
  const templateFilePath = filePath
    .replace("stories", "stories/__js")
    .replace(".tsx", ".jsx");

  const templateDir = path.join(
    process.cwd(),
    templateFilePath.substring(0, templateFilePath.lastIndexOf(path.sep)),
  );

  createDirectory(templateDir);

  const templatePath = path.join(process.cwd(), templateFilePath);

  const componentName = templatePath.split(`__js${path.sep}`)[1];
  console.log(chalk.green.bold(`CREATED: ${componentName}`), `${filePath}`);

  createFile(templatePath, transpiledCode);
};

// -> get all the component folders [accordion, breadcrumb...]
// -> find all the .components inside the folders
// -> create object with component pairs
// { accordion: [Accordion.component.tsx, AccordionStyled.component.tsx] }
// -> loop through them and create template.ts file
const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);

function getComponentFolderPairs() {
  const componentFolders = getDirectories(
    path.resolve(__dirname, "../src"),
  ).filter(path => !path.match(/(__mocks__|utils)/));

  const components = componentFolders.reduce((prev, curr) => {
    const folderName = path.parse(curr);
    const allfiles = fs
      .readdirSync(`${curr}/stories`)
      .filter(fn => fn.match(/(\.component\.tsx|\.css)$/));

    return { ...prev, [folderName.base]: allfiles };
  }, {});

  return components;
}

function generateImportString(component, index) {
  const templateVarName = camelCase(
    component.replace(".component.tsx", "").replace(".css", ""),
  );

  const warningMsg =
    index === 0
      ? "// Auto Generated File, Do not modify directly!! execute `yarn generatejs` to regenerate\n"
      : "";

  let importString = outdent`
      ${warningMsg}
      // @ts-ignore
      export { default as ${templateVarName}Template } from "!!raw-loader!./${component}";\n
      // @ts-ignore
      export { default as ${templateVarName}TemplateJs } from "!!raw-loader!./__js/${component.replace(
    "tsx",
    "jsx",
  )}";
    `;

  if (component.endsWith(".css")) {
    importString = outdent`

      // @ts-ignore
      export { default as ${templateVarName}CssTemplate } from "!!raw-loader!./${component}";\n
    `;
  }

  return index === 0 ? importString.trim() : importString;
}

function generateTemplateFile() {
  const components = getComponentFolderPairs();

  Object.keys(components).forEach(componentName => {
    const componentPairs = components[componentName];

    const templateFilePath = path.join(
      __dirname,
      "../src",
      componentName,
      "stories",
      "templates.ts",
    );

    createFile(templateFilePath, "");

    componentPairs.forEach((component, index) => {
      const importString = generateImportString(component, index);

      console.log(
        chalk.red.yellow(
          `Writing template.ts (${chalk.cyanBright(component)})`,
        ),
      );

      fs.appendFileSync(templateFilePath, importString, "UTF-8", {
        flags: "a+",
      });
    });
  });
}

generateTemplateFile();

const files = globFs.use(recurse).readdirSync("**/*.component.tsx", {});
files.forEach(filePath => generateJsFiles(filePath));
