import React from "react";

import {
  DatePicker,
  DatePickerContent,
  DatePickerSegment,
  DatePickerTrigger,
  DatePickerSegmentField,
  useDateRangePickerState,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  CalendarWeekTitle,
  CalendarCellButton,
  RangeCalendarStateReturn,
} from "renderless-components";

interface RangeValue<T> {
  /** The start value of the range. */
  start: T;
  /** The end value of the range. */
  end: T;
}

type DateTimeFormatOpts = Intl.DateTimeFormatOptions & {
  timeStyle?: string;
  dateStyle?: string;
};

type ValidationState = "valid" | "invalid";

export interface AppProps {
  /**
   * The current value (controlled).
   */
  value?: RangeValue<string>;
  /**
   * The default value (uncontrolled).
   */
  defaultValue?: RangeValue<string>;
  /**
   *  Handler that is called when the value changes.
   */
  onChange?: (value: RangeValue<string>) => void;
  /**
   * The smallest value allowed for the input.
   */
  minValue?: string;
  /**
   * The largest value allowed for the input.
   */
  maxValue?: string;
  /**
   * Whether the input is disabled.
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the input can be selected but not changed by the user.
   *
   * @default false
   */
  isReadOnly?: boolean;
  /**
   * Whether the element should receive focus on render.
   *
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Whether the input should display its "valid" or "invalid" visual styling.
   */
  validationState?: ValidationState;
  /**
   * Whether user input is required on the input before form submission.
   * Often paired with the `necessityIndicator` prop to add a visual indicator to the input.
   */
  isRequired?: boolean;
  /**
   * Placeholder Date for segments
   */
  placeholderDate?: string;
  /**
   * Format options for segments
   */
  formatOptions?: DateTimeFormatOpts;
}

export const App = (props: AppProps) => {
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

const CalendarIcon = () => (
  <svg viewBox="0 0 36 36" focusable="false" aria-hidden="true" role="img">
    <path d="M33 6h-5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H10V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 26H2V8h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h14v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h4z"></path>
    <path d="M6 12h4v4H6zM12 12h4v4h-4zM18 12h4v4h-4zM24 12h4v4h-4zM6 18h4v4H6zM12 18h4v4h-4zM18 18h4v4h-4zM24 18h4v4h-4zM6 24h4v4H6zM12 24h4v4h-4zM18 24h4v4h-4zM24 24h4v4h-4z"></path>
  </svg>
);

const DoubleChevronLeft = (props: any) => {
  return (
    <svg
      {...props}
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
      />
    </svg>
  );
};

const ChevronLeft = (props: any) => {
  return (
    <svg
      {...props}
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
      />
    </svg>
  );
};

const ChevronRight = (props: any) => (
  <ChevronLeft style={{ transform: "rotate(180deg)" }} {...props} />
);

const DoubleChevronRight = (props: any) => (
  <DoubleChevronLeft style={{ transform: "rotate(180deg)" }} {...props} />
);
