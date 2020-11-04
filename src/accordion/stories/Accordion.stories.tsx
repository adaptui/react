import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { appTemplate, appTemplateJs } from "./templates";
import { App as Accordion } from "./Accordion.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Accordion,
  title: "Accordion",
  parameters: {
    preview: createPreviewTabs({ js: appTemplateJs, ts: appTemplate }),
  },
} as Meta;

const Base: Story = args => <Accordion {...args} />;

export const Default = Base.bind({});

export const DefaultSelected = Base.bind({});
DefaultSelected.args = { selectedId: "accordion3" };

export const AutoSelect = Base.bind({});
AutoSelect.args = { manual: false };

export const Loop = Base.bind({});
Loop.args = { loop: true };

export const AllowToggle = Base.bind({});
AllowToggle.args = { allowToggle: true };

export const AllowMultiple = Base.bind({});
AllowMultiple.args = { allowMultiple: true };
