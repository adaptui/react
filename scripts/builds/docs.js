const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const injectToc = require("../utils/inject-toc");
const mdPrettify = require("../utils/md-prettify");
const injectProps = require("../utils/inject-props");
const { walkSync, createFile } = require("../utils/fs-utils");
const injectExamples = require("../utils/inject-examples");
const injectCsbLinks = require("../utils/inject-csb-links");
const injectComposition = require("../utils/inject-composition");

const docsFolder = path.resolve(process.cwd(), "docs");

const injections = async templateFilePath => {
  const fileName = path.basename(templateFilePath);
  const template = fs.readFileSync(templateFilePath, "utf-8");
  const logProgress = (msg, fileName) => {
    console.log(chalk.red.yellow(`${msg}:`, chalk.red.greenBright(fileName)));
  };

  const injectedExamplesTemplate = injectExamples(template);
  logProgress(`Injected examples`, fileName);

  const injectedCompositionTemplate = injectComposition(
    injectedExamplesTemplate,
  );
  logProgress(`Injected composition`, fileName);

  const injectedPropsTemplate = injectProps(injectedCompositionTemplate);
  logProgress(`Injected props`, fileName);

  const injectedTocTemplate = injectToc(injectedPropsTemplate);
  logProgress(`Injected table of contents`, fileName);

  const finalReadme = await injectCsbLinks(injectedTocTemplate);
  logProgress(`Injected sandbox`, fileName);

  createFile(path.join(docsFolder, fileName), mdPrettify(finalReadme));
  logProgress(`Docs generated`, fileName);
};

if (process.argv[2]) {
  const templateFile = path.join("docs-templates", `${process.argv[2]}.md`);
  const templateFilePath = path.resolve(process.cwd(), templateFile);

  injections(templateFilePath);
} else {
  const docsTemplatesFolder = path.resolve(process.cwd(), "docs-templates");

  const docsTemplateFiles = walkSync(docsTemplatesFolder);
  docsTemplateFiles.forEach(injections);
}
