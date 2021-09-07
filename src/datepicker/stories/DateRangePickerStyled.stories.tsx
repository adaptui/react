import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./tailwind.css";
import { addWeeks } from "../../utils";
import { DateRangePicker } from "./DateRangePickerStyled.component";

export default {
  component: DateRangePicker,
  title: "DateRangePicker/Styled",
  parameters: {
    layout: "centered",
    options: { showPanel: false },
  },
  argTypes: {
    defaultStart: {
      control: "date",
      name: "default.start",
      defaultValue: new Date(),
    },
    defaultEnd: {
      control: "date",
      name: "default.end",
      defaultValue: addWeeks(new Date(), 1),
    },
    start: { control: "date", name: "value.start" },
    end: { control: "date", name: "value.end" },
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
