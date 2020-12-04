import React from "react";
import { Meta } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  toastStyledCssTemplate,
  toastCssAnimatedTemplate,
  toastCssAnimatedTemplateJs,
} from "./templates";
import "./ToastStyled.css";
import { App as CSSAnimatedToast } from "./ToastCSSAnimated.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: CSSAnimatedToast,
  title: "Toast/CSSAnimated",
  parameters: {
    preview: createPreviewTabs({
      js: toastCssAnimatedTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: toastCssAnimatedTemplate,
      tsUtils: utilsTemplate,
      css: toastStyledCssTemplate,
      deps: ["react-transition-group"],
    }),
  },
  decorators: [
    Story => {
      document.body.id = "toast-styled";
      return <Story />;
    },
  ],
} as Meta;

export const Default = () => <CSSAnimatedToast />;
