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
      js: {
        template: js,
        files: {
          "src/components/Utils.component.js": jsUtils,
          "src/components/ToastBasic.css": css,
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/Utils.component.ts": tsUtils,
          "src/components/ToastBasic.css": css,
        },
      },
      css,
      jsUtils,
      tsUtils,
      deps: ["@chakra-ui/utils"],
    }),
    options: { showPanel: true },
  },
} as Meta;

export const Default = () => <Toast />;
