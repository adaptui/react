/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the Slider Component [Slider](https://github.com/chakra-ui/chakra-ui/tree/develop/packages/Slider)
 * to work with Reakit System
 */
import * as React from "react";
import { SealedInitialState, useSealedState } from "reakit-utils";
import { isFunction } from "../utils";

type AriaValueText = string | ((value: number) => string);

export interface SliderState {
  /**
   * The `value` of the meter indicator.
   * If `undefined`/`not valid` the meter bar will be equal to `min`
   * @default 0
   */
  value?: number;
  /**
   * The minimum value of the meter
   * @default 0
   */
  min?: number;
  /**
   * The maximum value of the meter
   * @default 100
   */
  max?: number;
  /**
   * Defines the human readable text alternative of aria-valuenow for a range widget.
   */
  ariaValueText: AriaValueText;
}

export interface SliderAction {
  /**
   * Update the value of the progress indicator
   */
  setValue?: React.Dispatch<React.SetStateAction<number>>;
}

export type SliderInitialState = Partial<
  Pick<SliderState, "value" | "min" | "max" | "ariaValueText">
>;

export type SliderStateReturn = SliderState & SliderAction;

export function useSliderState(
  initialState: SealedInitialState<SliderInitialState> = {},
): SliderStateReturn {
  const {
    value: initialValue = 0,
    min = 0,
    max = 100,
    ariaValueText,
  } = useSealedState(initialState);
  const defaultValue = max < min ? min : min + (max - min) / 2;
  const [value, setValue] = React.useState(
    initialValue == null ? defaultValue : initialValue,
  );

  return {
    value,
    min,
    max,
    setValue,
    ariaValueText: isFunction(ariaValueText)
      ? ariaValueText?.(value)
      : `${value}`,
  };
}
