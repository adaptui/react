import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Slider.css";
import {
  singleVerticalSliderTemplate,
  singleVerticalSliderTemplateJs,
  sliderCssTemplate,
} from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";
import { App as SingleVerticalSlider } from "./SingleVerticalSlider.component";
import { DefaultPage } from "renderless-components/pagination/stories/Pagination.stories";

export default {
  component: SingleVerticalSlider,
  title: "Slider/SingleVertical",
  parameters: {
    preview: createPreviewTabs({
      js: singleVerticalSliderTemplateJs,
      ts: singleVerticalSliderTemplate,
      css: sliderCssTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <SingleVerticalSlider {...args} />;

export const Default = Base.bind({});
Default.args = {
  orientation: "vertical",
};

export const ThumbTip = Base.bind({});
ThumbTip.args = {
  orientation: "vertical",
  label: "Thumb Tipped",
  showTip: true,
};

export const MinMax = Base.bind({});
MinMax.args = {
  orientation: "vertical",
  label: "Min Max",
  min: 20,
  max: 80,
};

export const Step = Base.bind({});
Step.args = {
  orientation: "vertical",
  label: "Stepped",
  step: 10,
};

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  orientation: "vertical",
  label: "Default Valued",
  defaultValues: [80],
};

export const FormatOptions = Base.bind({});
FormatOptions.args = {
  orientation: "vertical",
  label: "Temperature Formatted",
  formatOptions: {
    style: "unit",
    unit: "celsius",
    unitDisplay: "narrow",
  },
};

export const Disabled = Base.bind({});
Disabled.args = {
  orientation: "vertical",
  label: "Disabled",
  isDisabled: true,
};
