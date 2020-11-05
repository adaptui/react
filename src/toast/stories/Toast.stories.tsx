import "./Toast.css";
import React from "react";
import { Meta } from "@storybook/react";

import {
  toastCssTemplate,
  toastTemplate,
  toastTemplateJs,
  toastUtilsTemplate,
  toastUtilsTemplateJs,
} from "./templates";
import { App as Toast } from "./Toast.component";
import { CreateToastSandbox } from "../../../scripts/create-preview-tabs";

const sandboxJs = CreateToastSandbox({
  type: "jsx",
  deps: ["renderless-components@0.1.1-alpha.6"],
});
const sandboxTs = CreateToastSandbox({
  type: "tsx",
  deps: ["renderless-components@0.1.1-alpha.6"],
});

export default {
  component: Toast,
  title: "Toast/BasicToast",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: toastTemplateJs,
        language: "jsx",
        copy: true,
        codesandbox: sandboxJs,
      },
      {
        tab: "Utils.jsx",
        template: toastUtilsTemplateJs,
        language: "jsx",
        copy: true,
        codesandbox: sandboxJs,
      },
      {
        tab: "React",
        template: toastTemplate,
        language: "tsx",
        copy: true,
        codesandbox: sandboxTs,
      },
      {
        tab: "Utils.tsx",
        template: toastUtilsTemplate,
        language: "tsx",
        copy: true,
        codesandbox: sandboxTs,
      },
      {
        tab: "CSS",
        template: toastCssTemplate,
        language: "css",
        copy: true,
        codesandbox: sandboxTs,
      },
    ],
  },
} as Meta;

export const Default = () => <Toast />;
