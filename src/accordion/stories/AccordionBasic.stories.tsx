import * as React from "react";
import { Meta } from "@storybook/react";
import { CompositeState } from "reakit/ts";

import { AccordionInitialState } from "../AccordionState";
import { App as Accordion } from "./AccordionBasic.component";
import { createPreviewTabs } from "../../../.storybook/utils";
import { accordionBasicTemplate, accordionBasicTemplateJs } from "./templates";

export const Default: React.FC<
  Omit<AccordionInitialState, keyof CompositeState>
> = args => <Accordion {...args} />;

export default {
  component: Default,
  title: "Accordion/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: accordionBasicTemplateJs,
      ts: accordionBasicTemplate,
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
