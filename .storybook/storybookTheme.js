// .storybook/YourTheme.js

import { create } from "@storybook/theming";
import logo from "./adaptui.svg";

export default create({
  base: "light",
  brandTitle: "AdaptUI",
  brandUrl: "https://github.com/adaptui",
  brandImage: logo,
  brandTarget: "_self",
});
