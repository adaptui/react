import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Select.css";
import { App as Select } from "./Select.component";
import { selectTemplate, selectTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Select,
  title: "Combobox/Select",
  parameters: {
    preview: createPreviewTabs({
      js: selectTemplateJs,
      ts: selectTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <Select {...args} />;

export const Default = Base.bind({});
Default.args = {};
