import { RefObject, useRef } from "react";
import { CalendarAria, useRangeCalendar } from "@react-aria/calendar";
import { DateValue, RangeCalendarProps } from "@react-types/calendar";

import { RangeCalendarBaseState } from "./range-calendar-base-state";

export function useRangeCalendarState<T extends DateValue>({
  state,
  ...props
}: RangeCalendarStateProps<T>): RangeCalendarState {
  const ref = useRef<HTMLElement>(null);
  const calendarProps = useRangeCalendar(props, state, ref);

  return { ...calendarProps, ref };
}

export type RangeCalendarState = CalendarAria & {
  /**
   * Reference for the calendar wrapper element within the cell inside the table
   */
  ref: RefObject<HTMLElement>;
};

export type RangeCalendarStateProps<T extends DateValue> =
  RangeCalendarProps<T> & {
    /**
     * Object returned by the `useRangeCalendarBaseState` hook.
     */
    state: RangeCalendarBaseState;
  };
