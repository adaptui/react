import * as React from "react";
import userEvent from "@testing-library/user-event";
import { axe, render, press } from "reakit-test-utils";

import { Segment } from "../Segment";
import { SegmentField } from "../SegmentField";
import { SegmentStateProps, useSegmentState } from "../SegmentState";

const SegmentSpinnerComp: React.FC<SegmentStateProps> = props => {
  const state = useSegmentState(props);

  return (
    <SegmentField data-testid="segment-field" {...state}>
      {state.segments.map((segment, i) => (
        <Segment key={i} segment={segment} {...state} />
      ))}
    </SegmentField>
  );
};

const loop = (cb: Function, times: number) => {
  for (let i = 0; i < times; i++) {
    cb();
  }
};

describe("Segment", () => {
  it("should render correctly", () => {
    const { getByTestId: testId } = render(<SegmentSpinnerComp />);

    expect(testId("segment-field")).toHaveTextContent("1/1/2020");
  });

  it("should have proper keyboard navigation", () => {
    const { getByTestId: testId, getByLabelText: label } = render(
      <SegmentSpinnerComp />,
    );

    expect(testId("segment-field")).toHaveTextContent("1/1/2020");

    press.Tab();
    expect(label("month")).toHaveFocus();
    press.ArrowRight();
    expect(label("day")).toHaveFocus();
    press.ArrowRight();
    expect(label("year")).toHaveFocus();
    press.Home();
    expect(label("month")).toHaveFocus();
    press.End();
    expect(label("year")).toHaveFocus();
  });

  it("should have proper spinbutton keyboard navigation", () => {
    const { getByTestId: testId, getByLabelText: label } = render(
      <SegmentSpinnerComp />,
    );

    expect(testId("segment-field")).toHaveTextContent("1/1/2020");

    press.Tab();
    expect(label("month")).toHaveFocus();

    loop(() => press.ArrowUp(), 10);
    expect(label("month")).toHaveTextContent("11");
    press.ArrowUp();
    press.ArrowUp();
    expect(label("month")).toHaveTextContent("1");
  });

  it("should jump to next segment on input", async () => {
    const { getByTestId: testId, getByLabelText: label } = render(
      <SegmentSpinnerComp />,
    );

    expect(testId("segment-field")).toHaveTextContent("1/1/2020");

    press.Tab();
    expect(label("month")).toHaveFocus();

    await userEvent.type(label("month"), "11");
    expect(label("month")).toHaveTextContent("11");

    expect(label("day")).toHaveFocus();

    await userEvent.type(label("day"), "31");
    // can't have value 31 will resolve to 1
    expect(label("day")).toHaveTextContent("1");

    expect(label("year")).toHaveFocus();
  });

  it("should be able to remove delete values backspace", async () => {
    const { getByTestId: testId, getByLabelText: label } = render(
      <SegmentSpinnerComp />,
    );

    expect(testId("segment-field")).toHaveTextContent("1/1/2020");

    press.Tab();
    press.Enter();
    press.Enter();

    expect(label("year")).toHaveTextContent("2020");
    press.Backspace();
    press.Backspace();
    expect(label("year")).toHaveTextContent("20");
    press.Backspace();
    expect(label("year")).toHaveTextContent("2");
    press.Backspace();
    expect(label("year")).toHaveTextContent("1");
  });

  it("should be able to change dayPeriod AM/PM", async () => {
    const { getByTestId: testId, getByLabelText: label } = render(
      <SegmentSpinnerComp formatOptions={{ timeStyle: "short" }} />,
    );

    expect(testId("segment-field")).toHaveTextContent("12:00 AM");

    press.Tab();
    press.Enter();
    press.Enter();

    await userEvent.type(label("dayPeriod"), "a");
    expect(label("dayPeriod")).toHaveTextContent("AM");

    await userEvent.type(label("dayPeriod"), "p");
    expect(label("dayPeriod")).toHaveTextContent("PM");
  });

  it("can have other date formats", () => {
    const {
      getByTestId: testId,
      getByLabelText: label,
      getByText: text,
    } = render(
      <SegmentSpinnerComp
        formatOptions={{
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          weekday: "long",
        }}
      />,
    );

    expect(testId("segment-field")).toHaveTextContent("Wednesday, 01/01/2020");

    press.Tab();
    expect(text("Wednesday")).toHaveFocus();

    press.Tab();
    expect(label("month")).toHaveFocus();
    press.ArrowUp();
    expect(label("month")).toHaveTextContent("2");
    expect(text("Saturday")).toBeInTheDocument();
  });

  it("can have time style", () => {
    const { getByTestId: testId, getByLabelText: label } = render(
      <SegmentSpinnerComp
        formatOptions={{
          timeStyle: "short",
        }}
      />,
    );

    expect(testId("segment-field")).toHaveTextContent("12:00 AM");

    press.Tab();
    expect(label("hour")).toHaveFocus();

    press.ArrowUp();
    expect(label("hour")).toHaveTextContent("1");

    press.Tab();
    press.Tab();
    expect(label("dayPeriod")).toHaveFocus();
    press.ArrowUp();
    expect(label("dayPeriod")).toHaveTextContent("PM");
  });

  it("should onChange", () => {
    const onChangefn = jest.fn();
    const Controlled = () => {
      const [date, setDate] = React.useState(new Date(2020, 5, 0));

      return (
        <SegmentSpinnerComp
          onChange={v => {
            setDate(v);
            onChangefn(v);
          }}
          value={date}
        />
      );
    };

    const { getByTestId: testId, getByLabelText: label } = render(
      <Controlled />,
    );

    expect(testId("segment-field")).toHaveTextContent("5/31/2020");

    press.Tab();
    expect(label("month")).toHaveFocus();

    press.ArrowUp();
    expect(label("month")).toHaveTextContent("6");

    expect(onChangefn).toHaveBeenCalledWith(new Date(2020, 6, 0));
  });

  test("Segment renders with no a11y violations", async () => {
    const { container } = render(<SegmentSpinnerComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
