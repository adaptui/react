/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useNumberInput](https://github.com/chakra-ui/chakra-ui/blob/develop/packages/number-input/src/use-number-input.ts)
 * to work with Reakit System
 */
import {
  minSafeInteger,
  maxSafeInteger,
  focus,
  toPrecision,
  StringOrNumber,
  clampValue,
} from "@chakra-ui/utils";
import * as React from "react";
import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";

import {
  castValue,
  getDecimalPlaces,
  parseValue,
  useSpinner,
  useSpinnerReturn,
} from "./helpers";

export type NumberInputState = {
  /**
   * The value of the counter. Should be less than `max` and greater than `min`
   */
  value: StringOrNumber;
  /**
   * The minimum value of the counter
   * @default -Infinity
   */
  min: number;
  /**
   * The maximum value of the counter
   * @default Infinity
   */
  max: number;
  /**
   * The step used to increment or decrement the value
   * @default 1
   */
  step: number;
  /**
   * The number of decimal points used to round the value
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
   * If `true`, the input will be focused as you increment
   * or decrement the value with the stepper
   *
   * @default true
   */
  focusInputOnChange?: boolean;
};

export type NumberInputStateReturn = NumberInputState & NumberInputAction;

export function useNumberInputState(
  initialState: SealedInitialState<NumberinputInitialState> = {},
): NumberInputStateReturn {
  const {
    value: initialValue,
    min = minSafeInteger,
    max = maxSafeInteger,
    step: stepProp = 1,
    precision: precisionProp,
    keepWithinRange = true,
    focusInputOnChange = true,
  } = useSealedState(initialState);

  const [value, setValueProp] = React.useState<StringOrNumber>(() => {
    if (initialValue == null) return "";
    return castValue(initialValue, stepProp, precisionProp);
  });

  /**
   * Common range checks
   */
  const valueAsNumber = parseValue(value);
  const isOutOfRange = valueAsNumber > max || valueAsNumber < min;
  const isAtMax = valueAsNumber === max;
  const isAtMin = valueAsNumber === min;
  const decimalPlaces = getDecimalPlaces(parseValue(value), stepProp);
  const precision = precisionProp ?? decimalPlaces;

  const setValue = React.useCallback((next: StringOrNumber) => {
    setValueProp(next.toString());
  }, []);

  const setCastedValue = React.useCallback(
    (value: StringOrNumber) => {
      setValue(castValue(value, stepProp, precision));
    },
    [precision, stepProp, setValue],
  );

  // Function to clamp the value and round it to the precision
  const clampToPrecision = React.useCallback(
    (value: number) => {
      let nextValue = value;

      if (keepWithinRange) {
        nextValue = clampValue(nextValue, min, max);
      }

      return toPrecision(nextValue, precision);
    },
    [precision, keepWithinRange, max, min],
  );

  const increment = React.useCallback(
    (step = stepProp) => {
      let next: StringOrNumber;

      /**
       * Let's follow the native browser behavior for
       * scenarios where the input starts empty ("")
       */
      if (value === "") {
        /**
         * If `min` is set, native input, starts at the `min`.
         * Else, it starts at `step`
         */
        next = parseValue(step);
      } else {
        next = parseValue(value) + step;
      }

      next = clampToPrecision(next as number);
      setValue(next);
    },
    [clampToPrecision, stepProp, setValue, value],
  );

  const decrement = React.useCallback(
    (step = stepProp) => {
      let next: StringOrNumber;

      // Same thing here. We'll follow native implementation
      if (value === "") {
        next = parseValue(-step);
      } else {
        next = parseValue(value) - step;
      }

      next = clampToPrecision(next as number);
      setValue(next);
    },
    [clampToPrecision, stepProp, setValue, value],
  );

  const reset = React.useCallback(() => {
    let next: StringOrNumber;
    if (initialValue == null) {
      next = "";
    } else {
      next = castValue(initialValue, stepProp, precisionProp);
    }
    setValue(next);
  }, [initialValue, precisionProp, stepProp, setValue]);

  /**
   * Leverage the `useSpinner` hook to spin the input's value
   * when long press on the up and down buttons.
   *
   * This leverages `setInterval` internally
   */
  const spinner = useSpinner(increment, decrement);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = React.useCallback(() => {
    if (focusInputOnChange && inputRef.current) {
      focus(inputRef.current);
    }
  }, [focusInputOnChange]);

  return {
    value,
    min,
    max,
    step: stepProp,
    precision,
    keepWithinRange,
    valueAsNumber,
    isOutOfRange,
    isAtMax,
    isAtMin,
    setValue,
    setCastedValue,
    increment,
    decrement,
    reset,
    clampToPrecision,
    inputRef,
    focusInput,
    spinUp: spinner.up,
    spinDown: spinner.down,
    spinStop: spinner.stop,
  };
}
