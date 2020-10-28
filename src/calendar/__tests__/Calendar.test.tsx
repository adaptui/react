import * as React from "react";
import { subWeeks, addWeeks, format } from "date-fns";
import { axe, render, press } from "reakit-test-utils";

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

describe("Calendar", () => {
  it("should render correctly", () => {
    const { getByTestId: testId } = render(<CalendarComp />);

    expect(testId("weekDays").children).toHaveLength(7);
    expect(testId("current-year")).toHaveTextContent("October 2020");
  });

  it("should have proper calendar header keyboard navigation", () => {
    const { getByTestId: testId, getByText: text } = render(
      <CalendarComp defaultValue={"2020-10-07"} />,
    );

    expect(testId("current-year")).toHaveTextContent("October 2020");
    press.Tab();
    press.Enter();
    expect(text("previous year")).toHaveFocus();
    expect(testId("current-year")).toHaveTextContent("October 2019");
    press.Tab();
    press.Enter();
    expect(text("previous month")).toHaveFocus();
    expect(testId("current-year")).toHaveTextContent("September 2019");
    press.Tab();
    press.Enter();
    expect(text("next month")).toHaveFocus();
    expect(testId("current-year")).toHaveTextContent("October 2019");
    press.Tab();
    press.Enter();
    expect(text("next year")).toHaveFocus();
    expect(testId("current-year")).toHaveTextContent("October 2020");
  });

  it("should proper grid navigation", () => {
    const { getByTestId: testId, getByLabelText: label } = render(
      <CalendarComp defaultValue={"2020-10-07"} />,
    );

    expect(testId("current-year")).toHaveTextContent("October 2020");
    repeat(press.Tab, 5);

    expect(label("Wednesday, October 7, 2020 selected")).toHaveFocus();

    // Let's navigate to 30
    repeat(press.ArrowDown, 2);
    repeat(press.ArrowRight, 2);
    press.ArrowDown();

    expect(label("Friday, October 30, 2020")).toHaveFocus();

    // Let's go to next month
    press.ArrowDown();
    expect(label("Friday, November 6, 2020")).toHaveFocus();
    expect(testId("current-year")).toHaveTextContent("November 2020");

    // Grid navigation pageup/down
    press.PageUp();
    expect(testId("current-year")).toHaveTextContent("October 2020");

    press.PageUp(null, { shiftKey: true });
    expect(testId("current-year")).toHaveTextContent("October 2019");
  });

  test("should have min/max values", async () => {
    const { getByLabelText: label } = render(
      <CalendarComp
        defaultValue={format(new Date(2020, 10, 7), "yyyy-MM-dd")}
        minValue={format(subWeeks(new Date(2020, 10, 7), 1), "yyyy-MM-dd")}
        maxValue={format(addWeeks(new Date(2020, 10, 7), 1), "yyyy-MM-dd")}
      />,
    );

    repeat(press.Tab, 5);
    expect(label("Saturday, November 7, 2020 selected")).toHaveFocus();

    // try to go outside the min max value
    repeat(press.ArrowUp, 4);
    expect(label("Saturday, October 31, 2020")).toHaveFocus();

    repeat(press.ArrowDown, 3);
    expect(label("Saturday, November 14, 2020")).toHaveFocus();
  });

  test("should be able to go to prev/next month when min/max values are set", async () => {
    const { getByLabelText: label } = render(
      <CalendarComp
        defaultValue={format(new Date(2020, 10, 7), "yyyy-MM-dd")}
        minValue={format(subWeeks(new Date(2020, 10, 7), 1), "yyyy-MM-dd")}
        maxValue={format(addWeeks(new Date(2020, 10, 7), 1), "yyyy-MM-dd")}
      />,
    );

    repeat(press.Tab, 5);
    expect(label("Saturday, November 7, 2020 selected")).toHaveFocus();

    press.PageUp();
    expect(label("Saturday, October 31, 2020")).toHaveFocus();

    press.PageDown();
    expect(label("Saturday, November 14, 2020")).toHaveFocus();

    // Should not be able to go to next/prev year
    press.PageDown(null, { shiftKey: true });
    expect(label("Saturday, November 14, 2020")).toHaveFocus();
    press.PageUp(null, { shiftKey: true });
    expect(label("Saturday, November 14, 2020")).toHaveFocus();
  });

  test("should be able to go to prev/next year when min/max values are set", async () => {
    const { getByLabelText: label } = render(
      <CalendarComp
        defaultValue={format(new Date(2020, 10, 7), "yyyy-MM-dd")}
        minValue={format(subWeeks(new Date(2020, 10, 7), 1), "yyyy-MM-dd")}
        maxValue={format(addWeeks(new Date(2021, 10, 7), 1), "yyyy-MM-dd")}
      />,
    );

    repeat(press.Tab, 5);
    expect(label("Saturday, November 7, 2020 selected")).toHaveFocus();

    press.PageUp();
    expect(label("Saturday, October 31, 2020")).toHaveFocus();

    press.PageDown(null, { shiftKey: true });
    expect(label("Sunday, October 31, 2021")).toHaveFocus();

    press.PageDown();
    expect(label("Sunday, November 14, 2021")).toHaveFocus();

    press.PageUp();
    expect(label("Thursday, October 14, 2021")).toHaveFocus();

    press.PageUp(null, { shiftKey: true });
    expect(label("Saturday, October 31, 2020")).toHaveFocus();
  });

  test("Calendar renders with no a11y violations", async () => {
    const { container } = render(<CalendarComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
