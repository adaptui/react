import * as React from "react";
import { Meta } from "@storybook/react";
import { addWeeks, setDate, subWeeks } from "date-fns";

import {
  ChevronLeft,
  ChevronRight,
  DoubleChevronLeft,
  DoubleChevronRight,
} from "../../calendar/stories/svg-icons";
import "./index.css";

import {
  DatePicker,
  DatePickerContent,
  DatePickerSegment,
  DatePickerTrigger,
  DatePickerSegmentField,
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
} from "../../calendar";
import {
  useDateRangePickerState,
  DateRangePickerInitialState,
} from "../DateRangePickerState";
import { stringifyDate } from "../../utils";

export default {
  title: "DateRangePicker",
} as Meta;

const RangeCalendarComp: React.FC<RangeCalendarStateReturn> = state => {
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

const DateRangePickerComp: React.FC<DateRangePickerInitialState> = props => {
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
        <RangeCalendarComp {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

const CalendarIcon = () => (
  <svg viewBox="0 0 36 36" focusable="false" aria-hidden="true" role="img">
    <path d="M33 6h-5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H10V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 26H2V8h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h14v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h4z"></path>
    <path d="M6 12h4v4H6zM12 12h4v4h-4zM18 12h4v4h-4zM24 12h4v4h-4zM6 18h4v4H6zM12 18h4v4h-4zM18 18h4v4h-4zM24 18h4v4h-4zM6 24h4v4H6zM12 24h4v4h-4zM18 24h4v4h-4zM24 24h4v4h-4z"></path>
  </svg>
);

export const Default = () => <DateRangePickerComp />;
export const DefaultValue = () => (
  <DateRangePickerComp
    defaultValue={{
      start: stringifyDate(setDate(new Date(), 10)),
      end: stringifyDate(new Date()),
    }}
  />
);

export const MinMaxDefaultDate = () => (
  <DateRangePickerComp
    minValue={stringifyDate(subWeeks(new Date(), 1))}
    maxValue={stringifyDate(addWeeks(new Date(), 1))}
  />
);
export const isDisabled = () => <DateRangePickerComp isDisabled />;
export const isReadOnly = () => <DateRangePickerComp isReadOnly />;
export const autoFocus = () => (
  // eslint-disable-next-line jsx-a11y/no-autofocus
  <DateRangePickerComp autoFocus />
);
