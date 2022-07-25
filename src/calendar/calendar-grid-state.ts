import {
  AriaCalendarGridProps,
  CalendarGridAria,
  useCalendarGrid,
} from "@react-aria/calendar";

import { RangeCalendarBaseState } from "../range-calendar";

import { CalendarBaseState } from "./calendar-base-state";

export function useCalendarGridState({
  state,
  ...props
}: CalendarGridStateProps): CalendarGridState {
  const calendarGridProps = useCalendarGrid(props, state);

  return calendarGridProps;
}

export type CalendarGridState = CalendarGridAria;

export type CalendarGridStateProps = AriaCalendarGridProps & {
  /**
   * Object returned by the `useCalendarBaseState` & `RangeCalendarBaseState` hook.
   */
  state: CalendarBaseState | RangeCalendarBaseState;
};
