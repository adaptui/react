import { HTMLAttributes, RefObject, useRef } from "react";
import { DateValue } from "@internationalized/date";
import { useDatePicker } from "@react-aria/datepicker";
import { AriaButtonProps } from "@react-types/button";
import { CalendarProps } from "@react-types/calendar";
import { AriaDatePickerProps } from "@react-types/datepicker";
import { AriaDialogProps } from "@react-types/dialog";

import { DatePickerBaseState } from "./datepicker-base-state";

export function useDatePickerState({
  state,
  ...props
}: DatePickerStateProps): DatePickerState {
  const ref = useRef<HTMLElement>(null);
  const datepicker = useDatePicker(props, state, ref);

  return { ...datepicker, ref };
}

export type DatePickerState = {
  /** Props for the date picker's visible label element, if any. */
  labelProps: HTMLAttributes<HTMLElement>;
  /** Props for the grouping element containing the date field and button. */
  groupProps: HTMLAttributes<HTMLElement>;
  /** Props for the date field. */
  fieldProps: AriaDatePickerProps<DateValue>;
  /** Props for the popover trigger button. */
  buttonProps: AriaButtonProps;
  /** Props for the description element, if any. */
  descriptionProps: HTMLAttributes<HTMLElement>;
  /** Props for the error message element, if any. */
  errorMessageProps: HTMLAttributes<HTMLElement>;
  /** Props for the popover dialog. */
  dialogProps: AriaDialogProps;
  /** Props for the calendar within the popover dialog. */
  calendarProps: CalendarProps<DateValue>;
  /**
   * Reference for the date picker's visible label element, if any.
   */
  ref: RefObject<HTMLElement>;
};

export type DatePickerStateProps = AriaDatePickerProps<DateValue> & {
  /**
   * Object returned by the `useDatePickerBaseState` hook.
   */
  state: DatePickerBaseState;
};
