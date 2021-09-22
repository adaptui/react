import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SelectBasicCss";
import js from "./templates/SelectMultipleJsx";
import ts from "./templates/SelectMultipleTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { Select as SelectMultiple } from "./SelectMultiple.component";

import "./SelectBasic.css";

export default {
  component: SelectMultiple,
  title: "Select/Multiple",
  parameters: {
    preview: createPreviewTabs({ js, ts, css, jsUtils, tsUtils }),
    options: { showPanel: true },
  },
  decorators: [
    Story => {
      document.body.id = "select-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = args => <SelectMultiple {...args} />;
Default.args = {};
