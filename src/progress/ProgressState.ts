/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the Progress Component [Progress](https://github.com/chakra-ui/chakra-ui/tree/develop/packages/progress)
 * to work with Reakit System
 */
import * as React from "react";
import { SealedInitialState, useSealedState } from "reakit-utils";

import { valueToPercent, isFunction } from "../utils";

type AriaValueText = string | ((value: number, percent: number) => string);

export interface ProgressState {
  /**
   * The `value` of the progress indicator.
   * If `undefined` the progress bar will be in `indeterminate` state
   * @default 0
   */
  value: number;
  /**
   * The minimum value of the progress
   * @default 0
   */
  min: number;
  /**
   * The maximum value of the
   * @default 100
   */
  max: number;
  /**
   * Set isInterminate state
   * @default false
   */
  isIndeterminate?: boolean;
  /**
   * Defines the human readable text alternative of aria-valuenow for a range widget.
   */
  ariaValueText: AriaValueText;
  /**
   * Percentage of the value progressed with respect to min & max
   */
  percent: number;
}

export interface ProgressAction {
  /**
   * Update the value of the progress indicator
   */
  setValue?: React.Dispatch<React.SetStateAction<number>>;
}

export type ProgressInitialState = Partial<
  Pick<
    ProgressState,
    "value" | "min" | "max" | "isIndeterminate" | "ariaValueText"
  >
>;

export type ProgressStateReturn = ProgressState & ProgressAction;

export function useProgressState(
  initialState: SealedInitialState<ProgressInitialState> = {},
): ProgressStateReturn {
  const {
    value: initialValue = 0,
    min = 0,
    max = 100,
    ariaValueText,
    isIndeterminate = false,
  } = useSealedState(initialState);
  const [value, setValue] = React.useState(initialValue);
  const percent = valueToPercent(value, min, max);

  return {
    value,
    setValue,
    min,
    max,
    isIndeterminate,
    percent,
    ariaValueText: isFunction(ariaValueText)
      ? ariaValueText?.(value, percent)
      : `${percent}%`,
  };
}
