import React from "react";
import { Meta } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  toastCssTemplate,
  toastStyledTemplate,
  toastStyledTemplateJs,
} from "./templates";
import "./Toast.css";
import { App as Toast } from "./ToastStyled.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Toast,
  title: "Toast/Styled",
  parameters: {
    preview: createPreviewTabs({
      js: toastStyledTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: toastStyledTemplate,
      tsUtils: utilsTemplate,
      css: toastCssTemplate,
    }),
  },
} as Meta;

export const Default = () => <Toast />;
