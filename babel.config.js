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
        modules: isCommonJS ? "commonjs" : false,
        targets: {
          esmodules: isESM ? true : undefined,
        },
      },
    ],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ];

  const plugins = [
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-logical-assignment-operators", { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    isBuild
      ? [
          "babel-plugin-jsx-remove-data-test-id",
          { attributes: ["data-testid"] },
        ]
      : {},
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
