import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { DateRangePicker } from "./DateRangePickerStyled.component";

import "./tailwind.css";

export default {
  component: DateRangePicker,
  title: "DateRangePicker/Styled",
  parameters: {
    layout: "centered",
    options: { showPanel: false },
  },
  argTypes: {
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

export const Default: Story = args => <DateRangePicker {...args} />;
