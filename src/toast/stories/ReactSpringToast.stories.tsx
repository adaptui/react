import "./Toast.css";
import React from "react";
import { Meta } from "@storybook/react";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import {
  cssTemplate,
  appTemplateReactSpring,
  appTemplateJsReactSpring,
} from "./templates";
import { App as ReactSpringToast } from "./ToastCSSAnimated.component";

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
        codesandbox: DEFAULT_REACT_CODESANDBOX([
          "renderless-components@alpha",
          "react-transition-group",
        ]),
      },
      {
        tab: "React",
        template: appTemplateReactSpring,
        language: "tsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX([
          "renderless-components@alpha",
          "react-transition-group",
        ]),
      },
      {
        tab: "CSS",
        template: cssTemplate,
        language: "css",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX([
          "renderless-components@alpha",
          "react-transition-group",
        ]),
      },
    ],
  },
} as Meta;

export const Default = () => <ReactSpringToast />;
