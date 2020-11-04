import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Slider.css";
import { App as RangeSlider } from "./RangeSlider.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";
import { rangeAppTemplate, rangeAppTemplateJs, cssTemplate } from "./templates";

export default {
  component: RangeSlider,
  title: "Slider/Range",
  parameters: {
    preview: createPreviewTabs({
      js: rangeAppTemplateJs,
      ts: rangeAppTemplate,
      css: cssTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <RangeSlider {...args} />;

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
  values: [10, 80],
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
