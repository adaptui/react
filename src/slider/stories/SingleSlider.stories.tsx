import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Slider.css";
import {
  singleSliderTemplate,
  singleSliderTemplateJs,
  sliderCssTemplate,
} from "./templates";
import { App as SingleSlider } from "./SingleSlider.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: SingleSlider,
  title: "Slider/Single",
  parameters: {
    preview: createPreviewTabs({
      js: singleSliderTemplateJs,
      ts: singleSliderTemplate,
      css: sliderCssTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <SingleSlider {...args} />;

export const Default = Base.bind({});

export const ThumbTip = Base.bind({});
ThumbTip.args = {
  label: "Thumb Tipped",
  showTip: true,
};

export const MinMax = Base.bind({});
MinMax.args = {
  label: "Min Max",
  min: 20,
  max: 80,
};

export const Step = Base.bind({});
Step.args = {
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  label: "Default Valued",
  values: [80],
};

export const FormatOptions = Base.bind({});
FormatOptions.args = {
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Base.bind({});
Disabled.args = {
  label: "Disabled",
  isDisabled: true,
};
