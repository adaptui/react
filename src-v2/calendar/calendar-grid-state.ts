import { HTMLAttributes } from "react";
import { CalendarDate } from "@internationalized/date";
import { useCalendarGrid } from "@react-aria/calendar";

import { CalendarBaseState } from "./calendar-base-state";
import { RangeCalendarBaseState } from "./range-calendar-base-state";

export function useCalendarGridState({
  state,
  ...props
}: CalendarGridStateProps): CalendarGridState {
  const calendarGridProps = useCalendarGrid(props, state);

  return calendarGridProps;
}

interface WeekDay {
  /** A short name (e.g. single letter) for the day. */
  narrow: string;
  /** The full day name. If not displayed visually, it should be used as the accessiblity name. */
  long: string;
}

export type CalendarGridState = {
  /** Props for the date grid element (e.g. `<table>`). */
  gridProps: HTMLAttributes<HTMLElement>;
  /** A list of week days formatted for the current locale, typically used in column headers. */
  weekDays: WeekDay[];
};

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
