const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: ["./src-v2/**/*"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [
    plugin(({ addUtilities, addVariant, theme }) => {
      addUtilities({
        ".focus-outline": {
          outline: `2px solid ${theme("colors.blue.600")}`,
          outlineOffset: "2px",
        },
      });

      addVariant("enter", "&[data-enter]");
      addVariant("leave", "&[data-leave]");
      addVariant("active-item", "&[data-active-item]");

      addVariant("active", ["&:active", "&[data-active]"]);
      addVariant("focus-visible", ["&:focus-visible", "&[data-focus-visible]"]);
      addVariant("aria-invalid", '&[aria-invalid="true"]');
      addVariant("aria-disabled", '&[aria-disabled="true"]');
      addVariant("aria-selected", '&[aria-selected="true"]');
      addVariant("aria-expanded", '&[aria-expanded="true"]');
      addVariant("aria-checked", '&[aria-checked="true"]');
    }),
  ],
};
