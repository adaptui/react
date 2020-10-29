/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useNumberInput](https://github.com/chakra-ui/chakra-ui/blob/develop/packages/number-input/src/use-number-input.ts)
 * to work with Reakit System
 */
import * as React from "react";
import { minSafeInteger, maxSafeInteger, focus } from "@chakra-ui/utils";
import { useCounter, UseCounterProps } from "@chakra-ui/counter";

import { useSpinner } from "./helpers";

export interface NumberInputState extends UseCounterProps {
  /**
   * If `true`, the input will be focused as you increment
   * or decrement the value with the stepper
   *
   * @default true
   */
  focusInputOnChange?: boolean;
}

export function useNumberInputState(props: NumberInputState = {}) {
  const {
    keepWithinRange = true,
    focusInputOnChange = true,
    min = minSafeInteger,
    max = maxSafeInteger,
    step: stepProp = 1,
  } = props;

  /**
   * Leverage the `useCounter` hook since it provides
   * the functionality to `increment`, `decrement` and `update`
   * counter values
   */
  const counter = useCounter(props);

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
    keepWithinRange,
    min,
    max,
    step: stepProp,
    ...counter,
    inputRef,
    focusInput,
    spinUp: spinner.up,
    spinDown: spinner.down,
    spinStop: spinner.stop,
  };
}

export type NumberInputStateReturn = ReturnType<typeof useNumberInputState>;
