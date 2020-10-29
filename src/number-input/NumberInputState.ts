/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useNumberInput](https://github.com/chakra-ui/chakra-ui/blob/develop/packages/number-input/src/use-number-input.ts)
 * to work with Reakit System
 */
import { minSafeInteger, maxSafeInteger } from "@chakra-ui/utils";
import { useCounter, UseCounterProps } from "@chakra-ui/counter";

import { useSpinner } from "./helpers";

export interface NumberInputState extends UseCounterProps {}

export function useNumberInputState(props: NumberInputState = {}) {
  const {
    keepWithinRange = true,
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

  return {
    keepWithinRange,
    min,
    max,
    step: stepProp,
    ...counter,
    spinUp: spinner.up,
    spinDown: spinner.down,
    spinStop: spinner.stop,
  };
}

export type NumberInputStateReturn = ReturnType<typeof useNumberInputState>;
