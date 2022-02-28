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
