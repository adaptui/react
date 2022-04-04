import { Calendar, CalendarDate, DateDuration } from "@internationalized/date";
import {
  CalendarStateBase,
  useRangeCalendarState,
} from "@react-stately/calendar";
import { DateValue, RangeCalendarProps } from "@react-types/calendar";
import { RangeValue } from "@react-types/shared";

export function useRangeCalendarBaseState(
  props: RangeCalendarBaseStateProps,
): RangeCalendarBaseState {
  const state = useRangeCalendarState(props);

  return state;
}

export type RangeCalendarBaseState = CalendarStateBase & {
  /** The currently selected date range. */
  readonly value: RangeValue<DateValue>;
  /** Sets the currently selected date range. */
  setValue(value: RangeValue<DateValue>): void;
  /** Highlights the given date during selection, e.g. by hovering or dragging. */
  highlightDate(date: CalendarDate): void;
  /** The current anchor date that the user clicked on to begin range selection. */
  readonly anchorDate: CalendarDate | null;
  /** Sets the anchor date that the user clicked on to begin range selection. */
  setAnchorDate(date: CalendarDate | null): void;
  /** The currently highlighted date range. */
  readonly highlightedRange: RangeValue<CalendarDate>;
  /** Whether the user is currently dragging over the calendar. */
  readonly isDragging: boolean;
  /** Sets whether the user is dragging over the calendar. */
  setDragging(isDragging: boolean): void;
};

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
