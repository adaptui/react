import React from "react";
import { Meta } from "@storybook/react";

import "./ToastBasic.css";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import css from "./templates/ToastBasicCss";
import js from "./templates/ToastReactSpringJsx";
import ts from "./templates/ToastReactSpringTsx";
import { Toast } from "./ToastReactSpring.component";
import { createPreviewTabs } from "../../../.storybook/utils";

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
