import * as React from "react";
import { axe, render, press } from "reakit-test-utils";

import {
  TimePicker,
  TimePickerColumn,
  TimePickerTrigger,
  TimePickerSegment,
  TimePickerContent,
  useTimePickerState,
  TimePickerStateProps,
  TimePickerColumnValue,
  TimePickerSegmentField,
} from "../index";
import { repeat } from "../../utils/test-utils";

beforeAll(() => {
  // https://github.com/jsdom/jsdom/issues/1695
  Element.prototype.scrollIntoView = jest.fn();

  // ChakraUI's focus() uses requestAnimationFrame so we need to mock it
  jest
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((cb: any) => cb());
});

afterAll(() => {
  (window.requestAnimationFrame as any).mockRestore();
});

const TimePickerComp: React.FC<TimePickerStateProps> = props => {
  const state = useTimePickerState(props);

  return (
    <>
      <TimePicker {...state}>
        <TimePickerSegmentField data-testid="current-time" {...state}>
          {state.segments.map((segment, i) => (
            <TimePickerSegment key={i} segment={segment} {...state} />
          ))}
        </TimePickerSegmentField>
        <TimePickerTrigger {...state}>open</TimePickerTrigger>
      </TimePicker>
      <TimePickerContent data-testid="timepicker-content" {...state}>
        <TimePickerColumn {...state.hourState}>
          {state.hours.map(n => {
            return (
              <TimePickerColumnValue key={n} value={n} {...state.hourState}>
                {n}
              </TimePickerColumnValue>
            );
          })}
        </TimePickerColumn>
        <TimePickerColumn {...state.minuteState}>
          {state.minutes.map((n, i) => {
            return (
              <TimePickerColumnValue key={n} value={i} {...state.minuteState}>
                {n}
              </TimePickerColumnValue>
            );
          })}
        </TimePickerColumn>
        <TimePickerColumn {...state.meridiesState}>
          {state.meridies.map((n, i) => {
            return (
              <TimePickerColumnValue key={n} value={i} {...state.meridiesState}>
                {n}
              </TimePickerColumnValue>
            );
          })}
        </TimePickerColumn>
      </TimePickerContent>
    </>
  );
};

describe("TimePicker", () => {
  it("should render correctly", () => {
    const { getByTestId: testId } = render(
      <TimePickerComp defaultValue="12:45" />,
    );

    expect(testId("current-time")).toHaveTextContent("12:45 PM");
  });

  it("should open and change time value", () => {
    const { getByTestId: testId } = render(
      <TimePickerComp defaultValue="12:45" />,
    );

    const timepickerContent = testId("timepicker-content");

    expect(timepickerContent).not.toBeVisible();
    press.Tab();

    press.ArrowDown(null, { altKey: true });

    expect(timepickerContent).toBeVisible();

    expect(document.activeElement).toHaveTextContent("12");
    press.ArrowDown();
    expect(document.activeElement).toHaveTextContent("1");

    press.Enter();
    expect(timepickerContent).not.toBeVisible();
    expect(testId("current-time")).toHaveTextContent("1:45 PM");
  });

  it("should be able to navigate with keyboard", () => {
    const { getByTestId: testId } = render(
      <TimePickerComp defaultValue="12:45" />,
    );

    const timepickerContent = testId("timepicker-content");

    expect(timepickerContent).not.toBeVisible();
    press.Tab();

    press.ArrowDown(null, { altKey: true });

    expect(timepickerContent).toBeVisible();

    expect(document.activeElement).toHaveTextContent("12");
    repeat(press.ArrowDown, 3);
    expect(document.activeElement).toHaveTextContent("3");

    // Go to minute column
    press.ArrowRight();
    expect(document.activeElement).toHaveTextContent("45");
    repeat(press.ArrowUp, 3);
    expect(document.activeElement).toHaveTextContent("42");

    // Go to meridian column
    press.ArrowRight();
    expect(document.activeElement).toHaveTextContent("PM");
    press.ArrowUp();
    expect(document.activeElement).toHaveTextContent("AM");

    press.Enter();
    expect(timepickerContent).not.toBeVisible();
    expect(testId("current-time")).toHaveTextContent("12:45 AM");
  });

  test("TimePicker renders with no a11y violations", async () => {
    const { container } = render(<TimePickerComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
