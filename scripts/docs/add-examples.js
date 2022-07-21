const strip = require("strip-comments");
const prettier = require("prettier/standalone");
const parserBabel = require("prettier/parser-babel");

const prettierConfig = require("../../.prettierrc.js");
const { joinCwd, extractCode } = require("../utils/common-utils");
const { addMdContent } = require("./utils");

// eslint-disable-next-line no-useless-escape
const CODE_EXAMPLE_FLAG = /\<\!\-\- ADD_EXAMPLE (.*) \-\-\>/m;

const addExamples = docsTemplate => {
  return addMdContent(docsTemplate, CODE_EXAMPLE_FLAG, (line, regexMatched) => {
    const importString = regexMatched[1];
    const importPath = joinCwd(importString);
    const prettifiedCode = prettier.format(strip(extractCode(importPath)), {
      parser: "babel",
      plugins: [parserBabel],
      ...prettierConfig,
    });
    return ["```js", "\n", prettifiedCode, "```"].join("");
  });
};

module.exports = { addExamples };
