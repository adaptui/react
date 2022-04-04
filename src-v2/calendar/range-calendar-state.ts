import { HTMLAttributes, RefObject, useRef } from "react";
import { useRangeCalendar } from "@react-aria/calendar";
import { AriaButtonProps } from "@react-types/button";
import { DateValue, RangeCalendarProps } from "@react-types/calendar";

import { RangeCalendarBaseState } from "./range-calendar-base-state";

export function useRangeCalendarState({
  state,
  ...props
}: RangeCalendarStateProps): RangeCalendarState {
  const ref = useRef<HTMLElement>(null);
  const calendarProps = useRangeCalendar(props, state, ref);

  return { ...calendarProps, ref };
}

export type RangeCalendarState = {
  /** Props for the calendar grouping element. */
  calendarProps: HTMLAttributes<HTMLElement>;
  /** Props for the next button. */
  nextButtonProps: AriaButtonProps;
  /** Props for the previous button. */
  prevButtonProps: AriaButtonProps;
  /** A description of the visible date range, for use in the calendar title. */
  title: string;
  /**
   * Reference for the calendar wrapper element within the cell inside the table
   */
  ref: RefObject<HTMLElement>;
};

export type RangeCalendarStateProps = RangeCalendarProps<DateValue> & {
  /**
   * Object returned by the `useSliderState` hook.
   */
  state: RangeCalendarBaseState;
};
