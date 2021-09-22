import React from "react";
import { Meta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/ToastBasicCss";
import js from "./templates/ToastReactSpringJsx";
import ts from "./templates/ToastReactSpringTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { Toast } from "./ToastReactSpring.component";

import "./ToastBasic.css";

export default {
  component: Toast,
  title: "Toast/ReactSpring",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js,
      ts,
      css,
      jsUtils,
      tsUtils,
      deps: ["@react-spring/web", "@chakra-ui/utils"],
    }),
    options: { showPanel: false },
  },
  decorators: [
    Story => {
      document.body.id = "toast-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default = () => <Toast />;
