import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { DatePicker } from "./DatePickerStyled.component";

import "./tailwind.css";

export default {
  component: DatePicker,
  title: "DatePicker/Styled",
  parameters: {
    layout: "centered",
    options: { showPanel: false },
  },
  argTypes: {
    defaultValue: { control: "date", defaultValue: new Date() },
    value: { control: "date" },
    minValue: { control: "date" },
    maxValue: { control: "date" },
  },
  decorators: [
    Story => {
      document.body.id = "tailwind";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = args => <DatePicker {...args} />;
