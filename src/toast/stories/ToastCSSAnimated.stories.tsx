import React from "react";
import { Meta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/ToastBasicCss";
import js from "./templates/ToastCSSAnimatedJsx";
import ts from "./templates/ToastCSSAnimatedTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { Toast } from "./ToastCSSAnimated.component";

import "./ToastBasic.css";

export default {
  component: Toast,
  title: "Toast/CSSAnimated",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js,
      ts,
      css,
      jsUtils,
      tsUtils,
      deps: ["@chakra-ui/utils"],
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
