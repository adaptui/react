const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const matter = require("gray-matter");

const mdPrettify = require("../utils/md-prettify");
const injectProps = require("../utils/inject-props");
const { walkSync, createFile } = require("../utils/fs-utils");
const injectExamples = require("../utils/inject-examples");
const injectCsbLinks = require("../utils/inject-csb-links");
const injectComposition = require("../utils/inject-composition");
const docsFolder = path.resolve(process.cwd(), "docs");

const injections = async templateFilePath => {
  const fileName = path.basename(templateFilePath);
  const source = path.join("src", path.basename(templateFilePath, ".md"));
  const template = fs.readFileSync(templateFilePath, "utf-8");
  const frontMatter = matter(template).data;
  const injectedExamplesTemplate = injectExamples(template, frontMatter);
  const injectedCompositionTemplate = injectComposition(
    injectedExamplesTemplate,
    source,
  );
  const injectedPropsTemplate = injectProps(
    injectedCompositionTemplate,
    source,
  );
  const injectedCsbLinksTemplate = await injectCsbLinks(template, frontMatter);

  createFile(
    path.join(docsFolder, fileName),
    mdPrettify(injectedCsbLinksTemplate),
  );
  console.log(
    chalk.red.yellow(`Docs generated:`, chalk.red.greenBright(fileName)),
  );
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
