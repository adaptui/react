import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderMultiJsx";
import ts from "./templates/SliderMultiTsx";
import { SliderMulti } from "./SliderMulti.component";

import "./SliderBasic.css";

export default {
  component: SliderMulti,
  title: "Slider/Multi",
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

export const Default: Story = args => <SliderMulti {...args} />;
Default.args = {
  defaultValue: [25, 50, 75],
};

export const ThumbTip = Default.bind({});
ThumbTip.args = {
  defaultValue: [25, 50, 75],
  label: "Thumb Tipped",
  showTip: true,
};

export const Reversed = Default.bind({});
Reversed.args = {
  defaultValue: [25, 50, 75],
  label: "Reversed",
  isReversed: true,
};

export const Vertical = Default.bind({});
Vertical.args = {
  defaultValue: [25, 50, 75],
  label: "Vertical",
  orientation: "vertical",
};

export const MinMax = Default.bind({});
MinMax.args = {
  defaultValue: [25, 50, 75],
  label: "Min Max",
  minValue: 20,
  maxValue: 80,
};

export const Step = Default.bind({});
Step.args = {
  defaultValue: [25, 50, 75],
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  label: "Default Valued",
  defaultValue: [10, 20, 30],
};

export const Disabled = Default.bind({});
Disabled.args = {
  defaultValue: [25, 50, 75],
  label: "Disabled",
  isDisabled: true,
};
