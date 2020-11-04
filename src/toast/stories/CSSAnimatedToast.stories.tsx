import "./Toast.css";
import React from "react";
import { Meta } from "@storybook/react";

import {
  cssTemplate,
  appUtilsTemplate,
  appUtilsTemplateJs,
  appTemplateCssAnimation,
  appTemplateJsCssAnimation,
} from "./templates";
import { App as CSSAnimatedToast } from "./ToastCSSAnimated.component";
import { CreateToastSandbox } from "../../../scripts/create-preview-tabs";

const sandboxJs = CreateToastSandbox({
  type: "jsx",
  deps: ["renderless-components@alpha", "react-transition-group"],
});
const sandboxTs = CreateToastSandbox({
  type: "tsx",
  deps: ["renderless-components@alpha", "react-transition-group"],
});

export default {
  component: CSSAnimatedToast,
  title: "Toast/CSSAnimatedToast",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: appTemplateJsCssAnimation,
        language: "jsx",
        copy: true,
        codesandbox: sandboxJs,
      },
      {
        tab: "React",
        template: appTemplateCssAnimation,
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

export const Default = () => <CSSAnimatedToast />;
