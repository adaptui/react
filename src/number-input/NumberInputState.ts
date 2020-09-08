/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useNumberInput](https://github.com/chakra-ui/chakra-ui/blob/develop/packages/number-input/src/use-number-input.ts)
 * to work with Reakit System
 */
import { useCallback, useRef } from "react";
import { useBoolean } from "@chakra-ui/hooks";
import { useCounter, UseCounterProps } from "@chakra-ui/counter";
import { focus, minSafeInteger, maxSafeInteger } from "@chakra-ui/utils";

import { useSpinner } from "./__utils";

export interface UseNumberInputProps extends UseCounterProps {
  /**
   * If `true`, the input will be focused as you increment
   * or decrement the value with the stepper
   *
   * @default true
   */
  focusInputOnChange?: boolean;
  /**
   * This controls the value update when you blur out of the input.
   * - If `true` and the value is greater than `max`, the value will be reset to `max`
   * - Else, the value remains the same.
   *
   * @default true
   */
  clampValueOnBlur?: boolean;
  /**
   * If `true`, the number input will be in readonly mode
   */
  isReadOnly?: boolean;
  /**
   * If `true`, the number input will be disabled
   */
  isDisabled?: boolean;
}

export function useNumberInputState(props: UseNumberInputProps = {}) {
  const {
    focusInputOnChange = true,
    clampValueOnBlur = true,
    keepWithinRange = true,
    min = minSafeInteger,
    max = maxSafeInteger,
    step: stepProp = 1,
    isReadOnly,
    isDisabled,
  } = props;

  /**
   * Leverage the `useCounter` hook since it provides
   * the functionality to `increment`, `decrement` and `update`
   * counter values
   */
  const counter = useCounter(props);
  const {
    increment: incrementFn,
    decrement: decrementFn,
    isAtMax,
    isAtMin,
    ...counterProp
  } = counter;

  const inputRef = useRef<HTMLInputElement>(null);

  const isInteractive = !(isReadOnly || isDisabled);

  const increment = useCallback(
    (step = stepProp) => {
      if (isInteractive) {
        incrementFn(step);
      }
    },
    [incrementFn, isInteractive, stepProp],
  );

  const decrement = useCallback(
    (step = stepProp) => {
      if (isInteractive) {
        decrementFn(step);
      }
    },
    [decrementFn, isInteractive, stepProp],
  );

  /**
   * Leverage the `useSpinner` hook to spin the input's value
   * when long press on the up and down buttons.
   *
   * This leverages `setInterval` internally
   */
  const spinner = useSpinner(increment, decrement);

  const focusInput = useCallback(() => {
    if (focusInputOnChange && inputRef.current) {
      focus(inputRef.current);
    }
  }, [focusInputOnChange]);

  /**
   * Keep track of the focused state of the input,
   * so user can this to change the styles of the
   * `spinners`, maybe :)
   */
  const [isFocused, setFocused] = useBoolean();

  return {
    keepWithinRange,
    clampValueOnBlur,
    min,
    max,
    step: stepProp,
    isReadOnly,
    isDisabled,
    isInteractive,
    inputRef,
    focusInput,
    isFocused,
    setFocused,
    increment,
    decrement,
    isAtMin,
    isAtMax,
    ...counterProp,
    spinner,
  };
}

export type NumberInputStateReturn = ReturnType<typeof useNumberInputState>;
