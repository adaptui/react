import { Matcher } from "@testing-library/react";

export const isEndSelection = (getByLabelText: any, label: Matcher) => {
  expect(getByLabelText(label).parentElement).toHaveAttribute(
    "data-is-selection-end",
  );
};

export const isStartSelection = (getByLabelText: any, label: Matcher) => {
  expect(getByLabelText(label).parentElement).toHaveAttribute(
    "data-is-selection-start",
  );
};

export const isInSelectionRange = (getByLabelText: any, label: Matcher) => {
  expect(getByLabelText(label).parentElement).toHaveAttribute(
    "data-is-range-selection",
  );
};
