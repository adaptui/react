const babelOptions = require("./babel.config");

module.exports = require("babel-jest").createTransformer(
  babelOptions({
    env: () => true,
    cache: () => true,
  }),
);
