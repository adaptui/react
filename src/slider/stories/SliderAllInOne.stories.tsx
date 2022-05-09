import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/SliderAllInOneJsx";
import ts from "./templates/SliderAllInOneTsx";
import css from "./templates/SliderBasicCss";
import { SliderAllInOne } from "./SliderAllInOne.component";

import "./SliderBasic.css";

type Meta = ComponentMeta<typeof SliderAllInOne>;
type Story = ComponentStoryObj<typeof SliderAllInOne>;

export default {
  title: "Slider/AllInOne",
  component: SliderAllInOne,
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

export const Origin: Story = {
  args: {
    label: "Origin Changed",
    showTip: true,
    defaultValue: [0],
    origin: 0,
    minValue: -50,
    maxValue: 50,
  },
};

export const Vertical: Story = {
  args: {
    label: "Vertical",
    orientation: "vertical",
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

export const Range: Story = {
  args: {
    label: "Range",
    defaultValue: [25, 75],
  },
};

export const Multi: Story = {
  args: {
    label: "Range",
    defaultValue: [25, 50, 75],
  },
};

export const Multis: Story = {
  args: {
    label: "Range",
    defaultValue: [0, 20, 40, 60, 80, 100],
  },
};
