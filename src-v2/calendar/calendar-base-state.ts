import { Calendar, CalendarDate, DateDuration } from "@internationalized/date";
import { useCalendarState } from "@react-stately/calendar";
import { CalendarProps, DateValue } from "@react-types/calendar";
import { RangeValue } from "@react-types/shared";

export function useCalendarBaseState(
  props: CalendarBaseStateProps,
): CalendarBaseState {
  const state = useCalendarState(props);

  return state;
}

export type CalendarStateBase = {
  /** Whether the calendar is disabled. */
  readonly isDisabled: boolean;
  /** Whether the calendar is in a read only state. */
  readonly isReadOnly: boolean;
  /** The date range that is currently visible in the calendar. */
  readonly visibleRange: RangeValue<CalendarDate>;
  /** The time zone of the dates currently being displayed. */
  readonly timeZone: string;
  /** The currently focused date. */
  readonly focusedDate: CalendarDate;
  /** Sets the focused date. */
  setFocusedDate(value: CalendarDate): void;
  /** Moves focus to the next calendar date. */
  focusNextDay(): void;
  /** Moves focus to the previous calendar date. */
  focusPreviousDay(): void;
  /** Moves focus to the next row of dates, e.g. the next week. */
  focusNextRow(): void;
  /** Moves focus to the previous row of dates, e.g. the previous work. */
  focusPreviousRow(): void;
  /** Moves focus to the next page of dates, e.g. the next month if one month is visible. */
  focusNextPage(): void;
  /** Moves focus to the previous page of dates, e.g. the previous month if one month is visible. */
  focusPreviousPage(): void;
  /** Moves focus to the start of the current page of dates, e.g. the start of the first visible month. */
  focusPageStart(): void;
  /** Moves focus to the end of the current page of dates, e.g. the end of the last visible month. */
  focusPageEnd(): void;
  /**
   * Moves focus to the next larger section of dates based on what is currently displayed.
   * If days are displayed, then moves to the next visible range. If weeks are displayed, then
   * moves to the next month. If months or years are displayed, moves to the next year.
   */
  focusNextSection(): void;
  /**
   * Moves focus to the previous larger section of dates based on what is currently displayed.
   * If days are displayed, then moves to the previous visible range. If weeks are displayed, then
   * moves to the previous month. If months or years are displayed, moves to the previous year.
   */
  focusPreviousSection(): void;
  /** Selects the currently focused date. */
  selectFocusedDate(): void;
  /** Selects the given date. */
  selectDate(date: CalendarDate): void;
  /** Whether focus is currently within the calendar. */
  readonly isFocused: boolean;
  /** Sets whether focus is currently within the calendar. */
  setFocused(value: boolean): void;
  /** Returns whether the given date is invalid according to the `minValue` and `maxValue` props. */
  isInvalid(date: CalendarDate): boolean;
  /** Returns whether the given date is currently selected. */
  isSelected(date: CalendarDate): boolean;
  /** Returns whether the given date is currently focused. */
  isCellFocused(date: CalendarDate): boolean;
  /** Returns whether the given date is disabled according to the `minValue, `maxValue`, and `isDisabled` props. */
  isCellDisabled(date: CalendarDate): boolean;
  /** Returns whether the given date is unavailable according to the `isDateUnavailable` prop. */
  isCellUnavailable(date: CalendarDate): boolean;
  /** Returns whether the previous visible date range is allowed to be selected according to the `minValue` prop. */
  isPreviousVisibleRangeInvalid(): boolean;
  /** Returns whether the next visible date range is allowed to be selected according to the `maxValue` prop. */
  isNextVisibleRangeInvalid(): boolean;
};

export type CalendarBaseState = CalendarStateBase & {
  /** The currently selected date. */
  readonly value: CalendarDate;
  /** Sets the currently selected date. */
  setValue(value: CalendarDate): void;
};

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
