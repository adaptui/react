import React from "react";
import { Meta } from "@storybook/react";

import {
  utilsTemplate,
  utilsTemplateJs,
  toastBasicTemplate,
  toastBasicTemplateJs,
  toastCssTemplate,
} from "./templates";
import "./Toast.css";
import { App as Toast } from "./ToastBasic.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Toast,
  title: "Toast/Basic",
  parameters: {
    preview: createPreviewTabs({
      js: toastBasicTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: toastBasicTemplate,
      tsUtils: utilsTemplate,
      css: toastCssTemplate,
      deps: ["@chakra-ui/utils"],
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
