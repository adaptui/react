import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Slider.css";
import { App as Slider } from "./Slider.component";
import {
  sliderTemplate,
  sliderTemplateJs,
  sliderCssTemplate,
} from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Slider,
  title: "Slider/AllInOne",
  parameters: {
    preview: createPreviewTabs({
      js: sliderTemplateJs,
      ts: sliderTemplate,
      css: sliderCssTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <Slider {...args} />;

export const Default = Base.bind({});

export const ThumbTip = Base.bind({});
ThumbTip.args = {
  label: "Thumb Tipped",
  showTip: true,
};

export const Origin = Base.bind({});
Origin.args = {
  label: "Origin Changed",
  showTip: true,
  values: [0],
  origin: 0,
  min: -50,
  max: 50,
};

export const Reversed = Base.bind({});
Reversed.args = {
  label: "Reversed",
  isReversed: true,
};

export const Vertical = Base.bind({});
Vertical.args = {
  label: "Vertical",
  orientation: "vertical",
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

export const Range = Base.bind({});
Range.args = {
  label: "Range",
  values: [25, 75],
};

export const Multi = Base.bind({});
Multi.args = {
  label: "Range",
  values: [25, 50, 75],
};

export const Multis = Base.bind({});
Multis.args = {
  label: "Range",
  values: [20, 40, 60, 80],
};
