import { Calendar, DateDuration } from "@internationalized/date";
import {
  RangeCalendarState,
  useRangeCalendarState,
} from "@react-stately/calendar";
import { DateValue, RangeCalendarProps } from "@react-types/calendar";

export function useRangeCalendarBaseState(
  props: RangeCalendarBaseStateProps,
): RangeCalendarBaseState {
  const state = useRangeCalendarState(props);

  return state;
}

export type RangeCalendarBaseState = RangeCalendarState;

export type RangeCalendarBaseStateProps = RangeCalendarProps<DateValue> & {
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
};
