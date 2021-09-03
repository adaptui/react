import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./SliderBasic.css";
import css from "./templates/SliderBasicCss";
import js from "./templates/SingleVerticalSliderJsx";
import ts from "./templates/SingleVerticalSliderTsx";
import { createPreviewTabs } from "../../../.storybook/utils";
import { App as SingleVerticalSlider } from "./SingleVerticalSlider.component";

export default {
  component: SingleVerticalSlider,
  title: "Slider/SingleVertical",
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

export const Default: Story = args => <SingleVerticalSlider {...args} />;

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
  min: 20,
  max: 80,
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
  defaultValues: [80],
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
