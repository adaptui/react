import * as React from "react";
import { Meta, Story } from "@storybook/react";

import {
  rangeSliderTemplate,
  rangeSliderTemplateJs,
  sliderCssTemplate,
} from "./templates";
import "./Slider.css";
import { App as RangeSlider } from "./components/RangeSlider.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: RangeSlider,
  title: "Slider/Range",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: rangeSliderTemplateJs,
      ts: rangeSliderTemplate,
      css: sliderCssTemplate,
    }),
  },
  decorators: [
    Story => {
      document.body.id = "slider";
      return <Story />;
    },
  ],
} as Meta;

const Base: Story = args => <RangeSlider {...args} />;

export const Default = Base.bind({});
Default.args = {
  defaultValues: [25, 75],
};

export const ThumbTip = Base.bind({});
ThumbTip.args = {
  defaultValues: [25, 75],
  label: "Thumb Tipped",
  showTip: true,
};

export const Reversed = Base.bind({});
Reversed.args = {
  defaultValues: [25, 75],
  label: "Reversed",
  isReversed: true,
};

export const Vertical = Base.bind({});
Vertical.args = {
  defaultValues: [25, 75],
  label: "Vertical",
  orientation: "vertical",
};

export const MinMax = Base.bind({});
MinMax.args = {
  defaultValues: [25, 75],
  label: "Min Max",
  min: 20,
  max: 80,
};

export const Step = Base.bind({});
Step.args = {
  defaultValues: [25, 75],
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  label: "Default Valued",
  defaultValues: [10, 80],
};

export const FormatOptions = Base.bind({});
FormatOptions.args = {
  defaultValues: [25, 75],
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Base.bind({});
Disabled.args = {
  defaultValues: [25, 75],
  label: "Disabled",
  isDisabled: true,
};
