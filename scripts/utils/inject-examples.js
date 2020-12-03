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

      const code = fs.readFileSync(importPath, { encoding: "utf-8" });
      const prettifiedCode = prettier.format(strip(code), {
        parser: "babel",
        plugins: [parserBabel],
        ...prettierConfig,
      });
      return ["```js", "\n", prettifiedCode, "```"].join("");
    },
  );
};

module.exports = injectExamples;
