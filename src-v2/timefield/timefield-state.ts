import { RefObject, useRef } from "react";
import { DateFieldAria, useTimeField } from "@react-aria/datepicker";
import { AriaTimeFieldProps, TimeValue } from "@react-types/datepicker";

import { TimeFieldBaseState } from "./timefield-base-state";

export function useTimeFieldState({
  state,
  ...props
}: TimeFieldStateProps): TimeFieldState {
  const ref = useRef<HTMLElement>(null);
  const timefield = useTimeField(props, state, ref);

  return { ...timefield, ref };
}

export type TimeFieldState = DateFieldAria & {
  /**
   * Reference for the date picker's visible label element, if any.
   */
  ref: RefObject<HTMLElement>;
};

export type TimeFieldStateProps = AriaTimeFieldProps<TimeValue> & {
  /**
   * Object returned by the `useTimeFieldBaseState` hook.
   */
  state: TimeFieldBaseState;
};
