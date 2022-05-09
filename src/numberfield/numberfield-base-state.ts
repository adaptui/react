import {
  NumberFieldState,
  NumberFieldStateProps,
  useNumberFieldState,
} from "@react-stately/numberfield";

export function useNumberFieldBaseState(
  props: NumberFieldBaseStateProps,
): NumberFieldBaseState {
  const state = useNumberFieldState(props);

  return state;
}

export type NumberFieldBaseState = NumberFieldState & {};

export type NumberFieldBaseStateProps = NumberFieldStateProps & {};
