import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/NumberFieldBasicJsx";
import ts from "./templates/NumberFieldBasicTsx";
import { NumberFieldBasic } from "./NumberFieldBasic.component";

type Meta = ComponentMeta<typeof NumberFieldBasic>;
type Story = ComponentStoryObj<typeof NumberFieldBasic>;

export default {
  title: "NumberField/Basic",
  component: NumberFieldBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = { args: { label: "NumberField" } };
