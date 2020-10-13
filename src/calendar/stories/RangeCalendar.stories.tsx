import * as React from "react";
import { Meta } from "@storybook/react";
import { addDays, addWeeks, setDate, subDays, subWeeks } from "date-fns";
import "./range-style.css";

import {
  ChevronLeft,
  ChevronRight,
  DoubleChevronLeft,
  DoubleChevronRight,
} from "./svg-icons";

import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  CalendarCellButton,
  CalendarWeekTitle,
} from "../index";
import {
  useRangeCalendarState,
  RangeCalendarInitialState,
} from "../RangeCalendarState";
import { DateValue } from "../../utils/types";

export default {
  title: "Component/RangeCalendar",
} as Meta;

const RangeCalendarComp: React.FC<RangeCalendarInitialState> = props => {
  const state = useRangeCalendarState(props);

  return (
    <Calendar
      {...state}
      onChange={() => console.log("change")}
      className="calendar-range"
    >
      <div className="header">
        <CalendarButton {...state} goto="previousYear" className="prev-year">
          <DoubleChevronLeft />
        </CalendarButton>
        <CalendarButton {...state} goto="previousMonth" className="prev-month">
          <ChevronLeft />
        </CalendarButton>
        <CalendarHeader {...state} />
        <CalendarButton {...state} goto="nextMonth" className="next-month">
          <ChevronRight />
        </CalendarButton>
        <CalendarButton {...state} goto="nextYear" className="next-year">
          <DoubleChevronRight />
        </CalendarButton>
      </div>

      <CalendarGrid {...state} as="table" className="dates">
        <thead>
          <tr>
            {state.weekDays.map((day, dayIndex) => {
              return (
                <CalendarWeekTitle
                  {...state}
                  as="th"
                  scope="col"
                  key={dayIndex}
                  dayIndex={dayIndex}
                >
                  <abbr title={day.title}>{day.abbr}</abbr>
                </CalendarWeekTitle>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {state.daysInMonth.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <CalendarCell {...state} as="td" key={dayIndex} date={day}>
                  <CalendarCellButton {...state} date={day} />
                </CalendarCell>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarGrid>
    </Calendar>
  );
};

export const Default = () => <RangeCalendarComp />;
export const DefaultValue = () => (
  <RangeCalendarComp
    defaultValue={{ start: setDate(new Date(), 1), end: new Date() }}
  />
);

export const ControlledValue = () => {
  const [start, setStart] = React.useState<DateValue>(subDays(new Date(), 1));
  const [end, setEnd] = React.useState<DateValue>(addDays(new Date(), 1));

  return (
    <div>
      <input
        type="date"
        onChange={e => setStart(new Date(e.target.value))}
        value={(start as Date).toISOString().slice(0, 10)}
      />
      <input
        type="date"
        onChange={e => setEnd(new Date(e.target.value))}
        value={(end as Date).toISOString().slice(0, 10)}
      />
      <RangeCalendarComp
        value={{ start, end }}
        onChange={({ end, start }) => {
          setStart(start);
          setEnd(end);
        }}
      />
    </div>
  );
};

export const MinMaxDefaultDate = () => (
  <RangeCalendarComp
    minValue={subWeeks(new Date(), 1)}
    maxValue={addWeeks(new Date(), 1)}
  />
);
export const isDisabled = () => <RangeCalendarComp isDisabled />;
export const isReadOnly = () => <RangeCalendarComp isReadOnly />;
export const autoFocus = () => (
  // eslint-disable-next-line jsx-a11y/no-autofocus
  <RangeCalendarComp autoFocus />
);
