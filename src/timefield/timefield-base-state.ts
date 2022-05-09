import { DateFieldState, useTimeFieldState } from "@react-stately/datepicker";
import { TimePickerProps, TimeValue } from "@react-types/datepicker";

export function useTimeFieldBaseState(
  props: TimeFieldBaseStateProps,
): TimeFieldBaseState {
  const state = useTimeFieldState(props);

  return state;
}

export type TimeFieldBaseState = DateFieldState & {};

export type TimeFieldBaseStateProps = TimePickerProps<TimeValue> & {
  /** The locale to display and edit the value according to. */
  locale: string;
};
