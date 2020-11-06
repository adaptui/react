/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useNumberInput](https://github.com/chakra-ui/chakra-ui/blob/develop/packages/number-input/src/use-number-input.ts)
 * to work with Reakit System
 */
import {
  focus,
  minSafeInteger,
  maxSafeInteger,
  StringOrNumber,
} from "@chakra-ui/utils";
import * as React from "react";
import { useCounter } from "@chakra-ui/counter";

import { useSpinner, useSpinnerReturn } from "./helpers";

export type NumberInputState = {
  /**
   * The value of the counter. Should be less than `max` and greater than `min`
   *
   * If no value, initial value is set to `""`
   */
  value: StringOrNumber;
  /**
   * The minimum value of the counter
   *
   * @default Number.MIN_SAFE_INTEGER
   */
  min: number;
  /**
   * The maximum value of the counter
   *
   * @default Number.MAX_SAFE_INTEGER
   */
  max: number;
  /**
   * The step used to increment or decrement the value
   *
   * @default 1
   */
  step: number;
  /**
   * The number of decimal points used to round the value
   *
   * If no precision, initial value is from the decimal places from value/step - `0`
   */
  precision: number;
  /**
   * This controls the value update behavior in general.
   *
   * - If `true` and you use the stepper or up/down arrow keys,
   *  the value will not exceed the `max` or go lower than `min`
   *
   * - If `false`, the value will be allowed to go out of range.
   *
   * @default true
   */
  keepWithinRange: boolean;
  /**
   * The value of the counter in number.
   */
  valueAsNumber: number;
  /**
   * True, if value is less than `min` & greater than `max`.
   */
  isOutOfRange: boolean;
  /**
   * True, if value is equal to max.
   */
  isAtMax: boolean;
  /**
   * Truw, if value is equal to min.
   */
  isAtMin: boolean;
  /**
   * The Input Element.
   */
  inputRef: React.RefObject<HTMLElement | null>;
};

export type NumberInputAction = {
  /**
   * Set the value which will be converted to string.
   */
  setValue: (next: StringOrNumber) => void;
  /**
   * Set the casted value based on precision & step.
   */
  setCastedValue: (value: StringOrNumber) => void;
  /**
   * Increment the value based on the step
   */
  increment: (step: NumberInputState["step"]) => void;
  /**
   * Decrement the value based on the step
   */
  decrement: (step: NumberInputState["step"]) => void;
  /**
   * Reset the value back to initial value
   */
  reset: () => void;
  /**
   * Clamp value with precision
   */
  clampToPrecision: (value: number) => void;
  /**
   * Focus input if focus input on value change is `true`
   */
  focusInput: () => void;
  /**
   * Spinner handler that increments the value after an interval
   */
  spinUp: useSpinnerReturn["up"];
  /**
   * Spinner handler that decrements the value after an interval
   */
  spinDown: useSpinnerReturn["down"];
  /**
   * Spinner handler that Stop it from incrementing or decrementing
   */
  spinStop: useSpinnerReturn["stop"];
};

export type NumberinputInitialState = Pick<
  Partial<NumberInputState>,
  "value" | "keepWithinRange" | "min" | "max" | "step" | "precision"
> & {
  /**
   * The initial value of the counter. Should be less than `max` and greater than `min`
   *
   * @default ""
   */
  defaultValue?: StringOrNumber;
  /**
   * The callback fired when the value changes
   */
  onChange?(valueAsString: string, valueAsNumber: number): void;
  /**
   * If `true`, the input will be focused as you increment
   * or decrement the value with the stepper
   *
   * @default true
   */
  focusInputOnChange?: boolean;
};

export type NumberInputStateReturn = NumberInputState & NumberInputAction;

export function useNumberInputState(
  props: NumberinputInitialState = {},
): NumberInputStateReturn {
  const {
    min = minSafeInteger,
    max = maxSafeInteger,
    step: stepProp = 1,
    keepWithinRange = true,
    focusInputOnChange = true,
  } = props;

  /**
   * Leverage the `useCounter` hook since it provides
   * the functionality to `increment`, `decrement` and `update`
   * counter values
   */
  const counter = useCounter(props);

  const {
    update: setValue,
    cast: setCastedValue,
    clamp: clampToPrecision,
    ...counterProps
  } = counter;

  /**
   * Leverage the `useSpinner` hook to spin the input's value
   * when long press on the up and down buttons.
   *
   * This leverages `setInterval` internally
   */
  const spinner = useSpinner(counter.increment, counter.decrement);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = React.useCallback(() => {
    if (focusInputOnChange && inputRef.current) {
      focus(inputRef.current);
    }
  }, [focusInputOnChange]);

  return {
    min,
    max,
    step: stepProp,
    keepWithinRange,
    setValue,
    setCastedValue,
    clampToPrecision,
    ...counterProps,
    inputRef,
    focusInput,
    spinUp: spinner.up,
    spinDown: spinner.down,
    spinStop: spinner.stop,
  };
}
