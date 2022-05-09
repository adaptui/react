import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/SliderBasicJsx";
import ts from "./templates/SliderBasicTsx";
import { SliderBasic } from "./SliderBasic.component";

import "./SliderBasic.css";

type Meta = ComponentMeta<typeof SliderBasic>;
type Story = ComponentStoryObj<typeof SliderBasic>;

export default {
  title: "Slider/Basic",
  component: SliderBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
    options: { showPanel: true },
  },
} as Meta;

export const Default: Story = { args: {} };

export const MinMax: Story = {
  args: {
    label: "Min Max",
    minValue: 20,
    maxValue: 80,
  },
};

export const Step: Story = {
  args: {
    label: "Stepped",
    step: 10,
  },
};

export const DefaultValue: Story = {
  args: {
    label: "Default Valued",
    defaultValue: [80],
  },
};

export const FormatOptions: Story = {
  args: {
    label: "Temperature Formatted",
    formatOptions: {
      style: "unit",
      unit: "celsius",
      unitDisplay: "narrow",
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    isDisabled: true,
  },
};
