import * as React from "react";
import { Meta } from "@storybook/react";

import { CompositeState } from "reakit/ts";
import { App as Accordion } from "./Accordion.component";
import { accordionTemplate, accordionTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";
import { AccordionInitialState } from "../types";

export const Default: React.FC<Omit<
  Partial<AccordionInitialState>,
  keyof CompositeState
>> = args => <Accordion {...args} />;

export default {
  component: Default,
  title: "Accordion/Basic",
  parameters: {
    preview: createPreviewTabs({
      js: accordionTemplateJs,
      ts: accordionTemplate,
    }),
  },
} as Meta;

export const DefaultSelected = Default.bind({});
DefaultSelected.args = { defaultSelectedId: "accordion3" };

export const AutoSelect = Default.bind({});
AutoSelect.args = { manual: false };

export const Loop = Default.bind({});
Loop.args = { loop: true };

export const AllowToggle = Default.bind({});
AllowToggle.args = { allowToggle: true };

export const AllowMultiple = Default.bind({});
AllowMultiple.args = { allowMultiple: true };
