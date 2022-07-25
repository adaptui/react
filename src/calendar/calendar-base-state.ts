import {
  CalendarState,
  CalendarStateOptions as CalendarStateProps,
  useCalendarState,
} from "@react-stately/calendar";

export function useCalendarBaseState(
  props: CalendarBaseStateProps,
): CalendarBaseState {
  const state = useCalendarState(props);

  return state;
}

export type CalendarBaseState = CalendarState & {};

export type CalendarBaseStateProps = CalendarStateProps & {};
