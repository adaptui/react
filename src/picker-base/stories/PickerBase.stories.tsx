import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { App as PickerBase } from "./PickerBase.component";
import { pickerBaseTemplate, pickerBaseTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: PickerBase,
  title: "PickerBase",
  parameters: {
    preview: createPreviewTabs({
      js: pickerBaseTemplateJs,
      ts: pickerBaseTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <PickerBase {...args} />;

export const Default = Base.bind({});

export const AlwaysVisible = Base.bind({});
AlwaysVisible.args = {
  visible: true,
};
