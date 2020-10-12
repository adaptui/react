import * as React from "react";
import { Meta } from "@storybook/react";
import { addDays, addWeeks, format, subDays } from "date-fns";

import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  CalendarCellButton,
  CalendarWeekTitle,
} from "../index";
import "./range-style.css";
import {
  RangeCalendarInitialState,
  useRangeCalendarState,
} from "../RangeCalendarState";

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
    </Calendar>
  );
};

export const Default = () => <RangeCalendarComp />;
export const DefaultValue = () => (
  <RangeCalendarComp
    defaultValue={{
      start: format(new Date(), "yyyy-MM-dd"),
      end: format(addDays(new Date(), 4), "yyyy-MM-dd"),
    }}
  />
);

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
    minValue={format(new Date(), "yyyy-MM-dd")}
    maxValue={format(addWeeks(new Date(), 1), "yyyy-MM-dd")}
  />
);

export const isDisabled = () => <RangeCalendarComp isDisabled />;

export const isReadOnly = () => <RangeCalendarComp isReadOnly />;

export const autoFocus = () => (
  // eslint-disable-next-line jsx-a11y/no-autofocus
  <RangeCalendarComp autoFocus />
);
