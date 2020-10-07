import * as React from "react";
import { axe, render, press } from "reakit-test-utils";

import { RangeCalendarProps } from "../index.d";
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  CalendarWeekTitle,
  CalendarCellButton,
  useRangeCalendarState,
} from "../index";

const RangeCalendarComp: React.FC<RangeCalendarProps> = props => {
  const state = useRangeCalendarState(props);

  return (
    <Calendar
      {...state}
      onChange={() => console.log("change")}
      className="calendar-range"
    >
      <div className="header">
        <CalendarButton {...state} goto="previousYear">
          previous year
        </CalendarButton>
        <CalendarButton
          {...state}
          goto="previousMonth"
          data-testid="prev-month"
        >
          previous month
        </CalendarButton>
        <CalendarHeader data-testid="current-year" {...state} />
        <CalendarButton {...state} goto="nextMonth">
          next month
        </CalendarButton>
        <CalendarButton {...state} goto="nextYear">
          next year
        </CalendarButton>
      </div>

      <CalendarGrid {...state} as="table" className="dates">
        <thead>
          <tr data-testid="week-days">
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

describe("RangeCalendar", () => {
  it("should render correctly", () => {
    const { getByTestId: testId } = render(
      <RangeCalendarComp
        defaultValue={{ start: "10-7-2020", end: "10-30-2020" }}
      />,
    );

    expect(testId("week-days").children).toHaveLength(7);
    expect(testId("current-year")).toHaveTextContent("October 2020");
  });

  it("should have proper initial start and end ranges", () => {
    const { getByLabelText: label, baseElement } = render(
      <RangeCalendarComp
        defaultValue={{ start: "10-7-2020", end: "10-30-2020" }}
      />,
    );

    const start = baseElement.querySelector("[data-is-selection-start]");
    const anyMiddleDate = label("Thursday, October 15, 2020");
    const end = baseElement.querySelector("[data-is-selection-end]");

    expect(start).toHaveTextContent("7");
    expect(anyMiddleDate.parentElement).toHaveAttribute(
      "data-is-range-selection",
    );
    expect(end).toHaveTextContent("30");
  });

  it("should be able to select ranges with keyboard navigation", () => {
    const { getByLabelText: label, getByTestId: testId, baseElement } = render(
      <RangeCalendarComp
        defaultValue={{ start: "10-7-2020", end: "10-30-2020" }}
      />,
    );

    expect(testId("current-year")).toHaveTextContent("October 2020");
    press.Tab();
    press.Tab();
    press.Tab();
    press.Tab();
    press.Tab();

    expect(label("Today, Wednesday, October 7, 2020 selected")).toHaveFocus();
    press.ArrowDown(); // go to down just for some variety

    press.Enter(); // start the selection, currently the start and end should be the same date
    expect(
      baseElement.querySelector("[data-is-selection-start]"),
    ).toHaveTextContent("14");
    expect(
      baseElement.querySelector("[data-is-selection-end]"),
    ).toHaveTextContent("14");

    // Now we choose the end date, let's choose 19
    press.ArrowDown();
    press.ArrowDown();
    press.ArrowDown();
    press.ArrowLeft();
    press.ArrowLeft();
    expect(
      label("Monday, November 2, 2020 (click to finish selecting range)"),
    ).toHaveFocus();
    // finish the selection
    press.Enter();

    // check if the selection is actually finished or not
    press.ArrowRight();
    press.ArrowRight();
    expect(label("Wednesday, November 4, 2020")).toHaveFocus();
    expect(
      label("Wednesday, November 4, 2020")?.parentElement,
    ).not.toHaveAttribute("data-is-range-selection");

    // Verify selection ranges
    const end = baseElement.querySelector("[data-is-selection-end]");
    expect(end).toHaveTextContent("2");

    testId("prev-month").click();
    // We need to go to previous month to see/verify the start selection
    const start = baseElement.querySelector("[data-is-selection-start]");
    expect(start).toHaveTextContent("14");
  });
});

test("RangeCalendar renders with no a11y violations", async () => {
  const { container } = render(<RangeCalendarComp />);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
