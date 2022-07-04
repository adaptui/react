import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createControls, createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/AccordionBasicJsx";
import ts from "./templates/AccordionBasicTsx";
import { AccordionBasic } from "./AccordionBasic.component";

type Meta = ComponentMeta<typeof AccordionBasic>;
type Story = ComponentStoryObj<typeof AccordionBasic>;

export default {
  title: "Accordion/Basic",
  component: AccordionBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
  argTypes: createControls({
    ignore: [
      "items",
      "setItems",
      "orientation",
      "virtualFocus",
      "rtl",
      "focusLoop",
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
  args: { ...Default.args, defaultSelectedId: "Trigger 3" },
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
  args: { ...Default.args, selectOnMove: true, allowToggle: true },
};
