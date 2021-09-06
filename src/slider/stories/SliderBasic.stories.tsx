import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./SliderBasic.css";
import js from "./templates/SliderBasicJsx";
import ts from "./templates/SliderBasicTsx";
import css from "./templates/SliderBasicCss";
import { Slider } from "./SliderBasic.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Slider,
  title: "Slider/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
    options: { showPanel: true },
  },
} as Meta;

export const Default: Story = args => <Slider {...args} />;

export const ThumbTip = Default.bind({});
ThumbTip.args = {
  label: "Thumb Tipped",
  showTip: true,
};

export const MinMax = Default.bind({});
MinMax.args = {
  label: "Min Max",
  min: 20,
  max: 80,
};

export const Step = Default.bind({});
Step.args = {
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  label: "Default Valued",
  defaultValues: [80],
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
