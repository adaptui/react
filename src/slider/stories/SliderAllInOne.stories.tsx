import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/SliderAllInOneJsx";
import ts from "./templates/SliderAllInOneTsx";
import css from "./templates/SliderBasicCss";
import { SliderAllInOne } from "./SliderAllInOne.component";

import "./SliderBasic.css";

export default {
  component: SliderAllInOne,
  title: "Slider/AllInOne",
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

export const Default: Story = args => <SliderAllInOne {...args} />;

export const ThumbTip = Default.bind({});
ThumbTip.args = {
  label: "Thumb Tipped",
  showTip: true,
};

export const Origin = Default.bind({});
Origin.args = {
  label: "Origin Changed",
  showTip: true,
  defaultValue: [0],
  origin: 0,
  minValue: -50,
  maxValue: 50,
};

export const Reversed = Default.bind({});
Reversed.args = {
  label: "Reversed",
  isReversed: true,
};

export const Vertical = Default.bind({});
Vertical.args = {
  label: "Vertical",
  orientation: "vertical",
};

export const MinMax = Default.bind({});
MinMax.args = {
  label: "Min Max",
  minValue: 20,
  maxValue: 80,
};

export const Step = Default.bind({});
Step.args = {
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  label: "Default Valued",
  defaultValue: [80],
};

export const FormatOptions = Default.bind({});
FormatOptions.args = {
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Default.bind({});
Disabled.args = {
  label: "Disabled",
  isDisabled: true,
};

export const Range = Default.bind({});
Range.args = {
  label: "Range",
  defaultValue: [25, 75],
};

export const Multi = Default.bind({});
Multi.args = {
  label: "Range",
  defaultValue: [25, 50, 75],
};

export const Multis = Default.bind({});
Multis.args = {
  label: "Range",
  defaultValue: [0, 20, 40, 60, 80, 100],
};
