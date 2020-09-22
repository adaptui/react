import * as React from "react";
import { Meta } from "@storybook/react";

import {
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  CalendarCellButton,
  CalendarWeekTitle,
} from "../index";
import { RangeCalendar } from "../RangeCalendar";
import { DateValue, RangeCalendarProps } from "../index.d";
import { useRangeCalendarState } from "../CalendarRangeState";
import "./range-style.css";
import { addDays, addWeeks, setDate, subWeeks } from "date-fns";

export default {
  title: "Component/RangeCalendar",
} as Meta;

const RangeCalendarComp: React.FC<RangeCalendarProps> = props => {
  const state = useRangeCalendarState(props);
  console.log("%c state", "color: #e5de73", state);

  return (
    <RangeCalendar
      {...state}
      onChange={() => console.log("change")}
      className="calendar-range"
    >
      <div className="header">
        <CalendarButton {...state} goto="previousYear" className="prev-year">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            ></path>
          </svg>
        </CalendarButton>
        <CalendarButton {...state} goto="previousMonth" className="prev-month">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </CalendarButton>
        <CalendarHeader {...state} />
        <CalendarButton {...state} goto="nextMonth" className="next-month">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </CalendarButton>
        <CalendarButton {...state} goto="nextYear" className="next-year">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            ></path>
          </svg>
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
    </RangeCalendar>
  );
};

export const Default = () => <RangeCalendarComp />;
export const DefaultValue = () => (
  <RangeCalendarComp
    defaultValue={{ start: setDate(new Date(), 1), end: new Date() }}
  />
);

export const ControlledValue = () => {
  const [start, setStart] = React.useState<DateValue>(addDays(new Date(), 1));
  const [end, setEnd] = React.useState<DateValue>(addDays(new Date(), 1));

  return (
    <div>
      <input type="date" onChange={e => setStart(e.target.value)} />
      <input type="date" onChange={e => setEnd(e.target.value)} />
      <RangeCalendarComp value={{ start, end }} />
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
