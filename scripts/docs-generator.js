const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const strip = require("strip-comments");
const prettier = require("prettier/standalone");
const parserBabel = require("prettier/parser-babel");
const prettierConfig = require("../.prettierrc.json");

const injectMdContent = require("./inject-md-content");
const { createDirectory, createFile, walkSync } = require("./fs-utils");

const CODE_EXAMPLE_FLAG = /\<\!\-\- IMPORT_EXAMPLE (.*) \-\-\>/m;

const docsFolder = path.resolve(process.cwd(), "docs");
const docsTemplatesFolder = path.resolve(process.cwd(), "docs-templates");
createDirectory(docsFolder);

const buildReadme = templateReadme => {
  return injectMdContent(
    templateReadme,
    CODE_EXAMPLE_FLAG,
    (line, regexMatched) => {
      const importString = regexMatched[1];
      const importPath = path.resolve(process.cwd(), importString);

      let code = fs.readFileSync(importPath, { encoding: "utf-8" });
      return prettier.format(strip(code), {
        parser: "babel",
        plugins: [parserBabel],
        ...prettierConfig,
      });
    },
  );
};

const readmeTemplates = walkSync(docsTemplatesFolder);

readmeTemplates.forEach(template => {
  const readme = buildReadme(fs.readFileSync(template, "utf-8"));
  const fileName = path.basename(template);
  console.log(
    chalk.red.yellow(`Generating doc`, chalk.red.greenBright(fileName)),
  );

  createFile(path.join(docsFolder, fileName), readme);
});
