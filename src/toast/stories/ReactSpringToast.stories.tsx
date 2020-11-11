import "./Toast.css";
import React from "react";
import { Meta } from "@storybook/react";

import {
  toastCssTemplate,
  toastUtilsTemplate,
  toastUtilsTemplateJs,
  toastReactSpringTemplate,
  toastReactSpringTemplateJs,
} from "./templates";
import { App as ReactSpringToast } from "./ToastCSSAnimated.component";
import { CreateToastSandbox } from "../../../scripts/create-preview-tabs";

const sandboxJs = CreateToastSandbox({
  type: "jsx",
  deps: ["renderless-components@0.1.1-beta.0", "react-spring"],
});
const sandboxTs = CreateToastSandbox({
  type: "tsx",
  deps: ["renderless-components@0.1.1-beta.0", "react-spring"],
});

export default {
  component: ReactSpringToast,
  title: "Toast/ReactSpringToast",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: toastReactSpringTemplateJs,
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
        template: toastReactSpringTemplate,
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

export const Default = () => <ReactSpringToast />;
