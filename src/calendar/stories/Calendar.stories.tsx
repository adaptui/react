import * as React from "react";
import { Meta } from "@storybook/react";
import { addDays, addWeeks, format, subWeeks } from "date-fns";

import "./index.css";
import { CalendarComponent } from "./CalendarComponent";

export default {
  title: "Component/Calendar",
} as Meta;

export const Default = () => <CalendarComponent />;
export const DefaultValue = () => (
  <CalendarComponent defaultValue="2001-01-01" />
);
export const ControlledValue = () => {
  const [value, setValue] = React.useState("2020-10-13");

  return (
    <div>
      <input
        type="date"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <CalendarComponent value={value} onChange={setValue} />
    </div>
  );
};

export const MinMaxDate = () => (
  <CalendarComponent
    minValue={format(new Date(), "yyyy-MM-dd")}
    maxValue={format(addWeeks(new Date(), 1), "yyyy-MM-dd")}
  />
);

export const MinMaxDefaultDate = () => (
  <CalendarComponent
    defaultValue={format(addDays(new Date(), 4), "yyyy-MM-dd")}
    minValue={format(subWeeks(new Date(), 1), "yyyy-MM-dd")}
    maxValue={format(addWeeks(new Date(), 1), "yyyy-MM-dd")}
  />
);

export const isDisabled = () => <CalendarComponent isDisabled />;

export const isReadOnly = () => <CalendarComponent isReadOnly />;

export const autoFocus = () => (
  // eslint-disable-next-line jsx-a11y/no-autofocus
  <CalendarComponent autoFocus />
);
