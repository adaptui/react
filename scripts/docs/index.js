const path = require("path");
const chalk = require("chalk");

const {
  walkSync,
  createFile,
  joinCwd,
  readFile,
} = require("../utils/common-utils");
const { addToc } = require("./add-toc");
const { addProps } = require("./add-props");
const { addExamples } = require("./add-examples");
const { addCsbLinks } = require("./add-csb-links");
const { addComposition } = require("./add-composition");
const { mdPrettify } = require("./utils");
const { typeFootprint } = require("./typeFootPrint");

const docsFolder = joinCwd("docs");

const logProgress = (msg, fileName) => {
  console.log(chalk.red.yellow(`${msg}:`, chalk.red.greenBright(fileName)));
};

const generateDocs = async templateFilePath => {
  const fileName = path.basename(templateFilePath);
  const template = readFile(templateFilePath, "utf-8");

  const addedExamples = addExamples(template);
  logProgress(`Added examples`, fileName);

  const addedCsbLinks = await addCsbLinks(addedExamples);
  logProgress(`Added csb links`, fileName);

  const addedComposition = addComposition(addedCsbLinks);
  logProgress(`Added composition`, fileName);

  const addedProps = addProps(addedComposition);
  logProgress(`Added props`, fileName);

  const addedToc = addToc(addedProps);
  logProgress(`Added table of contents`, fileName);

  createFile(path.join(docsFolder, fileName), mdPrettify(addedToc));
  logProgress(`Docs generated`, fileName);
};

if (process.argv[2]) {
  const templateFile = path.join("docs-templates", `${process.argv[2]}.md`);
  const templateFilePath = joinCwd(templateFile);

  generateDocs(templateFilePath);
} else {
  const docsTemplatesFolder = joinCwd("docs-templates");

  const docsTemplateFiles = walkSync(docsTemplatesFolder);
  docsTemplateFiles.forEach(generateDocs);
}
