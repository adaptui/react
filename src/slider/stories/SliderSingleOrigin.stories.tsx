import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderSingleOriginJsx";
import ts from "./templates/SliderSingleOriginTsx";
import { SliderSingleOrigin } from "./SliderSingleOrigin.component";

import "./SliderBasic.css";

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

export const Default: Story = args => <SliderSingleOrigin {...args} />;

Default.args = {
  minValue: -10,
  maxValue: +10,
  defaultValue: [0],
};

export const ThumbTip = Default.bind({});
ThumbTip.args = {
  minValue: -10,
  maxValue: +10,
  defaultValue: [0],
  label: "Thumb Tipped",
  showTip: true,
};

export const MinMax = Default.bind({});
MinMax.args = {
  defaultValue: [0],
  label: "Min Max",
  minValue: -20,
  maxValue: +20,
};

export const Step = Default.bind({});
Step.args = {
  minValue: -10,
  maxValue: +10,
  defaultValue: [0],
  label: "Stepped",
  step: 2,
};

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  minValue: -10,
  maxValue: +10,
  label: "Default Valued",
  defaultValue: [-5],
};

export const FormatOptions = Default.bind({});
FormatOptions.args = {
  minValue: -10,
  maxValue: +10,
  defaultValue: [0],
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Default.bind({});
Disabled.args = {
  minValue: -10,
  maxValue: +10,
  defaultValue: [0],
  label: "Disabled",
  isDisabled: true,
};
