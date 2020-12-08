import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "../../../tailwind/index.css";
import { DatePicker } from "./styled/DatePicker.component";
import { RangeDatePicker } from "./styled/RangeDatePicker.component";

export default {
  component: DatePicker,
  title: "DatePicker/Styled",
  argTypes: {
    value: { control: "date" },
    minValue: { control: "date" },
    maxValue: { control: "date" },
    defaultValue: { control: "date", defaultValue: new Date() },
  },
} as Meta;

const Base: Story = args => <DatePicker {...args} />;
const RangeBase: Story = args => <RangeDatePicker {...args} />;

export const Default = Base.bind({});
Default.args = {};

export const Range = RangeBase.bind({});
Default.args = {};
