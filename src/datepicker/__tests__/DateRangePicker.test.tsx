import { format, addWeeks, subWeeks, setDate } from "date-fns";
import * as React from "react";

import { axe, render, press, fireEvent } from "reakit-test-utils";

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

const RangeCalendarComp: React.FC<RangeCalendarStateReturn> = state => {
  return (
    <Calendar {...state}>
      <div className="header">
        <CalendarButton {...state} goto="previousYear">
          {"<<"}
        </CalendarButton>
        <CalendarButton {...state} goto="previousMonth">
          {"<"}
        </CalendarButton>
        <CalendarHeader {...state} />
        <CalendarButton {...state} goto="nextMonth">
          {">"}
        </CalendarButton>
        <CalendarButton {...state} goto="nextYear">
          {">>"}
        </CalendarButton>
      </div>

      <CalendarGrid {...state} as="table">
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
      <DatePicker data-testid="datepicker" {...state}>
        <div>
          <DatePickerSegmentField {...state.startSegmentState}>
            {state.startSegmentState.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                {...state.startSegmentState}
                {...state}
              />
            ))}
          </DatePickerSegmentField>
          &nbsp;-&nbsp;
          <DatePickerSegmentField {...state.endSegmentState}>
            {state.endSegmentState.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                {...state.endSegmentState}
                {...state}
              />
            ))}
          </DatePickerSegmentField>
          <DatePickerTrigger {...state}>open</DatePickerTrigger>
        </div>
      </DatePicker>
      <DatePickerContent {...state}>
        <RangeCalendarComp {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

const openDatePicker = (text: any, testId: any) => {
  fireEvent.click(text("open"));

  expect(testId("datepicker-content")).toBeVisible();
};

describe("DateRangePicker", () => {
  it("should be disabled", () => {
    const { getByTestId: testId } = render(<DateRangePickerComp isDisabled />);

    expect(testId("datepicker")).toHaveAttribute("aria-disabled", "true");
  });

  it("should be readonly", () => {
    const { getByTestId: testId } = render(<DateRangePickerComp isReadOnly />);

    expect(testId("datepicker")).toHaveAttribute("aria-readonly", "true");
  });

  test("DateRangePicker renders with no a11y violations", async () => {
    const { container } = render(<DateRangePickerComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
