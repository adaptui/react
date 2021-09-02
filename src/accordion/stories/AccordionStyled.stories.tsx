import * as React from "react";
import { Meta } from "@storybook/react";
import { CompositeState } from "reakit";

import "./AccordionStyled.css";
import js from "./templates/AccordionStyledJsx";
import ts from "./templates/AccordionStyledTsx";
import css from "./templates/AccordionStyledCss";
import { AccordionInitialState } from "../AccordionState";
import { App as Accordion } from "./AccordionStyled.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export const Default: React.FC<
  Omit<Partial<AccordionInitialState>, keyof CompositeState>
> = args => <Accordion {...args} />;

export default {
  component: Default,
  title: "Accordion/Styled",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const DefaultSelected = Default.bind({});
DefaultSelected.args = { defaultSelectedId: "accordion2" };

export const AutoSelect = Default.bind({});
AutoSelect.args = { manual: false };

export const Loop = Default.bind({});
Loop.args = { loop: true };

export const AllowToggle = Default.bind({});
AllowToggle.args = { allowToggle: true };

export const AllowMultiple = Default.bind({});
AllowMultiple.args = { allowMultiple: true };
