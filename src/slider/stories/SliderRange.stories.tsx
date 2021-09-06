import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./SliderBasic.css";
import js from "./templates/SliderRangeJsx";
import ts from "./templates/SliderRangeTsx";
import css from "./templates/SliderBasicCss";
import { Slider } from "./SliderRange.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Slider,
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

export const Default: Story = args => <Slider {...args} />;

Default.args = {
  defaultValues: [25, 75],
};

export const ThumbTip = Default.bind({});
ThumbTip.args = {
  defaultValues: [25, 75],
  label: "Thumb Tipped",
  showTip: true,
};

export const Reversed = Default.bind({});
Reversed.args = {
  defaultValues: [25, 75],
  label: "Reversed",
  isReversed: true,
};

export const Vertical = Default.bind({});
Vertical.args = {
  defaultValues: [25, 75],
  label: "Vertical",
  orientation: "vertical",
};

export const MinMax = Default.bind({});
MinMax.args = {
  defaultValues: [25, 75],
  label: "Min Max",
  min: 20,
  max: 80,
};

export const Step = Default.bind({});
Step.args = {
  defaultValues: [25, 75],
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  label: "Default Valued",
  defaultValues: [10, 80],
};

export const FormatOptions = Default.bind({});
FormatOptions.args = {
  defaultValues: [25, 75],
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Default.bind({});
Disabled.args = {
  defaultValues: [25, 75],
  label: "Disabled",
  isDisabled: true,
};
