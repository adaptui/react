const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const globFs = require("glob-fs")();
const outdent = require("outdent");
const { camelCase } = require("lodash");
const transpileTs = require("./transpile-ts");

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

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);

  files.forEach(function (file) {
    const fullPath = path.join(dir, file);

    if (isDirectory(fullPath)) {
      filelist = walkSync(fullPath, filelist);
    } else {
      filelist.push(fullPath);
    }
  });

  return filelist;
}

const generateJsFiles = filePath => {
  const code = fs.readFileSync(path.join(process.cwd(), filePath), {
    encoding: "utf8",
  });

  const transpiledCode = transpileTs(code);
  const templateFilePath = filePath
    .replace("stories", `stories${path.sep}__js`)
    .replace(".tsx", ".jsx");

  const __jsPath = path.dirname(templateFilePath).split("__js")[0];

  const templateDir = path.join(process.cwd(), __jsPath, "__js");
  createDirectory(templateDir);

  const componentName = path.basename(templateFilePath);
  const templatePath = path.join(templateDir, componentName);

  console.log(chalk.green.bold(`CREATED: ${componentName}`));

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

    const allfiles = walkSync(`${curr}${path.sep}stories`).filter(fn =>
      fn.match(/(\.component\.tsx|\.css)$/),
    );

    return { ...prev, [folderName.base]: allfiles };
  }, {});

  console.log(
    chalk.blueBright.bold(`Component Folder Pairs Successfully Created..`),
  );

  return components;
}

function generateImportString(component, index) {
  const componentPath = component
    .split("stories")[1]
    .replace("\\", "")
    .replace(/\\/g, "/");

  const componentName = path.basename(componentPath);
  const jsComponentName = componentName.replace("tsx", "jsx");
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
    export { default as ${templateVarName}Template } from "!!raw-loader!./${componentPath}";\n
    // @ts-ignore
    export { default as ${templateVarName}TemplateJs } from "!!raw-loader!./__js/${jsComponentName}";\n
  `;

  if (componentPath.endsWith(".css")) {
    importString = outdent`
    ${warningMsg}
    // @ts-ignore
    export { default as ${templateVarName}CssTemplate } from "!!raw-loader!./${componentPath}";\n
    `;
  }

  return importString;
}

function generateTemplateFile() {
  const components = getComponentFolderPairs();
  console.log(chalk.blueBright.bold(`Generating template.ts files..`));

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
          `CREATED template.ts (${chalk.cyanBright(
            path.relative("./", templateFilePath),
          )})`,
        ),
      );

      fs.appendFileSync(templateFilePath, importString, "UTF-8", {
        flags: "a+",
      });
    });
  });
}

function globRecurse(file) {
  // `file.pattern` is an object with a `glob` (string) property
  file.recurse = file.pattern.glob.indexOf("**") !== -1;
  return file;
}
const files = globFs.use(globRecurse).readdirSync("**/*.component.tsx", {});
console.log(chalk.blueBright.bold(`Generating JS Files..`));
files.forEach(filePath => generateJsFiles(filePath));

generateTemplateFile();
