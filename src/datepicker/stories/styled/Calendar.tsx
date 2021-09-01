import * as React from "react";
import {
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  CalendarWeekTitle,
  CalendarCellButton,
  CalendarStateReturn,
  Calendar as CalendarWrapper,
} from "../../../calendar/index";

import {
  ChevronLeft,
  ChevronRight,
  DoubleChevronLeft,
  DoubleChevronRight,
} from "../Utils.component";

export const Calendar: React.FC<CalendarStateReturn> = state => {
  return (
    <CalendarWrapper
      {...state}
      className="p-3 bg-white rounded-md shadow-lg styled-datepicker calendar w-max"
    >
      <div className="flex justify-between">
        <CalendarButton
          {...state}
          goto="previousYear"
          className="text-gray-700 w-16px"
        >
          <DoubleChevronLeft />
        </CalendarButton>
        <CalendarButton
          {...state}
          goto="previousMonth"
          className="text-gray-700 w-16px"
        >
          <ChevronLeft />
        </CalendarButton>
        <CalendarHeader
          className="text-sm font-bold text-gray-700"
          {...state}
        />
        <CalendarButton
          {...state}
          goto="nextMonth"
          className="text-gray-700 w-16px"
        >
          <ChevronRight />
        </CalendarButton>
        <CalendarButton
          {...state}
          goto="nextYear"
          className="text-gray-700 w-16px"
        >
          <DoubleChevronRight />
        </CalendarButton>
      </div>

      <CalendarGrid {...state} as="table" className="p-4 mt-2">
        <thead>
          <tr className="text-center">
            {state.weekDays.map((day, dayIndex) => {
              return (
                <CalendarWeekTitle
                  {...state}
                  className="font-light text-gray-500 calendar__cell"
                  as="th"
                  scope="col"
                  key={dayIndex}
                  dayIndex={dayIndex}
                >
                  <abbr title={day.title}>{day.abbr.slice(0, 2)}</abbr>
                </CalendarWeekTitle>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {state.daysInMonth.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <CalendarCell
                  {...state}
                  className="calendar__cell"
                  as="td"
                  key={dayIndex}
                  date={day}
                >
                  <CalendarCellButton className="p-2" {...state} date={day} />
                </CalendarCell>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarGrid>
    </CalendarWrapper>
  );
};

export const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    focusable="false"
    aria-hidden="true"
    role="img"
    className="w-5 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
