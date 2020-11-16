import React from "react";
import { Meta } from "@storybook/react";

import "./ToastBasic.css";
import {
  toastBasicCssTemplate,
  toastUtilsTemplate,
  toastUtilsTemplateJs,
  toastReactSpringTemplate,
  toastReactSpringTemplateJs,
} from "./templates";
import { App as ReactSpringToast } from "./ToastCSSAnimated.component";
import { CreateToastSandbox } from "../../../scripts/create-preview-tabs";

const sandboxJs = CreateToastSandbox({
  type: "jsx",
  deps: ["renderless-components@0.1.1-beta.1", "react-spring"],
});
const sandboxTs = CreateToastSandbox({
  type: "tsx",
  deps: ["renderless-components@0.1.1-beta.1", "react-spring"],
});

export default {
  component: ReactSpringToast,
  title: "Toast/ReactSpring",
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
        template: toastBasicCssTemplate,
        language: "css",
        copy: true,
        codesandbox: sandboxTs,
      },
    ],
  },
  decorators: [
    Story => {
      document.body.id = "toast-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default = () => <ReactSpringToast />;
