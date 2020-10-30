const path = require("path");

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    "renderless-components": path.resolve(__dirname, "../src"),
  };

  return config;
};
