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
import { App as Toast } from "./ToastCSSAnimated.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Toast,
  title: "Toast/CSSAnimated",
  parameters: {
    preview: createPreviewTabs({
      js: toastCssAnimatedTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: toastCssAnimatedTemplate,
      tsUtils: utilsTemplate,
      css: toastStyledCssTemplate,
    }),
  },
  decorators: [
    Story => {
      document.body.id = "tailwind";
      document.body.classList.add("center");
      return <Story />;
    },
  ],
} as Meta;

export const Default = () => <Toast />;
