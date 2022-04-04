import { HTMLAttributes, RefObject, useRef } from "react";
import { CalendarDate } from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";

import { CalendarBaseState } from "./calendar-base-state";
import { RangeCalendarBaseState } from "./range-calendar-base-state";

export function useCalendarCellState({
  state,
  ...props
}: CalendarCellStateProps): CalendarCellState {
  const ref = useRef<HTMLElement>(null);
  const calendarCellProps = useCalendarCell(props, state, ref);

  return { ...calendarCellProps, ref, baseState: state, date: props.date };
}

export type CalendarCellState = {
  /** Props for the grid cell element (e.g. `<td>`). */
  cellProps: HTMLAttributes<HTMLElement>;
  /** Props for the button element within the cell. */
  buttonProps: HTMLAttributes<HTMLElement>;
  /** Whether the cell is currently being pressed. */
  isPressed: boolean;
  /** Whether the cell is selected. */
  isSelected: boolean;
  /** Whether the cell is focused. */
  isFocused: boolean;
  /**
   * Whether the cell is disabled, according to the calendar's `minValue`, `maxValue`, and `isDisabled` props.
   * Disabled dates are not focusable, and cannot be selected by the user. They are typically
   * displayed with a dimmed appearance.
   */
  isDisabled: boolean;
  /**
   * Whether the cell is unavailable, according to the calendar's `isDateUnavailable` prop. Unavailable dates remain
   * focusable, but cannot be selected by the user. They should be displayed with a visual affordance to indicate they
   * are unavailable, such as a different color or a strikethrough.
   *
   * Note that because they are focusable, unavailable dates must meet a 4.5:1 color contrast ratio,
   * [as defined by WCAG](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).
   */
  isUnavailable: boolean;
  /**
   * Whether the cell is outside the visible range of the calendar.
   * For example, dates before the first day of a month in the same week.
   */
  isOutsideVisibleRange: boolean;
  /** The day number formatted according to the current locale. */
  formattedDate: string;
  /**
   * Reference for the button element within the cell inside the table
   */
  ref: RefObject<HTMLElement>;
  /**
   * Object returned by the `useSliderState` hook.
   */
  baseState: CalendarBaseState | RangeCalendarBaseState;
  /** The date that this cell represents. */
  date: CalendarDate;
};

export type CalendarCellStateProps = {
  /** The date that this cell represents. */
  date: CalendarDate;
  /**
   * Whether the cell is disabled. By default, this is determined by the
   * Calendar's `minValue`, `maxValue`, and `isDisabled` props.
   */
  isDisabled?: boolean;
  /**
   * Object returned by the `useSliderState` hook.
   */
  state: CalendarBaseState | RangeCalendarBaseState;
};
