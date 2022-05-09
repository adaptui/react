import { RefObject, useRef } from "react";
import { NumberFieldAria, useNumberField } from "@react-aria/numberfield";
import { AriaNumberFieldProps } from "@react-types/numberfield";

import { NumberFieldBaseState } from "./numberfield-base-state";

export function useNumberFieldState(
  props: NumberFieldStateProps,
): NumberFieldState {
  const { state: baseState, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const state = useNumberField(rest, baseState, inputRef);

  return { ...state, baseState, inputRef };
}

export type NumberFieldState = NumberFieldAria & {
  /**
   * Reference for the input element in number field element, if any.
   */
  inputRef: RefObject<HTMLElement>;
  /**
   * Object returned by the `useNumberFieldBaseState` hook.
   */
  baseState: NumberFieldBaseState;
};

export type NumberFieldStateProps = AriaNumberFieldProps & {
  /**
   * Object returned by the `useNumberFieldBaseState` hook.
   */
  state: NumberFieldBaseState;
};
