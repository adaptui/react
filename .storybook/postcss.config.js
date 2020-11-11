const path = require("path");
const convertImports = require("postcss-import");
const scopify = require("postcss-scopify");
const { lowerCase } = require("lodash");

function rewriteRootRule() {
  return root => {
    root.walkRules(rule => {
      rule.selectors = rule.selectors.map(selector => {
        if (selector === ":root") {
          return "&";
        }
        return selector;
      });
    });
  };
}

function addIdScope() {
  return root => {
    const filename = root.source.input.file;
    const basename = path.basename(filename, ".css");
    const lowerCaseBasename = lowerCase(basename);
    // Only root stories work
    const id = `${lowerCaseBasename.split(" ").join("")}`;
    // Grouped stories work
    // const id = `${lowerCaseBasename.split(" ").join("-")}`;

    return scopify(`#${id}`)(root);
  };
}

module.exports = {
  exec: true,
  plugins: [convertImports(), rewriteRootRule(), addIdScope()],
};
