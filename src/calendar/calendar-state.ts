import { CalendarAria, useCalendar } from "@react-aria/calendar";
import { CalendarProps, DateValue } from "@react-types/calendar";

import { CalendarBaseState } from "./calendar-base-state";

export function useCalendarState<T extends DateValue>({
  state,
  ...props
}: CalendarStateProps<T>): CalendarState {
  const calendarProps = useCalendar(props, state);

  return calendarProps;
}

export type CalendarState = CalendarAria & {};

export type CalendarStateProps<T extends DateValue> = CalendarProps<T> & {
  /**
   * Object returned by the `useCalendarBaseState` hook.
   */
  state: CalendarBaseState;
};
