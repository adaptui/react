const prettier = require("prettier/standalone");
const markdownParser = require("prettier/parser-markdown");

const prettierConfig = require("../../../.prettierrc.js");

const mdPrettify = docsTemplate => {
  return prettier.format(docsTemplate, {
    parser: "markdown",
    plugins: [markdownParser],
    ...prettierConfig,
  });
};

module.exports = { mdPrettify };
