import * as React from "react";
import MockDate from "mockdate";
import { axe, render, press, screen } from "reakit-test-utils";

import {
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  useCalendarState,
  CalendarWeekTitle,
  CalendarCellButton,
  CalendarInitialState,
  Calendar as CalendarWrapper,
} from "../index";
import { repeat } from "../../utils/test-utils";
import { cleanup } from "@testing-library/react";
import { addWeeks, format, subWeeks } from "../../utils";

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
        <CalendarHeader {...state} data-testid="current-year" />
        <CalendarButton {...state} goto="nextMonth" data-testid="next-month">
          next month
        </CalendarButton>
        <CalendarButton {...state} goto="nextYear">
          next year
        </CalendarButton>
      </div>

      <CalendarGrid {...state} as="table" className="dates">
        <thead>
          <tr data-testid="weekDays">
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

    expect(testId("weekDays").children).toHaveLength(7);
    expect(testId("current-year")).toHaveTextContent(/^october 2020$/i);
  });

  it("should have proper calendar header keyboard navigation", () => {
    render(<CalendarComp defaultValue={"2020-10-07"} />);

    const currentYear = screen.getByTestId("current-year");
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
    const currentYear = screen.getByTestId("current-year");

    const { getByLabelText: label } = screen;

    expect(currentYear).toHaveTextContent(/^october 2020$/i);
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
        defaultValue={format(new Date(2020, 10, 7), "YYYY-MM-DD")}
        minValue={format(subWeeks(new Date(2020, 10, 7), 1), "YYYY-MM-DD")}
        maxValue={format(addWeeks(new Date(2020, 10, 7), 1), "YYYY-MM-DD")}
      />,
    );
    const { getByLabelText: label } = screen;

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
        defaultValue={format(new Date(2020, 10, 7), "YYYY-MM-DD")}
        minValue={format(subWeeks(new Date(2020, 10, 7), 1), "YYYY-MM-DD")}
        maxValue={format(addWeeks(new Date(2020, 10, 7), 1), "YYYY-MM-DD")}
      />,
    );
    const { getByLabelText: label } = screen;

    repeat(press.Tab, 5);
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    press.PageUp();
    expect(label(/^saturday, october 31, 2020$/i)).toHaveFocus();

    press.PageDown();
    expect(label(/^saturday, november 14, 2020$/i)).toHaveFocus();

    // Should not be able to go to next/prev year
    press.PageDown(null, { shiftKey: true });
    expect(label(/^saturday, november 14, 2020$/i)).toHaveFocus();
    press.PageUp(null, { shiftKey: true });
    expect(label(/^saturday, november 14, 2020$/i)).toHaveFocus();
  });

  test("should be able to go to prev/next year when min/max values are set", () => {
    render(
      <CalendarComp
        defaultValue={format(new Date(2020, 10, 7), "YYYY-MM-DD")}
        minValue={format(subWeeks(new Date(2020, 10, 7), 1), "YYYY-MM-DD")}
        maxValue={format(addWeeks(new Date(2021, 10, 7), 1), "YYYY-MM-DD")}
      />,
    );

    const { getByLabelText: label } = screen;

    repeat(press.Tab, 5);
    expect(label(/^saturday, november 7, 2020 selected$/i)).toHaveFocus();

    press.PageUp();
    expect(label(/^saturday, october 31, 2020$/i)).toHaveFocus();

    press.PageDown(null, { shiftKey: true });
    expect(label(/^sunday, october 31, 2021$/i)).toHaveFocus();

    press.PageDown();
    expect(label(/^sunday, november 14, 2021$/i)).toHaveFocus();

    press.PageUp();
    expect(label(/^thursday, october 14, 2021$/i)).toHaveFocus();

    press.PageUp(null, { shiftKey: true });
    expect(label(/^saturday, october 31, 2020$/i)).toHaveFocus();
  });

  it("should have proper aria-label for calendar cell button", () => {
    MockDate.set(new Date(2021, 7, 10));
    render(<CalendarComp />);

    screen.getByRole("button", {
      name: /today, tuesday, august 10, 2021/i,
    });

    repeat(press.Tab, 5);
    press.Enter();
    screen.getByRole("button", {
      name: /today, tuesday, august 10, 2021 selected/i,
    });
    press.ArrowRight();
    expect(screen.getByLabelText(/wednesday, august 11, 2021/i)).toHaveFocus();

    MockDate.reset();
  });

  test("Calendar renders with no a11y violations", async () => {
    const { container } = render(<CalendarComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
