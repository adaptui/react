import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderRangeJsx";
import ts from "./templates/SliderRangeTsx";
import { SliderRange } from "./SliderRange.component";

import "./SliderBasic.css";

type Meta = ComponentMeta<typeof SliderRange>;
type Story = ComponentStoryObj<typeof SliderRange>;

export default {
  component: SliderRange,
  title: "Slider/Range",
  parameters: {
    layout: "centered",
    parameters: { preview: createPreviewTabs({ js, ts, css }) },
    options: { showPanel: true },
  },
  decorators: [
    Story => {
      document.body.id = "slider-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = {
  args: {
    defaultValue: [25, 75],
  },
};

export const ThumbTip: Story = {
  args: {
    defaultValue: [25, 75],
    label: "Thumb Tipped",
    showTip: true,
  },
};

export const Vertical: Story = {
  args: {
    defaultValue: [25, 75],
    label: "Vertical",
    orientation: "vertical",
  },
};

export const MinMax: Story = {
  args: {
    defaultValue: [25, 75],
    label: "Min Max",
    minValue: 20,
    maxValue: 80,
  },
};

export const Step: Story = {
  args: {
    defaultValue: [25, 75],
    label: "Stepped",
    step: 10,
  },
};

export const DefaultValue: Story = {
  args: {
    label: "Default Valued",
    defaultValue: [10, 80],
  },
};

export const FormatOptions: Story = {
  args: {
    defaultValue: [25, 75],
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
    defaultValue: [25, 75],
    label: "Disabled",
    isDisabled: true,
  },
};
