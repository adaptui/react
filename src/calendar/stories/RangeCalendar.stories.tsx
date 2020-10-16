import * as React from "react";
import { Meta } from "@storybook/react";
import { addDays, addWeeks, subDays, format } from "date-fns";
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

export default {
  title: "RangeCalendar",
} as Meta;

const RangeCalendarComp: React.FC<RangeCalendarInitialState> = props => {
  const state = useRangeCalendarState(props);

  return (
    <Calendar {...state} className="calendar-range">
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
