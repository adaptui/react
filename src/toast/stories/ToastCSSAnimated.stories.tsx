import React from "react";
import { Meta } from "@storybook/react";

import "./Toast.css";
import {
  utilsTemplate,
  utilsTemplateJs,
  toastCssTemplate,
  toastCssAnimatedTemplate,
  toastCssAnimatedTemplateJs,
} from "./templates";
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
      css: toastCssTemplate,
      deps: ["react-transition-group"],
    }),
  },
  decorators: [
    Story => {
      document.body.id = "toast-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default = () => <CSSAnimatedToast />;
