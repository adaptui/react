import { Calendar } from "@internationalized/date";
import { DateFieldState, useDateFieldState } from "@react-stately/datepicker";
import {
  DatePickerProps,
  DateValue,
  Granularity,
} from "@react-types/datepicker";

export function useDateFieldBaseState(
  props: DateFieldBaseStateProps,
): DateFieldBaseState {
  const state = useDateFieldState(props);

  return state;
}

export type DateFieldBaseState = DateFieldState & {};

export type DateFieldBaseStateProps = DatePickerProps<DateValue> & {
  /**
   * The maximum unit to display in the date field.
   * @default 'year'
   */
  maxGranularity?: "year" | "month" | Granularity;
  /** The locale to display and edit the value according to. */
  locale: string;
  /**
   * A function that creates a [Calendar](../internationalized/date/Calendar.html)
   * object for a given calendar identifier. Such a function may be imported from the
   * `@internationalized/date` package, or manually implemented to include support for
   * only certain calendars.
   */
  createCalendar: (name: string) => Calendar;
};
