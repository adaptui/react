import React from "react";
import { Meta } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  toastBasicTemplate,
  toastBasicTemplateJs,
  toastStyledCssTemplate,
} from "./templates";
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
