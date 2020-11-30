const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const mdPrettify = require("../utils/md-prettify");
const injectProps = require("../utils/inject-props");
const { walkSync, createFile } = require("../utils/fs-utils");
const injectExamples = require("../utils/inject-examples");
const injectCsbLinks = require("../utils/inject-csb-links");
const injectComposition = require("../utils/inject-composition");

const docsFolder = path.resolve(process.cwd(), "docs");

const injections = templateFilePath => {
  const fileName = path.basename(templateFilePath);
  const template = fs.readFileSync(templateFilePath, "utf-8");
  const injectedExamplesTemplate = injectExamples(template);
  const injectedCompositionTemplate = injectComposition(
    injectedExamplesTemplate,
  );
  const injectedPropsTemplate = injectProps(injectedCompositionTemplate);

  // createFile(path.join(docsFolder, fileName), mdPrettify(injectedPropsTemplate));
  // console.log(
  //   chalk.red.yellow(`Docs generated:`, chalk.red.greenBright(fileName)),
  // );

  injectCsbLinks(fileName, docsFolder, mdPrettify(injectedPropsTemplate));
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
