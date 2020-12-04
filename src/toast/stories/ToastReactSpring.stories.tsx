import React from "react";
import { Meta } from "@storybook/react";

import "./ToastBasic.css";
import {
  utilsTemplate,
  utilsTemplateJs,
  toastCssTemplate,
  toastReactSpringTemplate,
  toastReactSpringTemplateJs,
} from "./templates";
import { App as ReactSpringToast } from "./ToastCSSAnimated.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: ReactSpringToast,
  title: "Toast/ReactSpring",
  parameters: {
    preview: createPreviewTabs({
      js: toastReactSpringTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: toastReactSpringTemplate,
      tsUtils: utilsTemplate,
      css: toastCssTemplate,
      deps: ["react-spring"],
    }),
  },
  decorators: [
    Story => {
      document.body.id = "toast-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default = () => <ReactSpringToast />;
