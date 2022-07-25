import { RefObject, useRef } from "react";
import { DateValue } from "@internationalized/date";
import {
  DateRangePickerAria,
  useDateRangePicker,
} from "@react-aria/datepicker";
import { AriaDateRangePickerProps } from "@react-types/datepicker";

import { DateRangePickerBaseState } from "./daterangepicker-base-state";

export function useDateRangePickerState<T extends DateValue>({
  state,
  ...props
}: DateRangePickerStateProps<T>): DateRangePickerState {
  const ref = useRef<HTMLElement>(null);
  const datepicker = useDateRangePicker(props, state.datepicker, ref);

  return { ...datepicker, ref, baseState: state };
}

export type DateRangePickerState = DateRangePickerAria & {
  /**
   * Reference for the date picker's visible label element, if any.
   */
  ref: RefObject<HTMLElement>;
  /**
   * Object returned by the `useDateRangePickerBaseState` hook.
   */
  baseState: DateRangePickerBaseState;
};

export type DateRangePickerStateProps<T extends DateValue> =
  AriaDateRangePickerProps<T> & {
    /**
     * Object returned by the `useDateRangePickerBaseState` hook.
     */
    state: DateRangePickerBaseState;
  };
