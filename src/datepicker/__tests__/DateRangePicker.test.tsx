import * as React from "react";
import { axe, fireEvent, press, render, screen } from "reakit-test-utils";
import { cleanup } from "@testing-library/react";

import {
  Calendar,
  CalendarButton,
  CalendarCell,
  CalendarCellButton,
  CalendarGrid,
  CalendarHeader,
  CalendarWeekTitle,
  RangeCalendarStateReturn,
} from "../../calendar";
import {
  isEndSelection,
  isInSelectionRange,
  isStartSelection,
  repeat,
} from "../../utils/test-utils";
import {
  DateRangePickerInitialState,
  useDateRangePickerState,
} from "../DateRangePickerState";
import {
  DatePicker,
  DatePickerContent,
  DatePickerSegment,
  DatePickerSegmentField,
  DatePickerTrigger,
} from "../index";

afterEach(cleanup);

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
      <DatePicker data-testid="testid-datepicker" {...state}>
        <div data-testid="testid-segment">
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
      <DatePickerContent data-testid="testid-datepicker-content" {...state}>
        <RangeCalendarComp {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

const openDatePicker = () => {
  fireEvent.click(screen.getByText(/open/i));

  jest.advanceTimersByTime(1);

  expect(screen.getByTestId("testid-datepicker-content")).toBeVisible();
};

describe("DateRangePicker", () => {
  it("should select date ranges correctly", () => {
    jest.useFakeTimers();

    render(
      <DateRangePickerComp
        defaultValue={{
          start: "2020-11-15",
          end: "2020-11-15",
        }}
      />,
    );

    openDatePicker();

    expect(
      screen.getByLabelText(/Sunday, November 15, 2020 selected/),
    ).toHaveFocus();

    isStartSelection(
      screen.getByLabelText(/Sunday, November 15, 2020 selected/i),
    );
    // check if current date is selected
    isEndSelection(
      screen.getByLabelText(/Sunday, November 15, 2020 selected/i),
    );
    isInSelectionRange(
      screen.getByLabelText(/Sunday, November 15, 2020 selected/i),
    );

    // change date selection
    press.Enter();
    press.ArrowRight();
    press.ArrowRight();
    press.ArrowDown();

    expect(screen.getByLabelText(/Tuesday, November 24, 2020/gi)).toHaveFocus();

    isEndSelection(screen.getByLabelText(/Tuesday, November 24, 2020/gi));
    isStartSelection(screen.getByLabelText(/Sunday, November 15, 2020/gi));
    isInSelectionRange(screen.getByLabelText(/Wednesday, November 18, 2020/gi));

    // Finish selection
    press.Enter();
    expect(screen.getByTestId("testid-datepicker-content")).not.toBeVisible();
    expect(screen.getByTestId("testid-segment")).toHaveTextContent(
      "11/15/2020 - 11/24/2020",
    );

    jest.useRealTimers();
  });

  it("should be invalid on wrong date selection", () => {
    render(
      <DateRangePickerComp
        defaultValue={{
          start: "2020-11-15",
          end: "2020-11-15",
        }}
      />,
    );

    const datepicker = screen.getByTestId("testid-datepicker");

    expect(datepicker).not.toHaveAttribute("aria-invalid");

    // reverse dates are invalid
    repeat(press.Tab, 4);
    repeat(press.ArrowDown, 2);

    expect(document.activeElement).toHaveTextContent("09");
    expect(datepicker).toHaveAttribute("aria-invalid", "true");
  });

  it("should be invalid if selection range is out of min max values", () => {
    render(
      <DateRangePickerComp
        defaultValue={{
          start: "2020-11-15",
          end: "2020-11-15",
        }}
        minValue={"2020-01-15"}
        maxValue={"2020-11-15"}
      />,
    );
    const datepicker = screen.getByTestId("testid-datepicker");

    expect(datepicker).not.toHaveAttribute("aria-invalid");

    repeat(press.Tab, 2);
    press.ArrowUp();

    expect(document.activeElement).toHaveTextContent("16");
    expect(datepicker).toHaveAttribute("aria-invalid", "true");
  });

  it("should be disabled", () => {
    render(<DateRangePickerComp isDisabled />);

    expect(screen.getByTestId("testid-datepicker")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("should be readonly", () => {
    render(<DateRangePickerComp isReadOnly />);

    expect(screen.getByTestId("testid-datepicker")).toHaveAttribute(
      "aria-readonly",
      "true",
    );
  });

  it("should work with AutoFocus", () => {
    render(
      // eslint-disable-next-line jsx-a11y/no-autofocus
      <DateRangePickerComp autoFocus />,
    );

    expect(
      screen.getAllByLabelText("month", { selector: "div" })[0],
    ).toHaveFocus();
  });

  test("DateRangePicker renders with no a11y violations", async () => {
    const { container } = render(<DateRangePickerComp />);
    const results = await axe(container, {
      rules: { "nested-interactive": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
