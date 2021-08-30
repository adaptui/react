import * as React from "react";
import { Meta, Story } from "@storybook/react";

import {
  App as Checkbox,
  AppProps as CheckboxProps,
} from "./Checkbox.component";
import { checkboxTemplate, checkboxTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

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
} as Meta;

const Base: Story<CheckboxProps> = args => <Checkbox {...args} />;

export const Default: Story<CheckboxProps> = Base.bind({});
Default.args = {};
