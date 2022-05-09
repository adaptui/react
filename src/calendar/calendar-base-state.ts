import { Calendar, DateDuration } from "@internationalized/date";
import { CalendarState, useCalendarState } from "@react-stately/calendar";
import { CalendarProps, DateValue } from "@react-types/calendar";

export function useCalendarBaseState(
  props: CalendarBaseStateProps,
): CalendarBaseState {
  const state = useCalendarState(props);

  return state;
}

export type CalendarBaseState = CalendarState;

export type CalendarBaseStateProps = CalendarProps<DateValue> & {
  /** The locale to display and edit the value according to. */
  locale: string;
  /**
   * A function that creates a [Calendar](../internationalized/date/Calendar.html)
   * object for a given calendar identifier. Such a function may be imported from the
   * `@internationalized/date` package, or manually implemented to include support for
   * only certain calendars.
   */
  createCalendar: (name: string) => Calendar;
  /**
   * The amount of days that will be displayed at once. This affects how pagination works.
   * @default {months: 1}
   */
  visibleDuration?: DateDuration;
  /** Determines how to align the initial selection relative to the visible date range. */
  selectionAlignment?: "start" | "center" | "end";
};
