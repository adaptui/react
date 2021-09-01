import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createControls, createPreviewTabs } from "../../../.storybook/utils";
import { Checkbox, CheckboxProps } from "./Checkbox.component";
import { checkboxTemplate, checkboxTemplateJs } from "./templates";

export default {
  component: Checkbox,
  title: "Checkbox",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: checkboxTemplateJs,
      ts: checkboxTemplate,
    }),
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
