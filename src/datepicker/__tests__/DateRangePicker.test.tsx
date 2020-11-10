import * as React from "react";
import { cleanup } from "@testing-library/react";
import { axe, render, press, fireEvent, screen } from "reakit-test-utils";

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
import {
  isEndSelection,
  isStartSelection,
  isInSelectionRange,
  repeat,
} from "../../utils/test-utils";
import { stringifyDate } from "../../utils";

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

const openDatePicker = () => {
  fireEvent.click(screen.getByText(/open/i));

  expect(screen.getByTestId("datepicker-content")).toBeVisible();
};

describe("DateRangePicker", () => {
  it("should select date ranges correctly", () => {
    render(
      <DateRangePickerComp
        defaultValue={{
          start: stringifyDate(new Date(2020, 10, 15)),
          end: stringifyDate(new Date(2020, 10, 15)),
        }}
      />,
    );

    screen.logTestingPlaygroundURL();

    openDatePicker();

    expect(
      screen.getByLabelText(
        "Sunday, November 15, 2020 selected (click to start selecting range)",
      ),
    ).toHaveFocus();

    // check if current date is selected
    isEndSelection(/Sunday, November 15, 2020 selected/i);
    isStartSelection(/Sunday, November 15, 2020 selected/i);
    isInSelectionRange(/Sunday, November 15, 2020 selected/i);

    // change date selection
    press.Enter();
    press.ArrowRight();
    press.ArrowRight();
    press.ArrowDown();

    expect(screen.getByLabelText(/Tuesday, November 24, 2020/gi)).toHaveFocus();

    isEndSelection(/Tuesday, November 24, 2020/gi);
    isStartSelection(/Sunday, November 15, 2020/gi);
    isInSelectionRange(/Wednesday, November 18, 2020/gi);

    // Finish selection
    press.Enter();
    expect(screen.getByTestId("datepicker-content")).not.toBeVisible();
    expect(screen.getByTestId("segment")).toHaveTextContent(
      "11/15/2020 - 11/24/2020",
    );
  });

  it("should be invalid on wrong date selection", () => {
    render(
      <DateRangePickerComp
        defaultValue={{
          start: stringifyDate(new Date(2020, 10, 15)),
          end: stringifyDate(new Date(2020, 10, 15)),
        }}
      />,
    );

    const datepicker = screen.getByTestId("datepicker");

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
          start: stringifyDate(new Date(2020, 10, 15)),
          end: stringifyDate(new Date(2020, 10, 15)),
        }}
        minValue={stringifyDate(new Date(2020, 0, 15))}
        maxValue={stringifyDate(new Date(2020, 10, 15))}
      />,
    );
    const datepicker = screen.getByTestId("datepicker");

    expect(datepicker).not.toHaveAttribute("aria-invalid");

    repeat(press.Tab, 2);
    press.ArrowUp();

    expect(document.activeElement).toHaveTextContent("16");
    expect(datepicker).toHaveAttribute("aria-invalid", "true");
  });

  it("should be disabled", () => {
    render(<DateRangePickerComp isDisabled />);

    expect(screen.getByTestId("datepicker")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("should be readonly", () => {
    render(<DateRangePickerComp isReadOnly />);

    expect(screen.getByTestId("datepicker")).toHaveAttribute(
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
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
