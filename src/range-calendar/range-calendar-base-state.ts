import {
  RangeCalendarState,
  RangeCalendarStateOptions as RangeCalendarStateProps,
  useRangeCalendarState,
} from "@react-stately/calendar";

export function useRangeCalendarBaseState(
  props: RangeCalendarBaseStateProps,
): RangeCalendarBaseState {
  const state = useRangeCalendarState(props);

  return state;
}

export type RangeCalendarBaseState = RangeCalendarState & {};

export type RangeCalendarBaseStateProps = RangeCalendarStateProps & {};
