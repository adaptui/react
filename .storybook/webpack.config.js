const path = require("path");

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@renderlesskit/react": path.resolve(__dirname, "../src"),
  };
  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: require.resolve("postcss-loader"),
        options: {
          config: {
            path: __dirname,
          },
        },
      },
    ],
  });

  return config;
};
