import { CalendarDate } from "@internationalized/date";
import { CalendarGridAria, useCalendarGrid } from "@react-aria/calendar";

import { CalendarBaseState } from "./calendar-base-state";
import { RangeCalendarBaseState } from "./range-calendar-base-state";

export function useCalendarGridState({
  state,
  ...props
}: CalendarGridStateProps): CalendarGridState {
  const calendarGridProps = useCalendarGrid(props, state);

  return calendarGridProps;
}

export type CalendarGridState = CalendarGridAria;

export type CalendarGridStateProps = {
  /**
   * The first date displayed in the calendar grid.
   * Defaults to the first visible date in the calendar.
   * Override this to display multiple date grids in a calendar.
   */
  startDate?: CalendarDate;
  /**
   * The last date displayed in the calendar grid.
   * Defaults to the last visible date in the calendar.
   * Override this to display multiple date grids in a calendar.
   */
  endDate?: CalendarDate;
  /**
   * Object returned by the `useSliderState` hook.
   */
  state: CalendarBaseState | RangeCalendarBaseState;
};
