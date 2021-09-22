import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderSingleOriginJsx";
import ts from "./templates/SliderSingleOriginTsx";
import { Slider } from "./SliderSingleOrigin.component";

import "./SliderBasic.css";

export default {
  component: Slider,
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

export const Default: Story = args => <Slider {...args} />;

Default.args = {
  min: -10,
  max: +10,
  defaultValues: [0],
};

export const ThumbTip = Default.bind({});
ThumbTip.args = {
  min: -10,
  max: +10,
  defaultValues: [0],
  label: "Thumb Tipped",
  showTip: true,
};

export const MinMax = Default.bind({});
MinMax.args = {
  defaultValues: [0],
  label: "Min Max",
  min: -20,
  max: +20,
};

export const Step = Default.bind({});
Step.args = {
  min: -10,
  max: +10,
  defaultValues: [0],
  label: "Stepped",
  step: 2,
};

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  min: -10,
  max: +10,
  label: "Default Valued",
  defaultValues: [-5],
};

export const FormatOptions = Default.bind({});
FormatOptions.args = {
  min: -10,
  max: +10,
  defaultValues: [0],
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Default.bind({});
Disabled.args = {
  min: -10,
  max: +10,
  defaultValues: [0],
  label: "Disabled",
  isDisabled: true,
};
