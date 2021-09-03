import * as React from "react";
import { Meta, Story } from "@storybook/react";

import js from "./templates/CheckboxBasicJsx";
import ts from "./templates/CheckboxBasicTsx";
import { Checkbox, CheckboxProps } from "./CheckboxBasic.component";
import { createControls, createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Checkbox,
  title: "Checkbox/Basic",
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

export const Default: Story<CheckboxProps> = args => <Checkbox {...args} />;
