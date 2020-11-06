import "./Toast.css";
import React from "react";
import { Meta } from "@storybook/react";

import {
  toastCssTemplate,
  toastUtilsTemplate,
  toastUtilsTemplateJs,
  toastCssAnimatedTemplate,
  toastCssAnimatedTemplateJs,
} from "./templates";
import { App as CSSAnimatedToast } from "./ToastCSSAnimated.component";
import { CreateToastSandbox } from "../../../scripts/create-preview-tabs";

const sandboxJs = CreateToastSandbox({
  type: "jsx",
  deps: ["renderless-components@0.1.1-alpha.6", "react-transition-group"],
});
const sandboxTs = CreateToastSandbox({
  type: "tsx",
  deps: ["renderless-components@0.1.1-alpha.6", "react-transition-group"],
});

export default {
  component: CSSAnimatedToast,
  title: "Toast/CSSAnimatedToast",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: toastCssAnimatedTemplateJs,
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
        template: toastCssAnimatedTemplate,
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

export const Default = () => <CSSAnimatedToast />;
