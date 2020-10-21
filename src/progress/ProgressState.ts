/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the Progress Component [Progress](https://github.com/chakra-ui/chakra-ui/tree/develop/packages/progress)
 * to work with Reakit System
 */
import * as React from "react";
import { SealedInitialState, useSealedState } from "reakit-utils";

import { valueToPercent, isFunction, isNull } from "../utils";

type AriaValueText =
  | string
  | ((value: number | null, percent: number | null) => string);

export interface ProgressState {
  /**
   * The `value` of the progress indicator.
   *
   * If `null` the progress bar will be in `indeterminate` state
   * @default 0
   */
  value: number | null;
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
   */
  isIndeterminate: boolean;
  /**
   * Defines the human readable text alternative of aria-valuenow for a range widget.
   */
  ariaValueText: AriaValueText;
  /**
   * Percentage of the value progressed with respect to min & max
   */
  percent: number | null;
}

export interface ProgressAction {
  /**
   * Update the value of the progress indicator
   */
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
}

export type ProgressInitialState = Pick<
  Partial<ProgressState>,
  "value" | "min" | "max" | "ariaValueText"
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
  } = useSealedState(initialState);
  const [value, setValue] = React.useState(clamp(initialValue, min, max));
  const percent = isNull(value) ? null : valueToPercent(value, min, max);

  return {
    value,
    setValue,
    min,
    max,
    isIndeterminate: isNull(value),
    percent,
    ariaValueText: isFunction(ariaValueText)
      ? ariaValueText?.(value, percent)
      : isNull(value)
      ? "indeterminate"
      : `${percent}`,
  };
}

function clamp(value: number | null, min: number, max: number) {
  if (isNull(value)) return null;

  return Math.min(Math.max(value, min), max);
}
