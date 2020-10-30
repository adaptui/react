/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useNumberInput](https://github.com/chakra-ui/chakra-ui/blob/develop/packages/number-input/src/use-number-input.ts)
 * to work with Reakit System
 */
import * as React from "react";
import {
  minSafeInteger,
  maxSafeInteger,
  focus,
  toPrecision,
  StringOrNumber,
  countDecimalPlaces,
  clampValue,
} from "@chakra-ui/utils";
import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";

import { useSpinner, useSpinnerReturn } from "./helpers";
import { useControllableProp } from "@chakra-ui/hooks";

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

  valueAsNumber: number;
  isOutOfRange: boolean;
  isAtMax: boolean;
  isAtMin: boolean;
  inputRef: React.RefObject<HTMLElement | null>;
};

export type NumberInputAction = {
  setValue: (next: StringOrNumber) => void;
  increment: (step: NumberInputState["step"]) => void;
  decrement: (step: NumberInputState["step"]) => void;
  reset: () => void;
  clamp: (value: number) => void;
  cast: (value: StringOrNumber) => void;
  focusInput: () => void;
  spinUp: useSpinnerReturn["up"];
  spinDown: useSpinnerReturn["down"];
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
    precision: precisionProp,
    value: initialValue,
    keepWithinRange = true,
    focusInputOnChange = true,
    min = minSafeInteger,
    max = maxSafeInteger,
    step: stepProp = 1,
  } = useSealedState(initialState);

  const [value, setValueProp] = React.useState<StringOrNumber>(() => {
    if (initialValue == null) return "";
    return cast(initialValue, stepProp, precisionProp);
  });

  console.log("%c value", "color: #eeff00", value);
  const setValue = React.useCallback((next: StringOrNumber) => {
    setValueProp(next.toString());
  }, []);

  const decimalPlaces = getDecimalPlaces(parse(value), stepProp);

  const precision = precisionProp ?? decimalPlaces;

  // Function to clamp the value and round it to the precision
  const clamp = React.useCallback(
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
        next = parse(step);
      } else {
        next = parse(value) + step;
      }

      next = clamp(next as number);
      setValue(next);
    },
    [clamp, stepProp, setValue, value],
  );

  const decrement = React.useCallback(
    (step = stepProp) => {
      let next: StringOrNumber;

      // Same thing here. We'll follow native implementation
      if (value === "") {
        next = parse(-step);
      } else {
        next = parse(value) - step;
      }

      next = clamp(next as number);
      setValue(next);
    },
    [clamp, stepProp, setValue, value],
  );

  const reset = React.useCallback(() => {
    let next: StringOrNumber;
    if (initialValue == null) {
      next = "";
    } else {
      next = cast(initialValue, stepProp, precisionProp);
    }
    setValue(next);
  }, [initialValue, precisionProp, stepProp, setValue]);

  const castValue = React.useCallback(
    (value: StringOrNumber) => {
      setValue(cast(value, stepProp, precision));
    },
    [precision, stepProp, setValue],
  );

  const valueAsNumber = parse(value);

  /**
   * Common range checks
   */
  const isOutOfRange = valueAsNumber > max || valueAsNumber < min;
  const isAtMax = valueAsNumber === max;
  const isAtMin = valueAsNumber === min;

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
    increment,
    decrement,
    reset,
    clamp,
    cast: castValue,
    inputRef,
    focusInput,
    spinUp: spinner.up,
    spinDown: spinner.down,
    spinStop: spinner.stop,
  };
}

function parse(value: StringOrNumber) {
  return parseFloat(value.toString().replace(/[^\w.-]+/g, ""));
}

function getDecimalPlaces(value: number, step: number) {
  return Math.max(countDecimalPlaces(step), countDecimalPlaces(value));
}

function cast(value: StringOrNumber, step: number, precision?: number) {
  const decimalPlaces = getDecimalPlaces(parse(value), step);
  return toPrecision(parse(value), precision ?? decimalPlaces);
}
