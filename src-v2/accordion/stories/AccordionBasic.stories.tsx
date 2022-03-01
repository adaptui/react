import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

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
} as Meta;

export const Default: Story = {};

export const DefaultSelected: Story = {
  args: { defaultSelectedId: "Trigger 3" },
};

export const DefaultFirstIdSelected: Story = {
  args: { shouldSelectFirstId: true },
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
