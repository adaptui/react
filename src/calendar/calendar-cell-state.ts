import { RefObject, useRef } from "react";
import { CalendarDate } from "@internationalized/date";
import {
  AriaCalendarCellProps,
  CalendarCellAria,
  useCalendarCell,
} from "@react-aria/calendar";

import { RangeCalendarBaseState } from "../range-calendar";

import { CalendarBaseState } from "./calendar-base-state";

export function useCalendarCellState({
  state,
  ...props
}: CalendarCellStateProps): CalendarCellState {
  const ref = useRef<HTMLElement>(null);
  const calendarCellProps = useCalendarCell(props, state, ref);

  return { ...calendarCellProps, ref, baseState: state, date: props.date };
}

export type CalendarCellState = CalendarCellAria & {
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

export type CalendarCellStateProps = AriaCalendarCellProps & {
  /**
   * Object returned by the `useCalendarBaseState` | `RangeCalendarBaseState` hook.
   */
  state: CalendarBaseState | RangeCalendarBaseState;
};
