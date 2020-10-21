import "./index.css";
import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { addWeeks, subWeeks, format } from "date-fns";

import DatePickerComponent from "./DatePickerComponent";

export default {
  component: DatePickerComponent,
  title: "DatePicker",
  argTypes: {
    value: { control: "date" },
    minValue: { control: "date" },
    maxValue: { control: "date" },
    defaultValue: { control: "date" },
  },
} as Meta;

const Base: Story = args => {
  console.log(args);
  args.value &&= format(new Date(args.value), "yyyy-MM-dd");
  args.defaultValue &&= format(new Date(args.defaultValue), "yyyy-MM-dd");
  args.minValue &&= format(new Date(args.minValue), "yyyy-MM-dd");
  args.maxValue &&= format(new Date(args.maxValue), "yyyy-MM-dd");

  return <DatePickerComponent {...args} />;
};

export const Default = Base.bind({});

export const InitialDate = Base.bind({});
InitialDate.args = { defaultDate: "2020-02-29" };

export const MinMaxDate = Base.bind({});
MinMaxDate.args = {
  minValue: new Date(),
  maxValue: addWeeks(new Date(), 2),
};

export const InValidDate = Base.bind({});
InValidDate.args = {
  defaultValue: addWeeks(new Date(), 2),
  minValue: subWeeks(new Date(), 1),
  maxValue: addWeeks(new Date(), 1),
};

export const Options = Base.bind({});
Options.args = {
  defaultValue: addWeeks(new Date(), 2),
  value: addWeeks(new Date(), 2),
  minValue: null,
  maxValue: null,
  autoFocus: true,
  isDisabled: false,
  isReadOnly: false,
  formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
};

export const ControllableState = () => {
  const [value, setValue] = React.useState("2020-10-13");

  return (
    <div>
      <input
        type="date"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <DatePickerComponent value={value} onChange={setValue} />
    </div>
  );
};
