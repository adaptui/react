import * as React from "react";
import { Meta } from "@storybook/react";
import { addDays, addWeeks, subWeeks } from "date-fns";

import "./index.css";
import { CalendarComponent } from "./CalendarComponent";
import { CalendarStateInitialProps, useCalendarState, DateValue } from "..";

export default {
  title: "Component/Calendar",
} as Meta;

const CalendarComp: React.FC<CalendarStateInitialProps> = props => {
  const state = useCalendarState(props);
  console.log("%c state", "color: #e5de73", state);

  return <CalendarComponent {...state} />;
};

export const Default = () => <CalendarComp />;
export const DefaultValue = () => (
  <CalendarComp defaultValue={new Date(2001, 0, 1)} />
);
export const ControlledValue = () => {
  const [value, setValue] = React.useState<DateValue>(addDays(new Date(), 1));
  return <CalendarComp value={value} onChange={setValue} />;
};
export const MinMaxDate = () => (
  <CalendarComp minValue={new Date()} maxValue={addWeeks(new Date(), 1)} />
);
export const MinMaxDefaultDate = () => (
  <CalendarComp
    defaultValue={new Date()}
    minValue={subWeeks(new Date(), 1)}
    maxValue={addWeeks(new Date(), 1)}
  />
);
export const isDisabled = () => (
  <CalendarComp defaultValue={addDays(new Date(), 1)} isDisabled />
);
export const isReadOnly = () => (
  <CalendarComp defaultValue={addDays(new Date(), 1)} isReadOnly />
);
export const autoFocus = () => (
  // eslint-disable-next-line jsx-a11y/no-autofocus
  <CalendarComp defaultValue={addDays(new Date(), 1)} autoFocus />
);
