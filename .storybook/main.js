module.exports = {
  core: { builder: "webpack5" },
  framework: "@storybook/react",
  features: { babelModeV7: true },
  stories: ["../src-v2/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "storybook-addon-preview",
    "storybook-addon-react-docgen",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
};
