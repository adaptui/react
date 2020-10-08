import * as React from "react";
import { Meta } from "@storybook/react";
import { addDays, addWeeks, subWeeks } from "date-fns";

import "./index.css";
import { DateValue } from "../../utils";
import { CalendarComponent } from "./CalendarComponent";

export default {
  title: "Component/Calendar",
} as Meta;

export const Default = () => <CalendarComponent />;
export const DefaultValue = () => (
  <CalendarComponent defaultValue={new Date(2001, 0, 1)} />
);
export const ControlledValue = () => {
  const [value, setValue] = React.useState<DateValue>(addDays(new Date(), 1));

  return (
    <div>
      <input
        type="date"
        onChange={e => setValue(new Date(e.target.value))}
        value={(value as Date).toISOString().slice(0, 10)}
      />
      <CalendarComponent value={value} onChange={setValue} />
    </div>
  );
};
export const MinMaxDate = () => (
  <CalendarComponent minValue={new Date()} maxValue={addWeeks(new Date(), 1)} />
);
export const MinMaxDefaultDate = () => (
  <CalendarComponent
    defaultValue={new Date()}
    minValue={subWeeks(new Date(), 1)}
    maxValue={addWeeks(new Date(), 1)}
  />
);
export const isDisabled = () => (
  <CalendarComponent defaultValue={addDays(new Date(), 1)} isDisabled />
);
export const isReadOnly = () => (
  <CalendarComponent defaultValue={addDays(new Date(), 1)} isReadOnly />
);
export const autoFocus = () => (
  // eslint-disable-next-line jsx-a11y/no-autofocus
  <CalendarComponent defaultValue={addDays(new Date(), 1)} autoFocus />
);
