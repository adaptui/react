import { format, addWeeks, subWeeks } from "date-fns";
import * as React from "react";

import { axe, render, press } from "reakit-test-utils";
import {
  DatePicker,
  DatePickerSegment,
  DatePickerTrigger,
  DatePickerContent,
  useDatePickerState,
  DatePickerInitialState,
  DatePickerSegmentField,
} from "..";

import {
  Calendar,
  CalendarStateReturn,
  CalendarButton,
  CalendarHeader,
  CalendarGrid,
  CalendarWeekTitle,
  CalendarCell,
  CalendarCellButton,
} from "../../calendar";
import { repeat } from "../../utils/test-utils";

/*
// Mocking useId otherwise snapshots will change each time
// since useCalendarState uses useId.
jest.spyOn(reakit, "unstable_useId").mockImplementation(options => ({
  id: options.baseId + "myid"
}));
*/

export const CalendarComp: React.FC<CalendarStateReturn> = state => {
  return (
    <Calendar {...state}>
      <div>
        <CalendarButton {...state} goto="previousYear">
          {"<"}
        </CalendarButton>
        <CalendarButton {...state} goto="previousMonth">
          {"<<"}
        </CalendarButton>
        <CalendarHeader data-testid="calendar-header" {...state} />
        <CalendarButton {...state} goto="nextMonth">
          {">>"}
        </CalendarButton>
        <CalendarButton {...state} goto="nextYear">
          {">"}
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

const DatePickerComp: React.FC<DatePickerInitialState> = props => {
  const state = useDatePickerState({
    baseId: "calendar",
    dialogId: "dialog",
    pickerId: "picker",
    formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
    ...props,
  });

  return (
    <>
      <DatePicker data-testid="datepicker" {...state}>
        <div>
          <DatePickerSegmentField data-testid="segment" {...state}>
            {state.segments.map((segment, i) => (
              <DatePickerSegment key={i} segment={segment} {...state} />
            ))}
          </DatePickerSegmentField>

          <DatePickerTrigger {...state}>open</DatePickerTrigger>
        </div>
      </DatePicker>
      <DatePickerContent data-testid="datepicker-content" {...state}>
        <CalendarComp {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

const openDatePicker = (label: any, testId: any) => {
  press.Tab();
  expect(label("month", { selector: "div" })).toHaveFocus();

  press.ArrowDown(null, { altKey: true });
  expect(testId("datepicker-content")).toBeVisible();
};

describe("DatePicker", () => {
  it("should open/close the datepicker", () => {
    const { getByLabelText: label, getByTestId: testId } = render(
      <DatePickerComp defaultValue={"2020-11-1"} />,
    );

    const datepickerContent = testId("datepicker-content");

    expect(testId("segment")).toHaveTextContent("11/01/2020");
    expect(datepickerContent).not.toBeVisible();

    // open
    openDatePicker(label, testId);

    // close
    press.Escape();
    expect(datepickerContent).not.toBeVisible();
    expect(label("month", { selector: "div" })).toHaveFocus();
  });

  it("should be able to open and select date", () => {
    const { getByLabelText: label, getByTestId: testId } = render(
      <DatePickerComp defaultValue={"2020-11-1"} />,
    );

    // open
    openDatePicker(label, testId);

    // assert focused date on calendar
    expect(label("Sunday, November 1, 2020 selected")).toHaveFocus();

    // go to 24
    repeat(press.ArrowDown, 3);
    repeat(press.ArrowRight, 2);

    expect(label("Tuesday, November 24, 2020")).toHaveFocus();

    press.Enter();
    expect(testId("datepicker-content")).not.toBeVisible();
    expect(label("month", { selector: "div" })).toHaveFocus();
    expect(testId("segment")).toHaveTextContent("11/24/2020");
  });

  it("should be able to open and select date and jump to different dates", () => {
    const { getByLabelText: label, getByTestId: testId } = render(
      <DatePickerComp defaultValue={"2020-11-1"} />,
    );

    const calendarHeader = testId("calendar-header");
    // open
    openDatePicker(label, testId);

    // assert focused date on calendar
    expect(label("Sunday, November 1, 2020 selected")).toHaveFocus();

    // jump month
    expect(calendarHeader).toHaveTextContent("November 2020");
    repeat(press.PageDown, 2);

    expect(calendarHeader).toHaveTextContent("January 2021");

    // jump year
    expect(calendarHeader).toHaveTextContent("January 2021");
    repeat(() => {
      press.PageDown(null, { shiftKey: true });
    }, 2);
    expect(calendarHeader).toHaveTextContent("January 2023");

    press.Enter();
    expect(testId("datepicker-content")).not.toBeVisible();
    expect(label("month", { selector: "div" })).toHaveFocus();
    expect(testId("segment")).toHaveTextContent("01/01/2023");
  });

  it("should work with AutoFocus", () => {
    const { getByLabelText: label } = render(
      // eslint-disable-next-line jsx-a11y/no-autofocus
      <DatePickerComp autoFocus />,
    );

    expect(label("month", { selector: "div" })).toHaveFocus();
  });

  it("should be invalid on out of range value", () => {
    const { getByLabelText: label, getByTestId: testId } = render(
      <DatePickerComp
        defaultValue={format(addWeeks(new Date(), 2), "yyyy-MM-dd")}
        minValue={format(subWeeks(new Date(), 1), "yyyy-MM-dd")}
        maxValue={format(addWeeks(new Date(), 1), "yyyy-MM-dd")}
      />,
    );

    expect(testId("datepicker")).toHaveAttribute("aria-invalid", "true");
  });

  it("should be disabled", () => {
    const { getByTestId: testId } = render(<DatePickerComp isDisabled />);

    expect(testId("datepicker")).toHaveAttribute("aria-disabled", "true");
  });

  it("should be readonly", () => {
    const { getByTestId: testId } = render(<DatePickerComp isReadOnly />);

    expect(testId("datepicker")).toHaveAttribute("aria-readonly", "true");
  });

  test("DatePicker renders with no a11y violations", async () => {
    const { container } = render(<DatePickerComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
