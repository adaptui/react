import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createControls, createPreviewTabs } from "../../../.storybook/utils";

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
  argTypes: createControls({
    ignore: [
      "items",
      "setItems",
      "orientation",
      "virtualFocus",
      "rtl",
      "focusWrap",
      "focusShift",
      "moves",
      "includesBaseElement",
      "activeId",
      "defaultActiveId",
      "setMoves",
      "setActiveId",
      "selectedId",
      "defaultSelectedId",
      "setSelectedId",
    ],
  }),
} as Meta;

export const Default: Story = {};

export const DefaultFirstIdSelected: Story = {
  ...Default,
  args: { ...Default.args, shouldSelectFirstId: true },
};

export const DefaultSelected: Story = {
  ...Default,
  args: { ...Default.args, defaultSelectedId: "accordion2" },
};

export const SelectOnMove: Story = {
  ...Default,
  args: { ...Default.args, selectOnMove: true },
};

export const NoLoop: Story = {
  ...Default,
  args: { ...Default.args, focusLoop: false },
};

export const AllowToggle: Story = {
  ...Default,
  args: { ...Default.args, allowToggle: true },
};

export const DefaultFirstIdToggle: Story = {
  ...Default,
  args: { ...Default.args, shouldSelectFirstId: true, allowToggle: true },
};

export const SelectOnMoveToggle: Story = {
  ...Default,
  args: { selectOnMove: true, allowToggle: true },
};
