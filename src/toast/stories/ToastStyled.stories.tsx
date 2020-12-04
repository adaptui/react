import React from "react";
import { Meta } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  toastStyledCssTemplate,
  toastStyledTemplate,
  toastStyledTemplateJs,
} from "./templates";
import "./ToastStyled.css";
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
      css: toastStyledCssTemplate,
    }),
  },
} as Meta;

export const Default = () => <Toast />;
