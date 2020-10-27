import React from "react";
import { Meta, Story } from "@storybook/react";

import { ChakraSlider } from "./ChakraSlider";

export default {
  title: "SliderNew/Chakra",
  argTypes: {
    label: {
      control: { type: "text" },
      defaultValue: "Styled",
      table: {
        type: { summary: "Label for the slider" },
        defaultValue: { summary: "Styled" },
      },
    },
    values: {
      control: { type: "array" },
      defaultValue: [50],
      table: {
        type: { summary: "The `value` of the slider indicator." },
        defaultValue: { summary: "[50]" },
      },
    },
    min: {
      control: { type: "number" },
      defaultValue: 0,
      table: {
        type: { summary: "The minimum value of the slider" },
        defaultValue: { summary: "0" },
      },
    },
    step: {
      control: { type: "number" },
      defaultValue: 1,
      table: {
        type: {
          summary: "The step in which increments/decrements have to be made",
        },
        defaultValue: { summary: "1" },
      },
    },
    max: {
      control: { type: "number" },
      defaultValue: 100,
      table: {
        type: { summary: "The maximum value of the slider" },
        defaultValue: { summary: "100" },
      },
    },
    orientation: {
      control: { type: "radio", options: ["vertical", "horizontal"] },
      defaultValue: "horizontal",
      table: {
        type: { summary: "Orientation of the slider" },
        defaultValue: { summary: "horizontal" },
      },
    },
    isReversed: {
      control: { type: "boolean" },
      defaultValue: false,
      table: {
        type: { summary: "If true, Slider will render reversed" },
        defaultValue: { summary: "false" },
      },
    },
    formatOptions: {
      control: { type: "object" },
      defaultValue: {},
      table: {
        type: { summary: "Intl format options" },
        defaultValue: { summary: "object" },
      },
    },
    isDisabled: {
      control: { type: "boolean" },
      defaultValue: false,
      table: {
        type: { summary: "If `true`, the slider will be disabled" },
        defaultValue: { summary: "false" },
      },
    },
    onChangeStart: { action: "Value Change Started" },
    onChange: { action: "Value Changed" },
    onChangeEnd: { action: "Value Change Stopped" },
  },
} as Meta;

const Base: Story = args => <ChakraSlider {...args} />;

export const Default = Base.bind({});

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
  label: "Temperature",
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
