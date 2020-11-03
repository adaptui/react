import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import "./Slider.css";
import {
  singleAppTemplate,
  singleAppTemplateJs,
  cssTemplate,
} from "./templates";
import { App as SingleSlider } from "./SingleSlider.component";

export default {
  component: SingleSlider,
  title: "Slider/Single",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: singleAppTemplateJs,
        language: "jsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX([
          "renderless-components@alpha",
          "reakit",
        ]),
      },
      {
        tab: "React",
        template: singleAppTemplate,
        language: "tsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX([
          "renderless-components@alpha",
          "reakit",
        ]),
      },
      {
        tab: "CSS",
        template: cssTemplate,
        language: "css",
        copy: true,
      },
    ],
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
