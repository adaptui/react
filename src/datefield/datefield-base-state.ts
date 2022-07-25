import {
  DateFieldState,
  DateFieldStateOptions as DateFieldStateProps,
  useDateFieldState,
} from "@react-stately/datepicker";

export function useDateFieldBaseState(
  props: DateFieldBaseStateProps,
): DateFieldBaseState {
  const state = useDateFieldState(props);

  return state;
}

export type DateFieldBaseState = DateFieldState & {};

export type DateFieldBaseStateProps = DateFieldStateProps & {};
