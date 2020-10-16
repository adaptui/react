import * as React from "react";
import { Meta, Story } from "@storybook/react";

import {
  AccordionComponent as Accordion,
  AccordionComponentInitialState,
  StyledAccordion,
} from "./Accordion";

export default {
  component: Accordion,
  title: "Accordion",
} as Meta;

const Base: Story<AccordionComponentInitialState> = args => (
  <Accordion {...args} />
);

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

const StyledBase: Story<AccordionComponentInitialState> = args => (
  <StyledAccordion {...args} />
);

export const Styled = StyledBase.bind({});
