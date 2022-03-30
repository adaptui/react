import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderSingleOriginJsx";
import ts from "./templates/SliderSingleOriginTsx";
import { SliderSingleOrigin } from "./SliderSingleOrigin.component";

import "./SliderBasic.css";

type Meta = ComponentMeta<typeof SliderSingleOrigin>;
type Story = ComponentStoryObj<typeof SliderSingleOrigin>;

export default {
  component: SliderSingleOrigin,
  title: "Slider/SingleOrigin",
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
  args: { minValue: -10, maxValue: +10, defaultValue: [0] },
};

export const ThumbTip: Story = {
  args: {
    minValue: -10,
    maxValue: +10,
    defaultValue: [0],
    label: "Thumb Tipped",
    showTip: true,
  },
};

export const MinMax: Story = {
  args: {
    defaultValue: [0],
    label: "Min Max",
    minValue: -20,
    maxValue: +20,
  },
};

export const Step: Story = {
  args: {
    minValue: -10,
    maxValue: +10,
    defaultValue: [0],
    label: "Stepped",
    step: 2,
  },
};

export const DefaultValue: Story = {
  args: {
    minValue: -10,
    maxValue: +10,
    label: "Default Valued",
    defaultValue: [-5],
  },
};

export const FormatOptions: Story = {
  args: {
    minValue: -10,
    maxValue: +10,
    defaultValue: [0],
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
    minValue: -10,
    maxValue: +10,
    defaultValue: [0],
    label: "Disabled",
    isDisabled: true,
  },
};
