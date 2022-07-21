import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createControls, createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/AccordionMultipleJsx";
import ts from "./templates/AccordionMultipleTsx";
import { AccordionMultiple } from "./AccordionMultiple.component";

type Meta = ComponentMeta<typeof AccordionMultiple>;
type Story = ComponentStoryObj<typeof AccordionMultiple>;

export default {
  title: "Accordion/Multiple",
  component: AccordionMultiple,
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
      "allowToggle",
    ],
  }),
} as Meta;

export const Default: Story = { args: {} };

export const DefaultFirstIdSelected: Story = {
  ...Default,
  args: { ...Default.args, shouldSelectFirstId: true },
};

export const DefaultSelected: Story = {
  ...Default,
  args: { ...Default.args, defaultSelectedId: ["Trigger 3", "Trigger 4"] },
};

export const NoLoop: Story = {
  ...Default,
  args: { ...Default.args, focusLoop: false },
};
