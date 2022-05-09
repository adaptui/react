import { HTMLAttributes } from "react";
import { useCalendar } from "@react-aria/calendar";
import { AriaButtonProps } from "@react-types/button";
import { CalendarProps, DateValue } from "@react-types/calendar";

import { CalendarBaseState } from "./calendar-base-state";

export function useCalendarState({
  state,
  ...props
}: CalendarStateProps): CalendarState {
  const calendarProps = useCalendar(props, state);

  return calendarProps;
}

export type CalendarState = {
  /** Props for the calendar grouping element. */
  calendarProps: HTMLAttributes<HTMLElement>;
  /** Props for the next button. */
  nextButtonProps: AriaButtonProps;
  /** Props for the previous button. */
  prevButtonProps: AriaButtonProps;
  /** A description of the visible date range, for use in the calendar title. */
  title: string;
};

export type CalendarStateProps = CalendarProps<DateValue> & {
  /**
   * Object returned by the `useSliderState` hook.
   */
  state: CalendarBaseState;
};
