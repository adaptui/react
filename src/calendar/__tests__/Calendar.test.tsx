import * as React from "react";
import { subWeeks, addWeeks } from "date-fns";
import { axe, render, press } from "reakit-test-utils";

import {
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  useCalendarState,
  CalendarWeekTitle,
  CalendarCellButton,
  CalendarStateInitialProps,
  Calendar as CalendarWrapper,
} from "../index";

export const CalendarComp: React.FC<CalendarStateInitialProps> = props => {
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
    const { getByTestId: testId } = render(
      <CalendarComp defaultValue={"10-7-2020"} />,
    );

    expect(testId("weekDays").children).toHaveLength(7);
    expect(testId("current-year")).toHaveTextContent("October 2020");
  });

  it("should have proper calendar header keyboard navigation", () => {
    const { getByTestId: testId, getByText: text } = render(
      <CalendarComp defaultValue={"10-7-2020"} />,
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
      <CalendarComp defaultValue={"10-7-2020"} />,
    );

    expect(testId("current-year")).toHaveTextContent("October 2020");
    press.Tab();
    press.Tab();
    press.Tab();
    press.Tab();
    press.Tab();

    expect(label("Wednesday, October 7, 2020 selected")).toHaveFocus();

    // Let's navigate to 30
    press.ArrowDown();
    press.ArrowDown();
    press.ArrowRight();
    press.ArrowRight();
    press.ArrowDown();

    expect(label("Friday, October 30, 2020")).toHaveFocus();

    // Let's go to next month
    press.ArrowDown();
    expect(label("Friday, November 6, 2020")).toHaveFocus();
    expect(testId("current-year")).toHaveTextContent("November 2020");
  });
});

test("should have min/max values", async () => {
  const { getByLabelText: label } = render(
    <CalendarComp
      defaultValue={new Date(2020, 10, 7)}
      minValue={subWeeks(new Date(2020, 10, 7), 1)}
      maxValue={addWeeks(new Date(2020, 10, 7), 1)}
    />,
  );

  press.Tab();
  press.Tab();
  press.Tab();
  press.Tab();
  press.Tab();
  expect(label("Saturday, November 7, 2020 selected")).toHaveFocus();

  // try to go outside the min max value
  press.ArrowUp();
  press.ArrowUp();
  press.ArrowUp();
  press.ArrowUp();
  expect(label("Saturday, October 31, 2020")).toHaveFocus();

  press.ArrowDown();
  press.ArrowDown();
  press.ArrowDown();
  expect(label("Saturday, November 14, 2020")).toHaveFocus();
});

test("Calendar renders with no a11y violations", async () => {
  const { container } = render(<CalendarComp />);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
