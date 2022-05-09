import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderSingleReversedJsx";
import ts from "./templates/SliderSingleReversedTsx";
import { SliderSingleReversed } from "./SliderSingleReversed.component";

import "./SliderBasic.css";

type Meta = ComponentMeta<typeof SliderSingleReversed>;
type Story = ComponentStoryObj<typeof SliderSingleReversed>;

export default {
  component: SliderSingleReversed,
  title: "Slider/SingleReversed",
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

export const Default: Story = { args: {} };

export const ThumbTip: Story = {
  args: {
    label: "Thumb Tipped",
    showTip: true,
  },
};

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
