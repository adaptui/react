import "./index.css";
import * as React from "react";
import { format } from "date-fns";
import { Meta, Story } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { addWeeks, setDate, subWeeks } from "date-fns";

import DateRangePickerComponent from "./DateRangePickerComponent";

export default {
  title: "DateRangePicker",
  component: DateRangePickerComponent,
  argTypes: {
    start: { control: "date", name: "value.start" },
    end: { control: "date", name: "value.end" },
    minValue: { control: "date" },
    maxValue: { control: "date" },
  },
} as Meta;

const Base: Story = args => {
  args.value = {
    start: args.start && format(new Date(args.start), "yyyy-MM-dd"),
    end: args.end && format(new Date(args.end), "yyyy-MM-dd"),
  };
  args.minValue &&= format(new Date(args.minValue), "yyyy-MM-dd");
  args.maxValue &&= format(new Date(args.maxValue), "yyyy-MM-dd");

  const [argProps, updateArgs] = useArgs();

  return (
    <DateRangePickerComponent
      value={{ start: argProps["start"], end: argProps["nd"] }}
      onChange={date => {
        updateArgs({
          start: format(new Date(date.start), "yyyy-MM-dd"),
          end: format(new Date(date.end), "yyyy-MM-dd"),
        });
      }}
      {...args}
    />
  );
};

export const Default = Base.bind({});

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  start: setDate(new Date(), 10),
  end: new Date(),
};

export const MinMaxValue = Base.bind({});
MinMaxValue.args = {
  start: setDate(new Date(), 10),
  end: new Date(),
  minValue: subWeeks(new Date(), 1),
  maxValue: addWeeks(new Date(), 1),
};

export const Options = Base.bind({});
Options.args = {
  start: new Date(),
  end: addWeeks(new Date(), 1),
  minValue: null,
  maxValue: null,
  isDisabled: false,
  isReadOnly: false,
  autoFocus: false,
};
