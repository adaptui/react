import * as React from "react";
import { addWeeks } from "date-fns";
import { Meta, Story } from "@storybook/react";

import "./tailwind/index.css";
import { RangeDatePicker } from "./styled/RangeDatePicker.component";

export default {
  component: RangeDatePicker,
  title: "DatePicker/Styled/Range",
  parameters: {
    layout: "centered",
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

const Base: Story = args => <RangeDatePicker {...args} />;

export const Default = Base.bind({});
Default.args = {};
