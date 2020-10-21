import "./range-style.css";
import {
  addDays,
  addWeeks,
  subDays,
  format,
  setDate,
  subWeeks,
} from "date-fns";
import * as React from "react";
import { Meta, Story } from "@storybook/react";
import RangeCalendarComponent from "./RangeCalendarComponent";

export default {
  title: "RangeCalendar",
  component: RangeCalendarComponent,
  argTypes: {
    start: { control: "date", name: "value.start" },
    end: { control: "date", name: "value.end" },
    defaultStart: {
      control: "date",
      name: "default.start",
    },
    defaultEnd: {
      control: "date",
      name: "default.end",
    },
    minValue: { control: "date" },
    maxValue: { control: "date" },
  },
} as Meta;

const Base: Story = args => {
  args.value = {
    start: args.start && format(new Date(args.start), "yyyy-MM-dd"),
    end: args.end && format(new Date(args.end), "yyyy-MM-dd"),
  };
  args.defaultValue = {
    start:
      args.defaultStart && format(new Date(args.defaultStart), "yyyy-MM-dd"),
    end: args.defaultEnd && format(new Date(args.defaultEnd), "yyyy-MM-dd"),
  };
  args.minValue &&= format(new Date(args.minValue), "yyyy-MM-dd");
  args.maxValue &&= format(new Date(args.maxValue), "yyyy-MM-dd");

  return <RangeCalendarComponent {...args} />;
};

export const Default = Base.bind({});

export const DefaultValue = Base.bind({});
DefaultValue.args = {
  defaultStart: setDate(new Date(), 10),
  defaultEnd: new Date(),
};

export const MinMaxDefaultDate = Base.bind({});
MinMaxDefaultDate.args = {
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

export const ControlledValue = () => {
  const [start, setStart] = React.useState(
    format(subDays(new Date(), 1), "yyyy-MM-dd"),
  );
  const [end, setEnd] = React.useState(
    format(addDays(new Date(), 1), "yyyy-MM-dd"),
  );

  return (
    <div>
      <input
        type="date"
        onChange={e => setStart(e.target.value)}
        value={start}
      />
      <input type="date" onChange={e => setEnd(e.target.value)} value={end} />
      <RangeCalendarComponent
        value={{ start, end }}
        onChange={({ end, start }) => {
          setStart(start);
          setEnd(end);
        }}
      />
    </div>
  );
};
