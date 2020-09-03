/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the Progress Component [Progress](https://github.com/chakra-ui/chakra-ui/tree/develop/packages/progress)
 * to work with Reakit System
 */
import { isUndefined, valueToPercent } from "@chakra-ui/utils";

export interface UseProgressProps {
  /**
   * The `value` of the progress indicator.
   * If `undefined` the progress bar will be in `indeterminate` state
   */
  value?: number;
  /**
   * The minimum value of the progress
   */
  min?: number;
  /**
   * The maximum value of the progress
   */
  max?: number;
}

/**
 * Progress (Linear)
 *
 * Progress is used to display the progress status for a task that takes a long
 * time or consists of several steps.
 *
 * It includes accessible attributes to help assistive technologies understand
 * and speak the progress values.
 */
export const useProgressState = (props: UseProgressProps = {}) => {
  const { value, min = 0, max = 100 } = props;

  const percent = value != null ? valueToPercent(value, min, max) : undefined;
  const isIndeterminate = isUndefined(value);

  return { value, isIndeterminate, min, max, percent };
};

export type ProgressStateReturn = ReturnType<typeof useProgressState>;
