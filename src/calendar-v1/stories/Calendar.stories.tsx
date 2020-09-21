import * as React from "react";
import { Meta } from "@storybook/react";
import { useDateFormatter } from "@react-aria/i18n";

import "./index.css";
import { CalendarCell } from "../CalendarCell";
import { CalendarGrid } from "../CalendarGrid";
import { CalendarProps, DateValue, useCalendarState } from "../CalendarState";
import { CalendarCellButton } from "../CalendarCellButton";
import { CalendarNextYearButton } from "../CalendarNextYearButton";
import { CalendarNextMonthButton } from "../CalendarNextMonthButton";
import { CalendarPreviousYearButton } from "../CalendarPreviousYearButton";
import { CalendarPreviousMonthButton } from "../CalendarPreviousMonthButton";
import { addDays, addWeeks, subWeeks } from "date-fns";

export default {
  title: "Component/Calendar",
} as Meta;

const Calendar: React.FC<CalendarProps> = props => {
  const state = useCalendarState(props);
  console.log("%c state", "color: #e5de73", state);

  return (
    <div className="calendar">
      <div className="header">
        <CalendarPreviousYearButton {...state} className="prev-year">
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
        </CalendarPreviousYearButton>
        <CalendarPreviousMonthButton {...state} className="prev-month">
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
        </CalendarPreviousMonthButton>
        <h2 id="cb-grid-label" className="month-year" aria-live="polite">
          {useDateFormatter({ month: "long", year: "numeric" }).format(
            state.currentMonth,
          )}
        </h2>
        <CalendarNextMonthButton {...state} className="next-month">
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
        </CalendarNextMonthButton>
        <CalendarNextYearButton {...state} className="next-year">
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
        </CalendarNextYearButton>
      </div>
      <CalendarGrid {...state} as="table" className="dates">
        <thead>
          <tr>
            <th scope="col" abbr="Sunday">
              Su
            </th>
            <th scope="col" abbr="Monday">
              Mo
            </th>
            <th scope="col" abbr="Tuesday">
              Tu
            </th>
            <th scope="col" abbr="Wednesday">
              We
            </th>
            <th scope="col" abbr="Thursday">
              Th
            </th>
            <th scope="col" abbr="Friday">
              Fr
            </th>
            <th scope="col" abbr="Saturday">
              Sa
            </th>
          </tr>
        </thead>
        <tbody>
          {[...new Array(state.weeksInMonth).keys()].map(weekIndex => (
            <tr key={weekIndex}>
              {[...new Array(7).keys()].map(dayIndex => (
                <CalendarCell
                  {...state}
                  as="td"
                  key={dayIndex}
                  weekIndex={weekIndex}
                  dayIndex={dayIndex}
                >
                  <CalendarCellButton
                    {...state}
                    weekIndex={weekIndex}
                    dayIndex={dayIndex}
                  />
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
