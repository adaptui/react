import React from "react";

import {
  DatePicker,
  DatePickerContent,
  DatePickerSegment,
  DatePickerTrigger,
  DatePickerSegmentField,
  useDateRangePickerState,
  DateRangePickerInitialState,
} from "../index";
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  CalendarWeekTitle,
  CalendarCellButton,
  RangeCalendarStateReturn,
} from "../../calendar/index";

import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  DoubleChevronLeft,
  DoubleChevronRight,
} from "./Utils.component";

export const App: React.FC<DateRangePickerInitialState> = props => {
  const state = useDateRangePickerState({
    formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
    ...props,
  });

  return (
    <>
      <DatePicker aria-label="Date Range" className="datepicker" {...state}>
        <div className="datepicker__header">
          <DatePickerSegmentField
            {...state.startSegmentState}
            className="datepicker__field"
            aria-label="start date"
          >
            {state.startSegmentState.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                className="datepicker__field--item"
                {...state}
                {...state.startSegmentState}
              />
            ))}
          </DatePickerSegmentField>
          &nbsp;-&nbsp;
          <DatePickerSegmentField
            {...state.endSegmentState}
            className="datepicker__field"
            aria-label="end date"
          >
            {state.endSegmentState.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                className="datepicker__field--item"
                {...state}
                {...state.endSegmentState}
              />
            ))}
          </DatePickerSegmentField>
          <DatePickerTrigger className="datepicker__trigger" {...state}>
            <CalendarIcon />
          </DatePickerTrigger>
        </div>
      </DatePicker>
      <DatePickerContent {...state}>
        <RangeCalendar {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

export default App;

const RangeCalendar: React.FC<RangeCalendarStateReturn> = state => {
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
