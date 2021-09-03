import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./SliderBasic.css";
import css from "./templates/SliderBasicCss";
import js from "./templates/SingleReversedSliderJsx";
import ts from "./templates/SingleReversedSliderTsx";
import { createPreviewTabs } from "../../../.storybook/utils";
import { App as SingleReversedSlider } from "./SingleReversedSlider.component";

export default {
  component: SingleReversedSlider,
  title: "Slider/SingleReversed",
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

export const Default: Story = args => <SingleReversedSlider {...args} />;

Default.args = {
  reversed: true,
};

export const ThumbTip = Default.bind({});
ThumbTip.args = {
  reversed: true,
  label: "Thumb Tipped",
  showTip: true,
};

export const MinMax = Default.bind({});
MinMax.args = {
  reversed: true,
  label: "Min Max",
  min: 20,
  max: 80,
};

export const Step = Default.bind({});
Step.args = {
  reversed: true,
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  reversed: true,
  label: "Default Valued",
  defaultValues: [80],
};

export const FormatOptions = Default.bind({});
FormatOptions.args = {
  reversed: true,
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Default.bind({});
Disabled.args = {
  reversed: true,
  label: "Disabled",
  isDisabled: true,
};
