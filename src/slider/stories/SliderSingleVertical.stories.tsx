import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderSingleVerticalJsx";
import ts from "./templates/SliderSingleVerticalTsx";
import { SliderSingleVertical } from "./SliderSingleVertical.component";

import "./SliderBasic.css";

export default {
  component: SliderSingleVertical,
  title: "Slider/SingleVertical",
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

export const Default: Story = args => <SliderSingleVertical {...args} />;

Default.args = {
  orientation: "vertical",
};

export const ThumbTip = Default.bind({});
ThumbTip.args = {
  orientation: "vertical",
  label: "Thumb Tipped",
  showTip: true,
};

export const MinMax = Default.bind({});
MinMax.args = {
  orientation: "vertical",
  label: "Min Max",
  minValue: 20,
  maxValue: 80,
};

export const Step = Default.bind({});
Step.args = {
  orientation: "vertical",
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  orientation: "vertical",
  label: "Default Valued",
  defaultValue: [80],
};

export const FormatOptions = Default.bind({});
FormatOptions.args = {
  orientation: "vertical",
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Default.bind({});
Disabled.args = {
  orientation: "vertical",
  label: "Disabled",
  isDisabled: true,
};
