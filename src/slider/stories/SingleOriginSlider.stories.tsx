import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Slider.css";
import {
  singleSliderTemplate,
  singleSliderTemplateJs,
  sliderCssTemplate,
} from "./templates";
import { createPreviewTabs } from "../../../.storybook/utils";
import { App as SingleOriginSlider } from "./components/SingleOriginSlider.component";

export default {
  component: SingleOriginSlider,
  title: "Slider/SingleOrigin",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: singleSliderTemplateJs,
      ts: singleSliderTemplate,
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

const Base: Story = args => <SingleOriginSlider {...args} />;

export const Default = Base.bind({});
Default.args = {
  min: -10,
  max: +10,
  defaultValues: [0],
};

export const ThumbTip = Base.bind({});
ThumbTip.args = {
  min: -10,
  max: +10,
  defaultValues: [0],
  label: "Thumb Tipped",
  showTip: true,
};

export const MinMax = Base.bind({});
MinMax.args = {
  defaultValues: [0],
  label: "Min Max",
  min: -20,
  max: +20,
};

export const Step = Base.bind({});
Step.args = {
  min: -10,
  max: +10,
  defaultValues: [0],
  label: "Stepped",
  step: 2,
};

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  min: -10,
  max: +10,
  label: "Default Valued",
  defaultValues: [-5],
};

export const FormatOptions = Base.bind({});
FormatOptions.args = {
  min: -10,
  max: +10,
  defaultValues: [0],
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Base.bind({});
Disabled.args = {
  min: -10,
  max: +10,
  defaultValues: [0],
  label: "Disabled",
  isDisabled: true,
};
