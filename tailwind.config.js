const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};
