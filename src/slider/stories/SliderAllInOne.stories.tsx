import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./SliderBasic.css";
import css from "./templates/SliderBasicCss";
import js from "./templates/SliderAllInOneJsx";
import ts from "./templates/SliderAllInOneTsx";
import { App as Slider } from "./SliderAllInOne.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Slider,
  title: "Slider/AllInOne",
  parameters: {
    layout: "centered",
    parameters: { preview: createPreviewTabs({ js, ts, css }) },
  },
  decorators: [
    Story => {
      document.body.id = "slider-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = args => <Slider {...args} />;

export const ThumbTip = Default.bind({});
ThumbTip.args = {
  label: "Thumb Tipped",
  showTip: true,
};

export const Origin = Default.bind({});
Origin.args = {
  label: "Origin Changed",
  showTip: true,
  defaultValues: [0],
  origin: 0,
  min: -50,
  max: 50,
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

export const Range = Default.bind({});
Range.args = {
  label: "Range",
  defaultValues: [25, 75],
};

export const Multi = Default.bind({});
Multi.args = {
  label: "Range",
  defaultValues: [25, 50, 75],
};

export const Multis = Default.bind({});
Multis.args = {
  label: "Range",
  defaultValues: [20, 40, 60, 80],
};
