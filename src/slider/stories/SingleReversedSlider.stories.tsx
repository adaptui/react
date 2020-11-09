import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Slider.css";
import {
  singleReversedSliderTemplate,
  singleReversedSliderTemplateJs,
  sliderCssTemplate,
} from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";
import { App as SingleReversedSlider } from "./SingleReversedSlider.component";

export default {
  component: SingleReversedSlider,
  title: "Slider/SingleReversed",
  parameters: {
    preview: createPreviewTabs({
      js: singleReversedSliderTemplateJs,
      ts: singleReversedSliderTemplate,
      css: sliderCssTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <SingleReversedSlider {...args} />;

export const Default = Base.bind({});
Default.args = {
  reversed: true,
};

export const ThumbTip = Base.bind({});
ThumbTip.args = {
  reversed: true,
  label: "Thumb Tipped",
  showTip: true,
};

export const MinMax = Base.bind({});
MinMax.args = {
  reversed: true,
  label: "Min Max",
  min: 20,
  max: 80,
};

export const Step = Base.bind({});
Step.args = {
  reversed: true,
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  reversed: true,
  label: "Default Valued",
  defaultValues: [80],
};

export const FormatOptions = Base.bind({});
FormatOptions.args = {
  reversed: true,
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Base.bind({});
Disabled.args = {
  reversed: true,
  label: "Disabled",
  isDisabled: true,
};
