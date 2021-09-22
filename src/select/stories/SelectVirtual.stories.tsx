import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SelectBasicCss";
import js from "./templates/SelectVirtualJsx";
import ts from "./templates/SelectVirtualTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import Select from "./SelectVirtual.component";

import "./SelectBasic.css";

export default {
  component: Select,
  title: "Select/SelectVirtual",
  parameters: {
    preview: createPreviewTabs({
      js,
      ts,
      css,
      jsUtils,
      tsUtils,
      deps: ["react-virtual"],
    }),
    options: { showPanel: true },
  },
  decorators: [
    Story => {
      document.body.id = "select-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = args => <Select {...args} />;
Default.args = {};
