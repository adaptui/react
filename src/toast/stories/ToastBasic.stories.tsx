import React from "react";
import { Meta } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  toastBasicTemplate,
  toastBasicTemplateJs,
  toastBasicCssTemplate,
} from "./templates";
import "./ToastBasic.css";
import { App as Toast } from "./ToastBasic.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Toast,
  title: "Toast/Basic",
  parameters: {
    preview: createPreviewTabs({
      js: toastBasicTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: toastBasicTemplate,
      tsUtils: utilsTemplate,
      css: toastBasicCssTemplate,
      deps: ["react-spring"],
    }),
  },
} as Meta;

export const Default = () => <Toast />;
