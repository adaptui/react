/* eslint-disable testing-library/prefer-explicit-assert */
import * as React from "react";
import { axe, press, render, screen } from "reakit-test-utils";
import { cleanup } from "@testing-library/react";
import MockDate from "mockdate";

import { repeat } from "../../utils/test-utils";
import {
  Calendar as CalendarWrapper,
  CalendarButton,
  CalendarCell,
  CalendarCellButton,
  CalendarGrid,
  CalendarHeader,
  CalendarInitialState,
  CalendarWeekTitle,
  useCalendarState,
} from "../index";

export const CalendarComp: React.FC<CalendarInitialState> = props => {
  const state = useCalendarState(props);

  return (
    <CalendarWrapper {...state}>
      <div className="header">
        <CalendarButton {...state} goto="previousYear">
          previous year
        </CalendarButton>
        <CalendarButton {...state} goto="previousMonth">
          previous month
        </CalendarButton>
        <CalendarHeader {...state} data-testid="testid-current-year" />
        <CalendarButton
          {...state}
          goto="nextMonth"
          data-testid="testid-next-month"
        >
          next month
        </CalendarButton>
        <CalendarButton {...state} goto="nextYear">
          next year
        </CalendarButton>
      </div>

      <CalendarGrid {...state} as="table" className="dates">
        <thead>
          <tr data-testid="testid-weekDays">
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
          {state.daysInMonth.map((week: any[], weekIndex: React.Key) => (
            <tr key={weekIndex}>
              {week.map((day: Date, dayIndex: React.Key) => (
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

beforeEach(() => {
  // You SHALL Freeze 🧙
  MockDate.set(new Date(2020, 9, 29));
});

afterEach(() => {
  cleanup();
  MockDate.reset();
});

describe("Calendar", () => {
  it("should render correctly", () => {
    const { getByTestId: testId } = render(<CalendarComp />);

    expect(testId("testid-weekDays").children).toHaveLength(7);
    expect(testId("testid-current-year")).toHaveTextContent(/^october 2020$/i);
  });

  it("should have proper calendar header keyboard navigation", () => {
    render(<CalendarComp defaultValue={"2020-10-07"} />);

    const currentYear = screen.getByTestId("testid-current-year");
    const { getByText: text } = screen;

    expect(currentYear).toHaveTextContent(/^october 2020$/i);
    press.Tab();
    press.Enter();
    expect(text(/previous year/i)).toHaveFocus();
    expect(currentYear).toHaveTextContent(/^october 2019$/i);

    press.Tab();
    press.Enter();
    expect(text(/previous month/i)).toHaveFocus();
    expect(currentYear).toHaveTextContent(/^september 2019$/i);

    press.Tab();
    press.Enter();
    expect(text(/next month/i)).toHaveFocus();
    expect(currentYear).toHaveTextContent(/^october 2019$/i);

    press.Tab();
    press.Enter();
    expect(text(/next year/i)).toHaveFocus();
    expect(currentYear).toHaveTextContent(/^october 2020$/i);
  });

  it("should proper grid navigation", () => {
    render(<CalendarComp defaultValue={"2020-10-07"} />);
    const currentYear = screen.getByTestId("testid-current-year");

    const { getByLabelText: label } = screen;

    expect(currentYear).toHaveTextContent(/^october 2020$/i);

    // Tab to go inside the calendar dates
    repeat(press.Tab, 5);
    expect(label(/wednesday, october 7, 2020 selected/i)).toHaveFocus();

    // Let's navigate to 30
    repeat(press.ArrowDown, 2);
    repeat(press.ArrowRight, 2);
    press.ArrowDown();

    expect(label(/^friday, october 30, 2020$/i)).toHaveFocus();

    // Let's go to next month
    press.ArrowDown();
    expect(label(/^friday, november 6, 2020$/i)).toHaveFocus();
    expect(currentYear).toHaveTextContent(/^november 2020$/i);

    // Grid navigation pageup/down
    press.PageUp();
    expect(currentYear).toHaveTextContent(/^october 2020$/i);

    press.PageUp(null, { shiftKey: true });
    expect(currentYear).toHaveTextContent(/^october 2019$/i);
  });

  test("should have min/max values", () => {
    render(
      <CalendarComp
        defaultValue={"2020-11-07"}
        minValue={"2020-10-31"}
        maxValue={"2020-11-14"}
      />,
    );
    const { getByLabelText: label } = screen;

    // Tab to go inside the calendar dates
    repeat(press.Tab, 5);
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    // try to go outside the min max value
    repeat(press.ArrowUp, 4);
    expect(label(/^saturday, october 31, 2020$/i)).toHaveFocus();

    repeat(press.ArrowDown, 3);
    expect(label(/^saturday, november 14, 2020$/i)).toHaveFocus();
  });

  test("should be able to go to prev/next month when min/max values are set", () => {
    render(
      <CalendarComp
        defaultValue={"2020-11-07"}
        minValue={"2020-10-31"}
        maxValue={"2020-11-14"}
      />,
    );
    const { getByLabelText: label } = screen;

    // Tab to go inside the calendar dates
    repeat(press.Tab, 5);
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    // Should not be able to go to next/prev months
    press.PageUp();
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    press.PageDown();
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    // Should not be able to go to next/prev years
    press.PageDown(null, { shiftKey: true });
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    press.PageUp(null, { shiftKey: true });
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();
  });

  test("should not be able to go to prev/next year when min/max values are set", () => {
    render(
      <CalendarComp
        defaultValue={"2020-11-07"}
        minValue={"2020-10-31"}
        maxValue={"2020-11-14"}
      />,
    );

    const { getByLabelText: label } = screen;

    repeat(press.Tab, 5);
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    press.PageUp();
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    press.PageDown(null, { shiftKey: true });
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    press.PageDown();
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    press.PageUp();
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    press.PageUp(null, { shiftKey: true });
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();
  });

  it("should have proper aria-label for calendar cell button", () => {
    MockDate.set("2020-11-07");
    render(<CalendarComp />);

    screen.getByRole("button", {
      name: /^today, saturday, november 7, 2020 selected$/i,
    });

    repeat(press.Tab, 5);
    press.ArrowRight();
    press.Enter();
    screen.getByRole("button", {
      name: /sunday, november 8, 2020 selected/i,
    });

    repeat(press.ArrowLeft, 2);
    press.Enter();
    screen.getByRole("button", {
      name: /friday, november 6, 2020 selected/i,
    });

    MockDate.reset();
  });

  test("Calendar renders with no a11y violations", async () => {
    const { container } = render(<CalendarComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
