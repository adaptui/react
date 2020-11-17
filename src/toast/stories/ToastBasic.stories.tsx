import React from "react";
import { Meta } from "@storybook/react";

import {
  toastBasicCssTemplate,
  toastBasicTemplate,
  toastBasicTemplateJs,
  toastUtilsTemplate,
  toastUtilsTemplateJs,
} from "./templates";
import "./ToastBasic.css";
import { App as Toast } from "./ToastBasic.component";
import { CreateToastSandbox } from "../../../scripts/create-preview-tabs";

const sandboxJs = CreateToastSandbox({
  type: "jsx",
  deps: ["renderless-components@0.1.1-beta.3", "reakit"],
});
const sandboxTs = CreateToastSandbox({
  type: "tsx",
  deps: ["renderless-components@0.1.1-beta.3", "reakit"],
});

export default {
  component: Toast,
  title: "Toast/Basic",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: toastBasicTemplateJs,
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
        template: toastBasicTemplate,
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
        template: toastBasicCssTemplate,
        language: "css",
        copy: true,
        codesandbox: sandboxTs,
      },
    ],
  },
} as Meta;

export const Default = () => <Toast />;
