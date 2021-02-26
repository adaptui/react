const BABEL_ENV = process.env.BABEL_ENV;
const isCommonJS = BABEL_ENV !== undefined && BABEL_ENV === "cjs";
const isESM = BABEL_ENV !== undefined && BABEL_ENV === "esm";
const isBuild = !!BABEL_ENV;

module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/env",
      {
        loose: true,
        modules: isCommonJS ? "commonjs" : false,
        targets: {
          esmodules: isESM ? true : undefined,
        },
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ];

  const plugins = [
    "date-fns",
    "@chakra-ui/babel-plugin",
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ];

  return {
    presets,
    plugins,
    env: {
      test: {
        presets: [["@babel/env", { targets: { node: "current" } }]],
      },
    },
    ignore: isBuild ? ["**/*/__tests__", "**/*/stories"] : [],
  };
};
