import React from "react";
import { Meta } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  toastStyledCssTemplate,
  toastCssTransitionTemplate,
  toastCssTransitionTemplateJs,
} from "./templates";
import "./ToastStyled.css";
import { App as Toast } from "./ToastCSSTransition.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Toast,
  title: "Toast/CSSTransition",
  parameters: {
    preview: createPreviewTabs({
      js: toastCssTransitionTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: toastCssTransitionTemplate,
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
