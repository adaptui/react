import * as React from "react";
import { Meta } from "@storybook/react";

import "./index.css";
import { useCalendarState } from "../CalendarState";
import { CalendarCellButton } from "..";
import { CalendarCell } from "../CalendarCell";
import { CalendarGrid } from "../CalendarGrid";
import { CalendarPreviousMonthButton } from "../CalendarPreviousMonthButton";
import { CalendarNextMonthButton } from "../CalendarNextMonthButton";
import { useDateFormatter } from "@react-aria/i18n";
import { CalendarPreviousYearButton } from "../CalendarPreviousYearButton";
import { CalendarNextYearButton } from "../CalendarNextYearButton";

export default {
  title: "Component/Calendar",
} as Meta;

export const Default = () => {
  const state = useCalendarState({ value: new Date() });
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
      <CalendarGrid {...state} as="table" className="dates" role="grid">
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
