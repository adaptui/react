import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Slider.css";
import { App as MultiSlider } from "./MultiSlider.component";
import {
  multiSliderTemplate,
  multiSliderTemplateJs,
  sliderCssTemplate,
} from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: MultiSlider,
  title: "Slider/Multi",
  parameters: {
    preview: createPreviewTabs({
      js: multiSliderTemplateJs,
      ts: multiSliderTemplate,
      css: sliderCssTemplate,
      deps: ["reakit@latest"],
    }),
  },
} as Meta;

const Base: Story = args => <MultiSlider {...args} />;

export const Default = Base.bind({});

export const ThumbTip = Base.bind({});
ThumbTip.args = {
  label: "Thumb Tipped",
  showTip: true,
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
  values: [10, 20, 30],
};

export const Disabled = Base.bind({});
Disabled.args = {
  label: "Disabled",
  isDisabled: true,
};
