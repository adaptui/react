import { useMemo } from "react";

import { clamp, valueToPercent } from "./__utils";

/**
 * Provides state for the `Progress` components.
 * @example
 * ```jsx
 * const meter = useProgressState();
 * <Progress state={meter} />
 * ```
 */
export function useProgressState({
  value: defaultValue = 0,
  min = 0,
  max = 100,
  ...props
}: ProgressStateProps = {}): ProgressState {
  const value = clamp(defaultValue, min, max);
  const isIndeterminate = value == null;
  const percent = isIndeterminate ? null : valueToPercent(value, min, max);

  const state = useMemo(
    () => ({
      value,
      min,
      max,
      isIndeterminate,
      percent,
    }),
    [value, min, max, isIndeterminate, percent],
  );

  return state;
}

export type ProgressState = {
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
   * `true` if `value` is `null`
   */
  isIndeterminate: boolean;
  /**
   * Percentage of the value progressed with respect to min & max
   */
  percent: number | null;
};

export type ProgressStateProps = Pick<
  Partial<ProgressState>,
  "value" | "min" | "max"
>;
