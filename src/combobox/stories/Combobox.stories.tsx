import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Combobox.css";
import { App as Combobox } from "./Combobox.component";
import { comboboxTemplate, comboboxTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Combobox,
  title: "Combobox",
  parameters: {
    preview: createPreviewTabs({
      js: comboboxTemplateJs,
      ts: comboboxTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <Combobox {...args} />;

export const Default = Base.bind({});
Default.args = {};
