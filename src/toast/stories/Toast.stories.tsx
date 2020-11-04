import "./Toast.css";
import React from "react";
import { Meta } from "@storybook/react";

import {
  cssTemplate,
  appTemplate,
  appTemplateJs,
  appUtilsTemplate,
  appUtilsTemplateJs,
} from "./templates";
import { App as Toast } from "./Toast.component";
import { CreateToastSandbox } from "../../../scripts/create-preview-tabs";

const sandboxJs = CreateToastSandbox({
  type: "jsx",
  deps: ["renderless-components@alpha"],
});
const sandboxTs = CreateToastSandbox({
  type: "tsx",
  deps: ["renderless-components@alpha"],
});

export default {
  component: Toast,
  title: "Toast/BasicToast",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: appTemplateJs,
        language: "jsx",
        copy: true,
        codesandbox: sandboxJs,
      },
      {
        tab: "React",
        template: appTemplate,
        language: "tsx",
        copy: true,
        codesandbox: sandboxTs,
      },
      {
        tab: "CSS",
        template: cssTemplate,
        language: "css",
        copy: true,
        codesandbox: sandboxTs,
      },
      {
        tab: "Utils.tsx",
        template: appUtilsTemplate,
        language: "tsx",
        copy: true,
        codesandbox: sandboxTs,
      },
      {
        tab: "Utils.jsx",
        template: appUtilsTemplateJs,
        language: "jsx",
        copy: true,
        codesandbox: sandboxJs,
      },
    ],
  },
} as Meta;

export const Default = () => <Toast />;
