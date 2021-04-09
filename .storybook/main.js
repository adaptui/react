const path = require("path");
const tsconfig = path.resolve(__dirname, "../tsconfig.storybook.json");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "storybook-addon-preview",
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
  // Need to configure typescript manually otherwise addons will not infer from types
  // https://github.com/storybookjs/storybook/issues/11146#issuecomment-643878741
  typescript: {
    reactDocgenTypescriptOptions: {
      tsconfigPath: tsconfig,
    },
  },
};
