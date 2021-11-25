import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderBasicJsx";
import ts from "./templates/SliderBasicTsx";
import { SliderBasic, SliderBasicProps } from "./SliderBasic.component";

import "./SliderBasic.css";

export default {
  component: SliderBasic,
  title: "Slider/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
    options: { showPanel: true },
  },
} as Meta;

export const Default: Story<SliderBasicProps> = args => (
  <SliderBasic {...args} />
);

export const ThumbTip = Default.bind({});
ThumbTip.args = {
  label: "Thumb Tipped",
  showTip: true,
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
