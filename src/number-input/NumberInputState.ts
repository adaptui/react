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
   * The number of decimal points used to round the value
   */
  precision: number;
  /**
   * The value of the counter. Should be less than `max` and greater than `min`
   */
  value: StringOrNumber;
  /**
   * The step used to increment or decrement the value
   * @default 1
   */
  step: number;
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

  isOutOfRange: boolean;
  isAtMax: boolean;
  isAtMin: boolean;
  valueAsNumber: number;
  inputRef: React.RefObject<HTMLElement | null>;
};

export type NumberInputAction = {
  increment: (step: NumberInputState["step"]) => void;
  decrement: (step: NumberInputState["step"]) => void;
  update: (next: StringOrNumber) => void;
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
   * The callback fired when the value changes
   */
  onChange?(valueAsString: string, valueAsNumber: number): void;
  /**
   * The initial value of the counter. Should be less than `max` and greater than `min`
   */
  defaultValue?: StringOrNumber;
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
    onChange,
    precision: precisionProp,
    defaultValue,
    value: valueProp,
    keepWithinRange = true,
    focusInputOnChange = true,
    min = minSafeInteger,
    max = maxSafeInteger,
    step: stepProp = 1,
  } = useSealedState(initialState);

  const [valueState, setValue] = React.useState<StringOrNumber>(() => {
    if (defaultValue == null) return "";
    return cast(defaultValue, stepProp, precisionProp);
  });

  /**
   * Because the component that consumes this hook can be controlled or uncontrolled
   * we'll keep track of that
   */
  const [isControlled, value] = useControllableProp(valueProp, valueState);

  const decimalPlaces = getDecimalPlaces(parse(value), stepProp);

  const precision = precisionProp ?? decimalPlaces;

  const update = React.useCallback(
    (next: StringOrNumber) => {
      if (!isControlled) {
        setValue(next.toString());
      }
      onChange?.(next.toString(), parse(next));
    },
    [onChange, isControlled],
  );

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
      update(next);
    },
    [clamp, stepProp, update, value],
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
      update(next);
    },
    [clamp, stepProp, update, value],
  );

  const reset = React.useCallback(() => {
    let next: StringOrNumber;
    if (defaultValue == null) {
      next = "";
    } else {
      next = cast(defaultValue, stepProp, precisionProp);
    }
    update(next);
  }, [defaultValue, precisionProp, stepProp, update]);

  const castValue = React.useCallback(
    (value: StringOrNumber) => {
      update(cast(value, stepProp, precision));
    },
    [precision, stepProp, update],
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
    keepWithinRange,
    min,
    max,
    step: stepProp,
    isOutOfRange,
    isAtMax,
    isAtMin,
    precision,
    value,
    valueAsNumber,
    update,
    reset,
    increment,
    decrement,
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
