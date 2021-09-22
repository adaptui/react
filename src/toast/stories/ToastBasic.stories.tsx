import React from "react";
import { Meta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/ToastBasicCss";
import js from "./templates/ToastBasicJsx";
import ts from "./templates/ToastBasicTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { Toast } from "./ToastBasic.component";

import "./ToastBasic.css";

export default {
  component: Toast,
  title: "Toast/Basic",
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
} as Meta;

export const Default = () => <Toast />;
