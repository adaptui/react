import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { appTemplate, appTemplateJs } from "./templates";
import { App as PickerBase } from "./PickerBase.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: PickerBase,
  title: "PickerBase",
  parameters: {
    preview: createPreviewTabs({
      js: appTemplateJs,
      ts: appTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <PickerBase {...args} />;

export const Default = Base.bind({});

export const AlwaysVisible = Base.bind({});
AlwaysVisible.args = {
  visible: true,
};
