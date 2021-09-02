import * as React from "react";
import { Meta, Story } from "@storybook/react";

import js from "./templates/CheckboxJsx";
import ts from "./templates/CheckboxTsx";
import { Checkbox, CheckboxProps } from "./Checkbox.component";
import { createControls, createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Checkbox,
  title: "Checkbox",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
  argTypes: createControls({
    ignore: [
      "unstable_system",
      "unstable_clickOnEnter",
      "unstable_clickOnSpace",
      "wrapElement",
      "focusable",
      "as",
      "checked",
      "state",
      "setState",
      "onStateChange",
      "value",
    ],
  }),
} as Meta;

const Base: Story<CheckboxProps> = args => <Checkbox {...args} />;

export const Default: Story<CheckboxProps> = Base.bind({});
Default.args = {};
