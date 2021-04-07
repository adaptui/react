import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./tailwind/index.css";
import { DatePicker } from "./styled/DatePicker.component";

export default {
  component: DatePicker,
  title: "DatePicker/Styled/Base",
  parameters: {
    layout: "centered",
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

const Base: Story = args => <DatePicker {...args} />;

export const Default = Base.bind({});
Default.args = {};
