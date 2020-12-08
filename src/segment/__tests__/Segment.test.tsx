import * as React from "react";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, render, press, screen } from "reakit-test-utils";

import {
  Segment,
  SegmentField,
  useSegmentState,
  SegmentInitialState,
} from "../index";
import { repeat } from "../../utils/test-utils";

afterEach(cleanup);

const SegmentSpinnerComp: React.FC<SegmentInitialState> = props => {
  const state = useSegmentState(props);

  return (
    <SegmentField data-testid="segment-field" {...state}>
      {state.segments.map((segment, i) => (
        <Segment key={i} segment={segment} {...state} />
      ))}
    </SegmentField>
  );
};

describe("Segment", () => {
  it("should render correctly", () => {
    render(<SegmentSpinnerComp />);

    expect(screen.getByTestId("segment-field")).toHaveTextContent("1/1/2020");
  });

  it("should have proper keyboard navigation", () => {
    render(<SegmentSpinnerComp />);

    const month = screen.getByRole("spinbutton", {
      name: /month/i,
    });
    const year = screen.getByRole("spinbutton", {
      name: /year/i,
    });
    const day = screen.getByRole("spinbutton", {
      name: /day/i,
    });

    expect(screen.getByTestId("segment-field")).toHaveTextContent("1/1/2020");
    press.Tab();
    expect(month).toHaveFocus();
    press.ArrowRight();
    expect(day).toHaveFocus();
    press.ArrowRight();
    expect(year).toHaveFocus();
    press.Home();
    expect(month).toHaveFocus();
    press.End();
    expect(year).toHaveFocus();
  });

  it("should have proper spinbutton keyboard navigation", () => {
    render(<SegmentSpinnerComp />);

    const month = screen.getByRole("spinbutton", {
      name: /month/i,
    });

    expect(screen.getByTestId("segment-field")).toHaveTextContent("1/1/2020");

    press.Tab();
    expect(month).toHaveFocus();

    repeat(() => press.ArrowUp(), 10);
    expect(month).toHaveTextContent("11");
    press.ArrowUp();
    press.ArrowUp();
    expect(month).toHaveTextContent("1");
  });

  it("should jump to next segment on input", async () => {
    render(<SegmentSpinnerComp />);

    const month = screen.getByRole("spinbutton", {
      name: /month/i,
    });
    const year = screen.getByRole("spinbutton", {
      name: /year/i,
    });
    const day = screen.getByRole("spinbutton", {
      name: /day/i,
    });

    expect(screen.getByTestId("segment-field")).toHaveTextContent("1/1/2020");

    press.Tab();
    expect(month).toHaveFocus();

    await userEvent.type(month, "11");
    expect(month).toHaveTextContent("11");

    expect(day).toHaveFocus();

    await userEvent.type(day, "31");
    // can't have value 31 will resolve to 1
    expect(day).toHaveTextContent("1");

    expect(year).toHaveFocus();
  });

  it("should be able to remove delete values backspace", async () => {
    render(<SegmentSpinnerComp />);

    const year = screen.getByRole("spinbutton", {
      name: /year/i,
    });

    expect(screen.getByTestId("segment-field")).toHaveTextContent("1/1/2020");

    press.Tab();
    press.Enter();
    press.Enter();

    expect(year).toHaveTextContent("2020");
    press.Backspace();
    press.Backspace();
    expect(year).toHaveTextContent("20");
    press.Backspace();
    expect(year).toHaveTextContent("2");
    press.Backspace();
    expect(year).toHaveTextContent("1");
  });

  it("should be able to change dayPeriod AM/PM", async () => {
    render(<SegmentSpinnerComp formatOptions={{ timeStyle: "short" }} />);

    const dayPeriod = screen.getByRole("spinbutton", {
      name: /dayperiod/i,
    });

    expect(screen.getByTestId("segment-field")).toHaveTextContent("12:00 AM");

    press.Tab();
    press.Enter();
    press.Enter();

    await userEvent.type(dayPeriod, "a");
    expect(dayPeriod).toHaveTextContent("AM");

    await userEvent.type(dayPeriod, "p");
    expect(dayPeriod).toHaveTextContent("PM");
  });

  it("can have other date formats", () => {
    render(
      <SegmentSpinnerComp
        formatOptions={{
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          weekday: "long",
        }}
      />,
    );

    const month = screen.getByRole("spinbutton", {
      name: /month/i,
    });

    expect(screen.getByTestId("segment-field")).toHaveTextContent(
      "Wednesday, 01/01/2020",
    );

    press.Tab();
    expect(screen.getByText(/wednesday/i)).toHaveFocus();

    press.Tab();
    expect(month).toHaveFocus();
    press.ArrowUp();
    expect(month).toHaveTextContent("2");
    expect(screen.getByText(/saturday/i)).toBeInTheDocument();
  });

  it("can have time style", () => {
    render(
      <SegmentSpinnerComp
        formatOptions={{
          timeStyle: "short",
        }}
      />,
    );

    const hour = screen.getByRole("spinbutton", {
      name: /hour/i,
    });
    const dayPeriod = screen.getByRole("spinbutton", {
      name: /dayperiod/i,
    });

    expect(screen.getByTestId("segment-field")).toHaveTextContent("12:00 AM");

    press.Tab();
    expect(hour).toHaveFocus();

    press.ArrowUp();
    expect(hour).toHaveTextContent("1");

    press.Tab();
    press.Tab();
    expect(dayPeriod).toHaveFocus();
    press.ArrowUp();
    expect(dayPeriod).toHaveTextContent("PM");
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

    render(<Controlled />);

    const month = screen.getByRole("spinbutton", {
      name: /month/i,
    });
    expect(screen.getByTestId("segment-field")).toHaveTextContent("5/31/2020");

    press.Tab();
    expect(month).toHaveFocus();

    press.ArrowUp();
    expect(month).toHaveTextContent("6");

    expect(onChangefn).toHaveBeenCalledWith(new Date(2020, 6, 0));
  });

  test("Segment renders with no a11y violations", async () => {
    const { container } = render(<SegmentSpinnerComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
