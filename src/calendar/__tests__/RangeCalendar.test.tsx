jest.mock("../../utils/LiveAnnouncer");
import * as React from "react";
import MockDate from "mockdate";
import { cleanup, screen } from "@testing-library/react";
import { axe, render, press, fireEvent } from "reakit-test-utils";

import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  CalendarWeekTitle,
  CalendarCellButton,
  useRangeCalendarState,
  RangeCalendarInitialState,
} from "../index";
import {
  isEndSelection,
  isStartSelection,
  repeat,
} from "../../utils/test-utils";
import { announce, destroyAnnouncer } from "../../utils/LiveAnnouncer";

afterEach(cleanup);

beforeEach(() => {
  destroyAnnouncer();
});

const RangeCalendarComp: React.FC<RangeCalendarInitialState> = props => {
  const state = useRangeCalendarState(props);

  return (
    <Calendar {...state} className="calendar-range">
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
        defaultValue={{ start: "2020-10-07", end: "2020-10-30" }}
      />,
    );

    expect(testId("week-days").children).toHaveLength(7);
    expect(testId("current-year")).toHaveTextContent("October 2020");
  });

  it("should have proper initial start and end ranges", () => {
    const { baseElement } = render(
      <RangeCalendarComp
        defaultValue={{ start: "2050-10-07", end: "2050-10-30" }}
      />,
    );

    const start = baseElement.querySelector("[data-is-selection-start]");
    // If anyone is reading this code from future
    // Note that this will fail again on 15th october 2050.
    const anyMiddleDate = screen.getByLabelText(/Saturday, October 15, 2050/);
    const end = baseElement.querySelector("[data-is-selection-end]");

    expect(start).toHaveTextContent("7");
    expect(anyMiddleDate.parentElement).toHaveAttribute(
      "data-is-range-selection",
    );
    expect(end).toHaveTextContent("30");
  });

  it("should announce selected range after finishing selection", () => {
    const { getByLabelText: label } = render(
      <RangeCalendarComp
        defaultValue={{ start: "2019-10-07", end: "2019-10-30" }}
      />,
    );

    repeat(press.Tab, 5);
    press.Enter(label(/Monday, October 7, 2019 selected/));
    press.ArrowDown();
    press.ArrowRight();
    press.Enter(label(/Tuesday, October 15, 2019/));

    expect(announce).toHaveBeenCalledTimes(2);
    expect(announce).toHaveBeenLastCalledWith(
      "Selected range, from 7th Oct 2019 to 15th Oct 2019",
    );
  });

  it("should be able to select ranges with keyboard navigation", () => {
    MockDate.set(new Date(2020, 10, 7));
    const { baseElement } = render(
      <RangeCalendarComp
        defaultValue={{ start: "2020-10-07", end: "2020-10-30" }}
      />,
    );

    expect(screen.getByTestId("current-year")).toHaveTextContent(
      /October 2020/i,
    );
    repeat(press.Tab, 5);

    expect(
      screen.getByLabelText(
        /^Wednesday, October 7, 2020 selected \(click to start selecting range\)$/,
      ),
    ).toHaveFocus();
    press.ArrowDown(); // go to down just for some variety

    press.Enter(); // start the selection, currently the start and end should be the same date
    expect(
      baseElement.querySelector("[data-is-selection-start]"),
    ).toHaveTextContent("14");
    expect(
      baseElement.querySelector("[data-is-selection-end]"),
    ).toHaveTextContent("14");

    // Now we choose the end date, let's choose 19
    repeat(press.ArrowDown, 3);
    repeat(press.ArrowLeft, 2);
    expect(
      screen.getByLabelText(
        /^Monday, November 2, 2020 \(click to finish selecting range\)$/i,
      ),
    ).toHaveFocus();
    // finish the selection
    press.Enter();

    // check if the selection is actually finished or not
    repeat(press.ArrowRight, 2);
    const fourThNovember = screen.getByLabelText(
      /^Wednesday, November 4, 2020 \(click to start selecting range\)$/i,
    );
    expect(fourThNovember).toHaveFocus();
    expect(fourThNovember?.parentElement).not.toHaveAttribute(
      "data-is-range-selection",
    );

    // Verify selection ranges
    const end = baseElement.querySelector("[data-is-selection-end]");
    expect(end).toHaveTextContent("2");

    fireEvent.click(screen.getByTestId("prev-month"));
    // We need to go to previous month to see/verify the start selection
    const start = baseElement.querySelector("[data-is-selection-start]");
    expect(start).toHaveTextContent("14");
  });

  it("should be able to cancel selection", () => {
    render(
      <RangeCalendarComp
        defaultValue={{ start: "2019-10-07", end: "2019-10-30" }}
      />,
    );

    expect(screen.getByTestId("current-year")).toHaveTextContent(
      /October 2019/i,
    );
    repeat(press.Tab, 5);

    expect(
      screen.getByLabelText(
        /^Monday, October 7, 2019 selected \(click to start selecting range\)$/i,
      ),
    ).toHaveFocus();
    press.ArrowDown();
    press.Enter(); // start the selection

    // Now we choose the end date, let's choose 19
    press.ArrowDown();
    repeat(press.ArrowRight, 2);
    expect(
      screen.getByLabelText(
        /^Wednesday, October 23, 2019 \(click to finish selecting range\)$/i,
      ),
    ).toHaveFocus();

    press.Escape();
    isEndSelection(screen.getByLabelText(/Wednesday, October 30, 2019/));
    isStartSelection(screen.getByLabelText(/Monday, October 7, 2019 selected/));
  });

  test("RangeCalendar renders with no a11y violations", async () => {
    const { container } = render(<RangeCalendarComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
