import React from "react";
import { Meta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/ToastBasicCss";
import js from "./templates/ToastCSSTransitionJsx";
import ts from "./templates/ToastCSSTransitionTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { Toast } from "./ToastCSSTransition.component";

export default {
  component: Toast,
  title: "Toast/CSSTransition",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/ToastBasic.css": css,
          "src/components/Utils.component.js": jsUtils,
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/ToastBasic.css": css,
          "src/components/Utils.component.ts": tsUtils,
        },
      },
      css,
      jsUtils,
      tsUtils,
      deps: ["react-transition-group", "@chakra-ui/utils"],
    }),
    options: { showPanel: true },
  },
  decorators: [
    Story => {
      document.body.id = "toast-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default = () => <Toast />;
