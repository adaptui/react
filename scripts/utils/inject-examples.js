const fs = require("fs");
const path = require("path");
const strip = require("strip-comments");
const prettier = require("prettier/standalone");
const parserBabel = require("prettier/parser-babel");

const injectMdContent = require("./inject-md-content");
const prettierConfig = require("../../.prettierrc.json");

const CODE_EXAMPLE_FLAG = /\<\!\-\- IMPORT_EXAMPLE ?(.*) \-\-\>/m;

const injectExamples = (docsTemplate, frontMatter) => {
  return injectMdContent(
    docsTemplate,
    CODE_EXAMPLE_FLAG,
    (line, regexMatched) => {
      let type = "example";
      if (regexMatched[1]) {
        type = `example${regexMatched[1]}`;
      }

      const exampleString = frontMatter[type];
      const examplePath = path.resolve(process.cwd(), exampleString);
      const code = fs.readFileSync(examplePath, { encoding: "utf-8" });
      const prettifiedCode = prettier.format(strip(code), {
        parser: "babel",
        plugins: [parserBabel],
        ...prettierConfig,
      });

      return prettifiedCode.replace(/\n.*$/, "");
    },
  );
};

module.exports = injectExamples;
