import React from "react";
import { Meta } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  toastCssTemplate,
  toastCssTransitionTemplate,
  toastCssTransitionTemplateJs,
} from "./templates";
import "./Toast.css";
import { App as Toast } from "./ToastCSSTransition.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Toast,
  title: "Toast/CSSTransition",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: toastCssTransitionTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: toastCssTransitionTemplate,
      tsUtils: utilsTemplate,
      css: toastCssTemplate,
      deps: ["react-transition-group", "@chakra-ui/utils"],
    }),
  },
  decorators: [
    Story => {
      document.body.id = "toast";
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
