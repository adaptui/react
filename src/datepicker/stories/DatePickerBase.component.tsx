import * as React from "react";

import {
  DatePicker,
  DatePickerSegment,
  DatePickerContent,
  DatePickerTrigger,
  useDatePickerState,
  DatePickerSegmentField,
  DatePickerInitialState,
} from "../index";
import {
  Calendar as CalendarWrapper,
  CalendarButton,
  CalendarCell,
  CalendarCellButton,
  CalendarGrid,
  CalendarHeader,
  CalendarWeekTitle,
  CalendarStateReturn,
} from "../../calendar/index";

import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  DoubleChevronLeft,
  DoubleChevronRight,
} from "./Utils.component";

export const App: React.FC<DatePickerInitialState> = props => {
  const state = useDatePickerState({
    formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
    ...props,
  });

  return (
    <>
      <DatePicker className="datepicker" {...state}>
        <div className="datepicker__header">
          <DatePickerSegmentField {...state} className="datepicker__field">
            {state.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                className="datepicker__field--item"
                {...state}
              />
            ))}
          </DatePickerSegmentField>

          <DatePickerTrigger className="datepicker__trigger" {...state}>
            <CalendarIcon />
          </DatePickerTrigger>
        </div>
      </DatePicker>
      <DatePickerContent {...state}>
        <Calendar {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

export default App;

const Calendar: React.FC<CalendarStateReturn> = state => {
  return (
    <CalendarWrapper {...state} className="calendar">
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
    </CalendarWrapper>
  );
};
