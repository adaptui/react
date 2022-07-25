import { RefObject, useRef } from "react";
import { DateValue } from "@internationalized/date";
import {
  AriaDateFieldProps,
  DateFieldAria,
  useDateField,
} from "@react-aria/datepicker";

import { DateFieldBaseState } from "./datefield-base-state";

export function useDateFieldState<T extends DateValue>({
  state,
  ...props
}: DateFieldStateProps<T>): DateFieldState {
  const ref = useRef<HTMLElement>(null);
  const datefield = useDateField(props, state, ref);

  return { ...datefield, ref };
}

export type DateFieldState = DateFieldAria & {
  /**
   * Reference for the date picker's visible label element, if any.
   */
  ref: RefObject<HTMLElement>;
};

export type DateFieldStateProps<T extends DateValue> = AriaDateFieldProps<T> & {
  /**
   * Object returned by the `useDateFieldBaseState` hook.
   */
  state: DateFieldBaseState;
};
