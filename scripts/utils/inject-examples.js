const strip = require("strip-comments");
const prettier = require("prettier/standalone");
const parserBabel = require("prettier/parser-babel");

const { joinCwd, extractCode } = require("./common-utils");
const injectMdContent = require("./inject-md-content");
const prettierConfig = require("../../.prettierrc.js");

// eslint-disable-next-line no-useless-escape
const CODE_EXAMPLE_FLAG = /\<\!\-\- IMPORT_EXAMPLE (.*) \-\-\>/m;

const injectExamples = docsTemplate => {
  return injectMdContent(
    docsTemplate,
    CODE_EXAMPLE_FLAG,
    (line, regexMatched) => {
      const importString = regexMatched[1];
      const importPath = joinCwd(importString);
      const prettifiedCode = prettier.format(strip(extractCode(importPath)), {
        parser: "babel",
        plugins: [parserBabel],
        ...prettierConfig,
      });
      return ["```js", "\n", prettifiedCode, "```"].join("");
    },
  );
};

module.exports = injectExamples;
