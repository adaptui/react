import * as React from "react";
import { cleanup } from "@testing-library/react";

import { axe, render, press, screen } from "reakit-test-utils";
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
import { addWeeks, subWeeks, toUTCString } from "../../utils";

/*
// Mocking useId otherwise snapshots will change each time
// since useCalendarState uses useId.
jest.spyOn(reakit, "unstable_useId").mockImplementation(options => ({
  id: options.baseId + "myid"
}));
*/
afterEach(cleanup);

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

const openDatePicker = () => {
  press.Tab();
  expect(screen.getByLabelText("month", { selector: "div" })).toHaveFocus();

  press.ArrowDown(null, { altKey: true });
  expect(screen.getByTestId("datepicker-content")).toBeVisible();
};

describe("DatePicker", () => {
  it("should open/close the datepicker", () => {
    render(<DatePickerComp defaultValue={"2020-11-1"} />);

    const datepickerContent = screen.getByTestId("datepicker-content");
    const segment = screen.getByTestId("segment");
    const month = screen.getByRole("spinbutton", {
      name: /month/i,
    });

    expect(segment).toHaveTextContent("11/01/2020");
    expect(datepickerContent).not.toBeVisible();

    // open
    openDatePicker();

    // close
    press.Escape();
    expect(datepickerContent).not.toBeVisible();
    expect(month).toHaveFocus();
  });

  it("should be able to open and select date", () => {
    render(<DatePickerComp defaultValue={"2020-11-1"} />);

    const segment = screen.getByTestId("segment");
    const datepickerContent = screen.getByTestId("datepicker-content");
    const month = screen.getByRole("spinbutton", {
      name: /month/i,
    });

    // open
    openDatePicker();

    // assert focused date on calendar
    expect(
      screen.getByLabelText(/Sunday, November 1, 2020 selected/i),
    ).toHaveFocus();

    // go to 24
    repeat(press.ArrowDown, 3);
    repeat(press.ArrowRight, 2);

    expect(screen.getByLabelText(/Tuesday, November 24, 2020/i)).toHaveFocus();

    press.Enter();
    expect(datepickerContent).not.toBeVisible();
    expect(month).toHaveFocus();
    expect(segment).toHaveTextContent("11/24/2020");
  });

  it("should be able to open and select date and jump to different dates", () => {
    render(<DatePickerComp defaultValue={"2020-11-1"} />);
    const segment = screen.getByTestId("segment");
    const calendarHeader = screen.getByTestId("calendar-header");
    const datepickerContent = screen.getByTestId("datepicker-content");
    const month = screen.getByRole("spinbutton", {
      name: /month/i,
    });

    // open
    openDatePicker();

    // assert focused date on calendar
    expect(
      screen.getByLabelText(/^Sunday, November 1, 2020 selected$/i),
    ).toHaveFocus();

    // jump month
    expect(calendarHeader).toHaveTextContent(/November 2020/i);
    repeat(press.PageDown, 2);

    expect(calendarHeader).toHaveTextContent(/January 2021/i);

    // jump year
    expect(calendarHeader).toHaveTextContent(/January 2021/i);
    repeat(() => {
      press.PageDown(null, { shiftKey: true });
    }, 2);
    expect(calendarHeader).toHaveTextContent(/January 2023/i);

    press.Enter();
    expect(datepickerContent).not.toBeVisible();
    expect(month).toHaveFocus();
    expect(segment).toHaveTextContent("01/01/2023");
  });

  it("should work with AutoFocus", () => {
    render(
      // eslint-disable-next-line jsx-a11y/no-autofocus
      <DatePickerComp autoFocus />,
    );

    expect(
      screen.getByRole("spinbutton", {
        name: /month/i,
      }),
    ).toHaveFocus();
  });

  it("should be invalid on out of range value", () => {
    render(
      <DatePickerComp
        defaultValue={toUTCString(addWeeks(new Date(), 2))}
        minValue={toUTCString(subWeeks(new Date(), 1))}
        maxValue={toUTCString(addWeeks(new Date(), 1))}
      />,
    );

    expect(screen.getByTestId("datepicker")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("should be disabled", () => {
    render(<DatePickerComp isDisabled />);

    expect(screen.getByTestId("datepicker")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("should be readonly", () => {
    render(<DatePickerComp isReadOnly />);

    expect(screen.getByTestId("datepicker")).toHaveAttribute(
      "aria-readonly",
      "true",
    );
  });

  test("DatePicker renders with no a11y violations", async () => {
    const { container } = render(<DatePickerComp />);
    const results = await axe(container, {
      rules: { "nested-interactive": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
