import React from "react";
import MockDate from "mockdate";
import { render } from "reakit-test-utils";

import {
  parseDate,
  stringifyDate,
  parseRangeDate,
  isInvalidDateRange,
} from "./date";
import { clampValue, createContext, valueToPercent } from ".";

describe("Utils", () => {
  test("parseDate", () => {
    MockDate.set(
      new Date("Wed Oct 07 2020 18:00:00 GMT+0530 (India Standard Time)"),
    );

    expect(parseDate("2020-10-07")?.toString()).toEqual(
      "Wed Oct 07 2020 18:00:00 GMT+0530 (India Standard Time)",
    );

    expect(parseDate("1-1-1")?.toString()).toEqual(
      "Mon Jan 01 0001 18:00:00 GMT+0553 (India Standard Time)",
    );

    expect(parseDate("Hello world")).toBeUndefined();
    expect(parseDate("202020-2020-20")).toBeUndefined();

    MockDate.reset();
  });

  test("stringifyDate", () => {
    expect(stringifyDate(new Date(1999, 4, 5))).toEqual("1999-05-05");
    expect(stringifyDate(new Date("10-15-2020"))).toEqual("2020-10-15");
    expect(stringifyDate(new Date("2020-5-15"))).toEqual("2020-05-15");
    expect(stringifyDate(new Date("2020/5/15"))).toEqual("2020-05-15");
  });

  test("parseRangeDate", () => {
    expect(
      parseRangeDate({ start: "1999-5-15", end: "2020-8-12" }),
    ).toStrictEqual({
      start: parseDate("1999-5-15"),
      end: parseDate("2020-8-12"),
    });

    expect(
      parseRangeDate({ start: "invalid", end: "2020-8-12" }),
    ).toBeUndefined();

    expect(parseRangeDate()).toBeUndefined();
  });

  test("isInvalidDateRange", () => {
    expect(
      isInvalidDateRange(
        new Date(2020, 4, 4),
        new Date(2020, 1, 1),
        new Date(2020, 5, 5),
      ),
    ).toEqual(false);

    expect(
      isInvalidDateRange(
        new Date(2020, 8, 4),
        new Date(2020, 1, 1),
        new Date(2020, 5, 5),
      ),
    ).toEqual(true);

    expect(
      isInvalidDateRange(
        new Date(2020, 4, 4),
        new Date(2020, 5, 5),
        new Date(2020, 1, 1),
      ),
    ).toEqual(true);

    expect(
      isInvalidDateRange(
        new Date(2020, 4, 4),
        new Date(2020, 3, 3),
        new Date(2020, 4, 4),
      ),
    ).toEqual(false);
  });

  test("clampValue", () => {
    expect(clampValue(5, 1, 8)).toEqual(5);
    expect(clampValue(5, 1, 3)).toEqual(3);
    expect(clampValue(5, 6, 8)).toEqual(6);
  });

  test("valueToPercent", () => {
    expect(valueToPercent(10, 0, 100)).toEqual(10);
    expect(valueToPercent(10, 0, 50)).toEqual(20);
    expect(valueToPercent(10, 0, 1)).toEqual(1000);
    expect(valueToPercent(10, 0, 1000)).toEqual(1);
    expect(valueToPercent(0.5, 0, 100)).toEqual(0.5);
  });
});

// Error logs are not for PRO devs 😎
// we can debug without it
const oldLog = console.error;
beforeAll(() => {
  console.error = () => {};
});

afterAll(() => {
  console.error = oldLog;
});

describe("createContext", () => {
  it("should create a context", () => {
    const [Provider, useContext, Context] = createContext({
      errorMessage: "context is undefined",
      name: "Test",
    });

    const ExampleContext: React.FC = () => {
      const { count } = useContext() as any;

      return <p data-testid="val">{count}</p>;
    };

    const { getByTestId } = render(
      <Provider value={{ count: 1 }}>
        <ExampleContext />
      </Provider>,
    );

    expect(getByTestId("val")).toHaveTextContent("1");
  });

  it("should throw error if Provider not wrapped", () => {
    const [Provider, useContext, Context] = createContext({
      errorMessage: "context is undefined",
      name: "Test",
    });

    const ExampleContext: React.FC = () => {
      const { count } = useContext() as any;
      return <p data-testid="val">{count}</p>;
    };

    const spy = jest.spyOn(ErrorBoundary.prototype, "componentDidCatch");

    render(
      <ErrorBoundary>
        <ExampleContext />
      </ErrorBoundary>,
    );

    expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalled();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
