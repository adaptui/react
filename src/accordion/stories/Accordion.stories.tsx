import * as React from "react";
import { Meta } from "@storybook/react";

import { accordionTemplate, accordionTemplateJs } from "./templates";
import { App as Accordion } from "./Accordion.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";
import { AccordionState } from "../AccordionState";
import { CompositeState } from "reakit/ts";

export const Default: React.FC<Omit<
  Partial<AccordionState>,
  keyof CompositeState
>> = args => <Accordion {...args} />;

export default {
  component: Default,
  title: "Accordion",
  parameters: {
    preview: createPreviewTabs({
      js: accordionTemplateJs,
      ts: accordionTemplate,
    }),
  },
} as Meta;

export const DefaultSelected = Default.bind({});
DefaultSelected.args = { selectedId: "accordion3" };

export const AutoSelect = Default.bind({});
AutoSelect.args = { manual: false };

export const Loop = Default.bind({});
Loop.args = { loop: true };

export const AllowToggle = Default.bind({});
AllowToggle.args = { allowToggle: true };

export const AllowMultiple = Default.bind({});
AllowMultiple.args = { allowMultiple: true };
