const path = require("path");
const scopify = require("postcss-scopify");
const { kebabCase } = require("lodash");

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
    const id = kebabCase(basename);
    return scopify(`#${id}`)(root);
  };
}

module.exports = {
  exec: true,
  plugins: [rewriteRootRule(), addIdScope()],
};
