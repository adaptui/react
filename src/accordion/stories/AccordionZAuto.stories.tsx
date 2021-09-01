import * as React from "react";
import { Meta } from "@storybook/react";
import { CompositeState } from "reakit/ts";

import { AccordionInitialState } from "../AccordionState";
import { App as Accordion } from "./AccordionZAuto.component";
import { createPreviewTabs } from "../../../.storybook/utils";
import { accordionZAutoTemplate, accordionZAutoTemplateJs } from "./templates";

export const Default: React.FC<
  Omit<AccordionInitialState, keyof CompositeState>
> = args => <Accordion {...args} />;

export default {
  component: Default,
  title: "Accordion/zAuto",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: accordionZAutoTemplateJs,
      ts: accordionZAutoTemplate,
    }),
  },
} as Meta;

export const Base = Default.bind({});
Base.args = {};
