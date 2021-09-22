import * as React from "react";

import {
  Calendar as CalendarWrapper,
  CalendarButton,
  CalendarCell,
  CalendarCellButton,
  CalendarGrid,
  CalendarHeader,
  CalendarStateReturn,
  CalendarWeekTitle,
  DatePicker as DatePickerWrapper,
  DatePickerContent,
  DatePickerSegment,
  DatePickerSegmentField,
  DatePickerTrigger,
  DateRangePickerInitialState,
  useDateRangePickerState,
} from "../../index";

import {
  CalendarStyledIcon,
  ChevronLeft,
  ChevronRight,
  DoubleChevronLeft,
  DoubleChevronRight,
} from "./Utils.component";

export const DateRangePicker: React.FC<DateRangePickerInitialState> = props => {
  const state = useDateRangePickerState({
    formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
    ...props,
  });

  return (
    <>
      <DatePickerWrapper
        className="relative inline-block bg-white border border-gray-300 rounded-md shadow-sm styled-datepicker w-max"
        {...state}
      >
        <div className="flex justify-between p-2 pl-4 pr-4 space-x-4 rounded-md">
          <DatePickerSegmentField
            {...state}
            className="flex justify-between space-x-1"
          >
            {state.startSegmentState.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                {...state}
                {...state.startSegmentState}
                className="font-mono focus:text-blue-500 focus:outline-none"
              />
            ))}
          </DatePickerSegmentField>
          &nbsp;-&nbsp;
          <DatePickerSegmentField
            {...state}
            className="flex justify-between space-x-1"
          >
            {state.endSegmentState.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                {...state}
                {...state.endSegmentState}
                className="font-mono focus:text-blue-500 focus:outline-none"
              />
            ))}
          </DatePickerSegmentField>
          <DatePickerTrigger
            className="relative inline-block text-gray-700 focus:outline-none focus:text-blue-500"
            {...state}
          >
            <CalendarStyledIcon />
          </DatePickerTrigger>
        </div>
      </DatePickerWrapper>
      <DatePickerContent {...state}>
        <Calendar {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

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
