import {
  DateFieldState,
  TimeFieldStateOptions,
  useTimeFieldState,
} from "@react-stately/datepicker";

export function useTimeFieldBaseState(
  props: TimeFieldBaseStateProps,
): TimeFieldBaseState {
  const state = useTimeFieldState(props);

  return state;
}

export type TimeFieldBaseState = DateFieldState & {};

export type TimeFieldBaseStateProps = TimeFieldStateOptions & {};
