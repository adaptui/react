import * as React from "react";
import { Meta } from "@storybook/react";
import { useDateFormatter } from "@react-aria/i18n";
import { addDays, addWeeks, subWeeks } from "date-fns";

import "./index.css";
import { CalendarCell } from "../CalendarCell";
import { CalendarGrid } from "../CalendarGrid";
import { CalendarButton } from "../CalendarButton";
import { CalendarCellButton } from "../CalendarCellButton";
import { CalendarProps, DateValue, useCalendarState } from "../CalendarState";

export default {
  title: "Component/Calendar",
} as Meta;

const Calendar: React.FC<CalendarProps> = props => {
  const state = useCalendarState(props);
  console.log("%c state", "color: #e5de73", state);

  return (
    <div className="calendar">
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
        <h2 id="cb-grid-label" className="month-year" aria-live="polite">
          {useDateFormatter({ month: "long", year: "numeric" }).format(
            state.currentMonth,
          )}
        </h2>
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
            <th aria-label="Sunday" scope="col">
              <abbr title="Sunday">Su</abbr>
            </th>
            <th aria-label="Monday" scope="col">
              <abbr title="Monday">Mo</abbr>
            </th>
            <th aria-label="Tuesday" scope="col">
              <abbr title="Tuesday">Tu</abbr>
            </th>
            <th aria-label="Wednesday" scope="col">
              <abbr title="Wednesday">We</abbr>
            </th>
            <th aria-label="Thursday" scope="col">
              <abbr title="Thursday">Th</abbr>
            </th>
            <th aria-label="Friday" scope="col">
              <abbr title="Friday">Fr</abbr>
            </th>
            <th aria-label="Saturday" scope="col">
              <abbr title="Saturday">Sa</abbr>
            </th>
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
    </div>
  );
};

export const Default = () => <Calendar />;
export const DefaultValue = () => (
  <Calendar defaultValue={addDays(new Date(), 1)} />
);
export const ControlledValue = () => {
  const [value, setValue] = React.useState<DateValue>(addDays(new Date(), 1));
  return <Calendar value={value} onChange={setValue} />;
};
export const MinMaxDate = () => (
  <Calendar minValue={new Date()} maxValue={addWeeks(new Date(), 1)} />
);
export const MinMaxDefaultDate = () => (
  <Calendar
    defaultValue={new Date()}
    minValue={subWeeks(new Date(), 1)}
    maxValue={addWeeks(new Date(), 1)}
  />
);
export const isDisabled = () => (
  <Calendar defaultValue={addDays(new Date(), 1)} isDisabled />
);
export const isReadOnly = () => (
  <Calendar defaultValue={addDays(new Date(), 1)} isReadOnly />
);
export const autoFocus = () => (
  // eslint-disable-next-line jsx-a11y/no-autofocus
  <Calendar defaultValue={addDays(new Date(), 1)} autoFocus />
);
