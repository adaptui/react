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
    if (basename === "global") return;

    const id = kebabCase(basename);
    return scopify(`#${id}`)(root);
  };
}

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@renderlesskit/react": path.resolve(__dirname, "../src"),
  };
  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: [
            require("postcss-import"),
            require("tailwindcss"),
            require("autoprefixer"),
            rewriteRootRule(),
            addIdScope(),
          ],
        },
      },
    ],
  });

  return config;
};
