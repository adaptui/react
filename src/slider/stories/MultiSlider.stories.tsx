import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./SliderBasic.css";
import js from "./templates/MultiSliderJsx";
import ts from "./templates/MultiSliderTsx";
import css from "./templates/SliderBasicCss";
import { App as MultiSlider } from "./MultiSlider.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: MultiSlider,
  title: "Slider/Multi",
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

export const Default: Story = args => <MultiSlider {...args} />;
Default.args = {
  defaultValues: [25, 50, 75],
};

export const ThumbTip = Default.bind({});
ThumbTip.args = {
  defaultValues: [25, 50, 75],
  label: "Thumb Tipped",
  showTip: true,
};

export const Reversed = Default.bind({});
Reversed.args = {
  defaultValues: [25, 50, 75],
  label: "Reversed",
  isReversed: true,
};

export const Vertical = Default.bind({});
Vertical.args = {
  defaultValues: [25, 50, 75],
  label: "Vertical",
  orientation: "vertical",
};

export const MinMax = Default.bind({});
MinMax.args = {
  defaultValues: [25, 50, 75],
  label: "Min Max",
  min: 20,
  max: 80,
};

export const Step = Default.bind({});
Step.args = {
  defaultValues: [25, 50, 75],
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  label: "Default Valued",
  defaultValues: [10, 20, 30],
};

export const Disabled = Default.bind({});
Disabled.args = {
  defaultValues: [25, 50, 75],
  label: "Disabled",
  isDisabled: true,
};
