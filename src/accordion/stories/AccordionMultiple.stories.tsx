import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

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
} as Meta;

export const Default: Story = {};

export const DefaultFirstIdSelected: Story = {
  args: { shouldSelectFirstId: true },
};

export const DefaultSelected: Story = {
  args: { defaultSelectedId: ["Trigger 3", "Trigger 4"] },
};

export const NoLoop: Story = {
  args: { focusLoop: false },
};
