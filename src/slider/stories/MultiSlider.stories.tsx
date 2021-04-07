import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Slider.css";
import {
  multiSliderTemplate,
  multiSliderTemplateJs,
  sliderCssTemplate,
} from "./templates";
import { App as MultiSlider } from "./components/MultiSlider.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: MultiSlider,
  title: "Slider/Multi",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: multiSliderTemplateJs,
      ts: multiSliderTemplate,
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

const Base: Story = args => <MultiSlider {...args} />;

export const Default = Base.bind({});
Default.args = {
  defaultValues: [25, 50, 75],
};

export const ThumbTip = Base.bind({});
ThumbTip.args = {
  defaultValues: [25, 50, 75],
  label: "Thumb Tipped",
  showTip: true,
};

export const Reversed = Base.bind({});
Reversed.args = {
  defaultValues: [25, 50, 75],
  label: "Reversed",
  isReversed: true,
};

export const Vertical = Base.bind({});
Vertical.args = {
  defaultValues: [25, 50, 75],
  label: "Vertical",
  orientation: "vertical",
};

export const MinMax = Base.bind({});
MinMax.args = {
  defaultValues: [25, 50, 75],
  label: "Min Max",
  min: 20,
  max: 80,
};

export const Step = Base.bind({});
Step.args = {
  defaultValues: [25, 50, 75],
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  label: "Default Valued",
  defaultValues: [10, 20, 30],
};

export const Disabled = Base.bind({});
Disabled.args = {
  defaultValues: [25, 50, 75],
  label: "Disabled",
  isDisabled: true,
};
