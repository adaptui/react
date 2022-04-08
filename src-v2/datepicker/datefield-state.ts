import { HTMLAttributes, RefObject, useRef } from "react";
import { DateValue } from "@internationalized/date";
import { useDateField } from "@react-aria/datepicker";
import { AriaDatePickerProps } from "@react-types/datepicker";

import { DateFieldBaseState } from "./datefield-base-state";

export function useDateFieldState({
  state,
  ...props
}: DateFieldStateProps): DateFieldState {
  const ref = useRef<HTMLElement>(null);
  const datefield = useDateField(props, state, ref);

  return { ...datefield, ref };
}

export type DateFieldState = {
  /** Props for the field's visible label element, if any. */
  labelProps: HTMLAttributes<HTMLElement>;
  /** Props for the field grouping element. */
  fieldProps: HTMLAttributes<HTMLElement>;
  /** Props for the description element, if any. */
  descriptionProps: HTMLAttributes<HTMLElement>;
  /** Props for the error message element, if any. */
  errorMessageProps: HTMLAttributes<HTMLElement>;
  /**
   * Reference for the date picker's visible label element, if any.
   */
  ref: RefObject<HTMLElement>;
};

export type DateFieldStateProps = Omit<
  AriaDatePickerProps<DateValue>,
  | "value"
  | "defaultValue"
  | "onChange"
  | "minValue"
  | "maxValue"
  | "placeholderValue"
> & {
  /**
   * Object returned by the `useDateFieldBaseState` hook.
   */
  state: DateFieldBaseState;
};
