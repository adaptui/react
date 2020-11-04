import "./Toast.css";
import React from "react";
import { Meta } from "@storybook/react";

import {
  cssTemplate,
  appUtilsTemplate,
  appUtilsTemplateJs,
  appTemplateReactSpring,
  appTemplateJsReactSpring,
} from "./templates";
import { App as ReactSpringToast } from "./ToastCSSAnimated.component";
import { CreateToastSandbox } from "../../../scripts/create-preview-tabs";

const sandboxJs = CreateToastSandbox({
  type: "jsx",
  deps: ["renderless-components@alpha", "react-spring"],
});
const sandboxTs = CreateToastSandbox({
  type: "tsx",
  deps: ["renderless-components@alpha", "react-spring"],
});

export default {
  component: ReactSpringToast,
  title: "Toast/ReactSpringToast",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: appTemplateJsReactSpring,
        language: "jsx",
        copy: true,
        codesandbox: sandboxJs,
      },
      {
        tab: "React",
        template: appTemplateReactSpring,
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

export const Default = () => <ReactSpringToast />;
