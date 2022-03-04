import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/AccordionStyledCss";
import js from "./templates/AccordionStyledJsx";
import ts from "./templates/AccordionStyledTsx";
import { AccordionStyled } from "./AccordionStyled.component";

import "./AccordionStyled.css";

type Meta = ComponentMeta<typeof AccordionStyled>;
type Story = ComponentStoryObj<typeof AccordionStyled>;

export default {
  component: AccordionStyled,
  title: "Accordion/Styled",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = {};

export const DefaultFirstIdSelected: Story = {
  args: { shouldSelectFirstId: true },
};

export const DefaultSelected: Story = {
  args: { defaultSelectedId: "accordion2" },
};

export const SelectOnMove: Story = {
  args: { selectOnMove: true },
};

export const NoLoop: Story = {
  args: { focusLoop: false },
};

export const AllowToggle: Story = {
  args: { allowToggle: true },
};

export const DefaultFirstIdToggle: Story = {
  args: { shouldSelectFirstId: true, allowToggle: true },
};

export const SelectOnMoveToggle: Story = {
  args: { selectOnMove: true, allowToggle: true },
};
