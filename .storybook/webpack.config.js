const path = require("path");
const FilterWarningPlugin = require("webpack-filter-warnings-plugin");

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    "renderless-components": path.resolve(__dirname, "../src"),
  };

  // To fix error with ts lib in transformTs
  config.plugins.push(
    new FilterWarningPlugin({
      exclude: /Critical dependency: the request of a dependency is an expression/,
    }),
  );

  return config;
};
