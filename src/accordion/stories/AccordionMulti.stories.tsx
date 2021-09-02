import * as React from "react";
import { Meta } from "@storybook/react";
import { CompositeState } from "reakit";

import js from "./templates/AccordionMultiJsx";
import ts from "./templates/AccordionMultiTsx";
import { AccordionInitialState } from "../AccordionState";
import { App as Accordion } from "./AccordionMulti.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export const Default: React.FC<
  Omit<AccordionInitialState, keyof CompositeState>
> = args => <Accordion {...args} />;

export default {
  component: Default,
  title: "Accordion/Multi",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const DefaultSelected = Default.bind({});
DefaultSelected.args = { defaultSelectedIds: ["accordion3", "accordion4"] };

export const AutoSelect = Default.bind({});
AutoSelect.args = { manual: false };

export const Loop = Default.bind({});
Loop.args = { loop: true };
