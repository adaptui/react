import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Slider.css";
import {
  reversedAppTemplate,
  reversedAppTemplateJs,
  cssTemplate,
} from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";
import { App as SingleReversedSlider } from "./SingleReversedSlider.component";

export default {
  component: SingleReversedSlider,
  title: "Slider/SingleReversed",
  parameters: {
    preview: createPreviewTabs({
      js: reversedAppTemplateJs,
      ts: reversedAppTemplate,
      css: cssTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <SingleReversedSlider {...args} />;

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
