import React from "react";
import { Meta, Story } from "@storybook/react";
import { DatePickerComp } from "./DatePickerComp";

export default {
  title: "Component/DatePicker",
  component: DatePickerComp,
} as Meta;

const Template: Story = args => <DatePickerComp {...args} />;

export const Default = Template.bind({});
