import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import { addDays, addWeeks, subDays, subWeeks, toUTCString } from "../../utils";

import css from "./templates/CalendarRangeCss";
import js from "./templates/CalendarRangeJsx";
import ts from "./templates/CalendarRangeTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import RangeCalendar from "./CalendarRange.component";

import "./CalendarRange.css";

export default {
  component: RangeCalendar,
  title: "Calendar/Range",
  argTypes: {
    minValue: { control: "date" },
    maxValue: { control: "date" },
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css, jsUtils, tsUtils }),
  },
} as Meta;

export const Default: Story = args => {
  return <RangeCalendar {...args} />;
};

export const DefaultValue = Default.bind({});
DefaultValue.args = {
  defaultValue: {
    start: toUTCString(new Date()),
    end: toUTCString(addWeeks(new Date(), 1)),
  },
};

export const MinMaxDate = Default.bind({});
MinMaxDate.args = {
  minValue: toUTCString(subWeeks(new Date(), 1)),
  maxValue: toUTCString(addWeeks(new Date(), 1)),
};

export const Disabled = Default.bind({});
Disabled.args = {
  defaultValue: {
    start: toUTCString(new Date()),
    end: toUTCString(addWeeks(new Date(), 1)),
  },
  isDisabled: true,
};

export const Readonly = Default.bind({});
Readonly.args = {
  defaultValue: {
    start: toUTCString(new Date()),
    end: toUTCString(addWeeks(new Date(), 1)),
  },
  isReadOnly: true,
};

export const Autofocus = Default.bind({});
Autofocus.args = {
  defaultValue: {
    start: toUTCString(new Date()),
    end: toUTCString(addWeeks(new Date(), 1)),
  },
  autoFocus: true,
};

export const ControlledInput = () => {
  const [start, setStart] = React.useState(toUTCString(subDays(new Date(), 1)));
  const [end, setEnd] = React.useState(toUTCString(addDays(new Date(), 1)));

  return (
    <div>
      <input
        type="date"
        onChange={e => setStart(e.target.value)}
        value={start}
      />
      <input type="date" onChange={e => setEnd(e.target.value)} value={end} />
      <RangeCalendar
        value={{ start, end }}
        onChange={({ end, start }) => {
          setStart(start);
          setEnd(end);
        }}
      />
    </div>
  );
};
