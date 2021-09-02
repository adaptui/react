import * as React from "react";
import { Meta } from "@storybook/react";
import { CompositeState } from "reakit";

import js from "./templates/AccordionZAutoJsx";
import ts from "./templates/AccordionZAutoTsx";
import { AccordionInitialState } from "../AccordionState";
import { App as Accordion } from "./AccordionZAuto.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export const Default: React.FC<
  Omit<AccordionInitialState, keyof CompositeState>
> = args => <Accordion {...args} />;

export default {
  component: Default,
  title: "Accordion/zAuto",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;
