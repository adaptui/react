import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Select.css";
import {
  selectControlledTemplate,
  selectControlledTemplateJs,
  selectCssTemplate,
} from "./templates";
import { App as SelectControlled } from "./SelectControlled.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: SelectControlled,
  title: "Combobox/SelectControlled",
  parameters: {
    preview: createPreviewTabs({
      js: selectControlledTemplateJs,
      ts: selectControlledTemplate,
      css: selectCssTemplate,
    }),
  },
  decorators: [
    Story => {
      document.body.id = "select";
      return <Story />;
    },
  ],
} as Meta;

const Base: Story = args => <SelectControlled {...args} />;

export const Default = Base.bind({});
Default.args = {};
