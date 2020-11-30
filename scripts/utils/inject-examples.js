const fs = require("fs");
const path = require("path");
const strip = require("strip-comments");
const prettier = require("prettier/standalone");
const parserBabel = require("prettier/parser-babel");

const injectMdContent = require("./inject-md-content");
const prettierConfig = require("../../.prettierrc.json");

const CODE_EXAMPLE_FLAG = /\<\!\-\- IMPORT_EXAMPLE (.*) \-\-\>/m;

const injectExamples = docsTemplate => {
  return injectMdContent(
    docsTemplate,
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

module.exports = injectExamples;
