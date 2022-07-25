import { RefObject, useRef } from "react";
import { DateValue } from "@internationalized/date";
import { DatePickerAria, useDatePicker } from "@react-aria/datepicker";
import { AriaDatePickerProps } from "@react-types/datepicker";

import { DatePickerBaseState } from "./datepicker-base-state";

export function useDatePickerState<T extends DateValue>({
  state,
  ...props
}: DatePickerStateProps<T>): DatePickerState {
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

export type DatePickerStateProps<T extends DateValue> =
  AriaDatePickerProps<T> & {
    /**
     * Object returned by the `useDatePickerBaseState` hook.
     */
    state: DatePickerBaseState;
  };
