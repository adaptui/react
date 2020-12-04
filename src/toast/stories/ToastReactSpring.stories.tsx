import React from "react";
import { Meta } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  toastStyledCssTemplate,
  toastReactSpringTemplate,
  toastReactSpringTemplateJs,
} from "./templates";
import "./ToastStyled.css";
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
      css: toastStyledCssTemplate,
      deps: ["react-spring"],
    }),
  },
  decorators: [
    Story => {
      document.body.id = "toast-styled";
      return <Story />;
    },
  ],
} as Meta;

export const Default = () => <ReactSpringToast />;
