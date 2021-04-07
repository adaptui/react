import React from "react";
import { Meta } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  toastCssTemplate,
  toastReactSpringTemplate,
  toastReactSpringTemplateJs,
} from "./templates";
import "./Toast.css";
import { App as Toast } from "./ToastReactSpring.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Toast,
  title: "Toast/ReactSpring",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: toastReactSpringTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: toastReactSpringTemplate,
      tsUtils: utilsTemplate,
      css: toastCssTemplate,
      deps: ["react-spring", "@chakra-ui/utils"],
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
