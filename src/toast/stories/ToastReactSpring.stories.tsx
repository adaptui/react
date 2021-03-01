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
import { App as Toast } from "./ToastReactSpring.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Toast,
  title: "Toast/ReactSpring",
  parameters: {
    preview: createPreviewTabs({
      js: toastReactSpringTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: toastReactSpringTemplate,
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
