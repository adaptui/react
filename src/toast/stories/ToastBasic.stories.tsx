import React from "react";
import { Meta } from "@storybook/react";

import "./ToastBasic.css";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import js from "./templates/ToastBasicJsx";
import ts from "./templates/ToastBasicTsx";
import css from "./templates/ToastBasicCss";
import { App as Toast } from "./ToastBasic.component";
import { createPreviewTabs } from "../../../.storybook/utils";

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
  },
} as Meta;

export const Default = () => <Toast />;
