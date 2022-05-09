import { RefObject, useRef } from "react";
import { DateValue } from "@internationalized/date";
import { DatePickerAria, useDatePicker } from "@react-aria/datepicker";
import { AriaDatePickerProps } from "@react-types/datepicker";

import { DatePickerBaseState } from "./timepicker-base-state";

export function useDatePickerState({
  state,
  ...props
}: DatePickerStateProps): DatePickerState {
  const ref = useRef<HTMLElement>(null);
  const datepicker = useDatePicker(props, state.datepicker, ref);

  return { ...datepicker, ref, baseState: state };
}

export type DatePickerState = DatePickerAria & {
  /**
   * Reference for the date picker's visible label element, if any.
   */
  ref: RefObject<HTMLElement>;
  /**
   * Object returned by the `useDatePickerBaseState` hook.
   */
  baseState: DatePickerBaseState;
};

export type DatePickerStateProps = AriaDatePickerProps<DateValue> & {
  /**
   * Object returned by the `useDatePickerBaseState` hook.
   */
  state: DatePickerBaseState;
};
