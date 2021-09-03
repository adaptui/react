import React from "react";
import { Meta } from "@storybook/react";

import "./ToastBasic.css";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import css from "./templates/ToastBasicCss";
import js from "./templates/ToastCSSAnimatedJsx";
import ts from "./templates/ToastCSSAnimatedTsx";
import { App as Toast } from "./ToastCSSAnimated.component";
import { createPreviewTabs } from "../../../.storybook/utils";

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
  },
  decorators: [
    Story => {
      document.body.id = "toast-basic";
      return (
        <div
          style={{
            height: "90vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
} as Meta;

export const Default = () => <Toast />;
