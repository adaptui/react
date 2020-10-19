import * as React from "react";
import { Matcher } from "@testing-library/react";
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
        <div data-testid="segment">
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
      <DatePickerContent data-testid="datepicker-content" {...state}>
        <RangeCalendarComp {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

const openDatePicker = (text: any, testId: any) => {
  fireEvent.click(text("open"));

  expect(testId("datepicker-content")).toBeVisible();
};

const isEndSelection = (getByLabelText: any, label: Matcher) => {
  expect(getByLabelText(label).parentElement).toHaveAttribute(
    "data-is-selection-end",
  );
};

const isStartSelection = (getByLabelText: any, label: Matcher) => {
  expect(getByLabelText(label).parentElement).toHaveAttribute(
    "data-is-selection-start",
  );
};

const isInSelectionRange = (getByLabelText: any, label: Matcher) => {
  expect(getByLabelText(label).parentElement).toHaveAttribute(
    "data-is-range-selection",
  );
};

describe("DateRangePicker", () => {
  it("should select date ranges correctly", () => {
    const {
      getByText: text,
      getByTestId: testId,
      getByLabelText: label,
    } = render(
      <DateRangePickerComp
        defaultValue={{
          start: stringifyDate(new Date(2020, 10, 15)),
          end: stringifyDate(new Date(2020, 10, 15)),
        }}
      />,
    );

    openDatePicker(text, testId);

    expect(label("Sunday, November 15, 2020 selected")).toHaveFocus();

    // check if current date is selected
    isEndSelection(label, "Sunday, November 15, 2020 selected");
    isStartSelection(label, "Sunday, November 15, 2020 selected");
    isInSelectionRange(label, "Sunday, November 15, 2020 selected");

    // change date selection
    press.Enter();
    press.ArrowRight();
    press.ArrowRight();
    press.ArrowDown();

    expect(label(/Tuesday, November 24, 2020/gi)).toHaveFocus();

    isEndSelection(label, /Tuesday, November 24, 2020/gi);
    isStartSelection(label, /Sunday, November 15, 2020/gi);
    isInSelectionRange(label, /Wednesday, November 18, 2020/gi);

    // Finish selection
    press.Enter();
    expect(testId("datepicker-content")).not.toBeVisible();
    expect(testId("segment")).toHaveTextContent("11/15/2020 - 11/24/2020");
  });

  it("should be invalid on wrong date selection", () => {
    const { getByTestId: testId } = render(
      <DateRangePickerComp
        defaultValue={{
          start: stringifyDate(new Date(2020, 10, 15)),
          end: stringifyDate(new Date(2020, 10, 15)),
        }}
      />,
    );

    expect(testId("datepicker")).not.toHaveAttribute("aria-invalid");

    // reverse dates are invalid
    press.Tab();
    press.Tab();
    press.Tab();
    press.Tab();

    press.ArrowDown();
    press.ArrowDown();

    expect(document.activeElement).toHaveTextContent("09");
    expect(testId("datepicker")).toHaveAttribute("aria-invalid", "true");
  });

  it("should be invalid if selection range is out of min max values", () => {
    const { getByTestId: testId } = render(
      <DateRangePickerComp
        defaultValue={{
          start: stringifyDate(new Date(2020, 10, 15)),
          end: stringifyDate(new Date(2020, 10, 15)),
        }}
        minValue={stringifyDate(new Date(2020, 0, 15))}
        maxValue={stringifyDate(new Date(2020, 10, 15))}
      />,
    );

    expect(testId("datepicker")).not.toHaveAttribute("aria-invalid");

    press.Tab();
    press.Tab();
    press.ArrowUp();

    expect(document.activeElement).toHaveTextContent("16");
    expect(testId("datepicker")).toHaveAttribute("aria-invalid", "true");
  });

  it("should be disabled", () => {
    const { getByTestId: testId } = render(<DateRangePickerComp isDisabled />);

    expect(testId("datepicker")).toHaveAttribute("aria-disabled", "true");
  });

  it("should be readonly", () => {
    const { getByTestId: testId } = render(<DateRangePickerComp isReadOnly />);

    expect(testId("datepicker")).toHaveAttribute("aria-readonly", "true");
  });

  it("should work with AutoFocus", () => {
    const { getAllByLabelText: labelAll } = render(
      // eslint-disable-next-line jsx-a11y/no-autofocus
      <DateRangePickerComp autoFocus />,
    );

    expect(labelAll("month", { selector: "div" })[0]).toHaveFocus();
  });

  test("DateRangePicker renders with no a11y violations", async () => {
    const { container } = render(<DateRangePickerComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
