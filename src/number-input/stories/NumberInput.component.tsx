import * as React from "react";

import {
  NumberInput,
  useNumberInputState,
  NumberInputDecrementButton,
  NumberInputIncrementButton,
} from "renderless-components";

export interface AppProps {
  /**
   * The value of the counter. Should be less than `max` and greater than `min`
   *
   * If no value, initial value is set to `""`
   */
  value?: string | number;
  /**
   * The minimum value of the counter
   *
   * @default Number.MIN_SAFE_INTEGER
   */
  min?: number;
  /**
   * The maximum value of the counter
   *
   * @default Number.MAX_SAFE_INTEGER
   */
  max?: number;
  /**
   * The step used to increment or decrement the value
   *
   * @default 1
   */
  step?: number;
  /**
   * The number of decimal points used to round the value
   *
   * If no precision, initial value is from the decimal places
   * from value/step - `0`
   */
  precision?: number;
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
  keepWithinRange?: boolean;
  /**
   * If `true`, the input will be focused as you increment
   * or decrement the value with the stepper
   *
   * @default true
   */
  focusInputOnChange?: boolean;
  /**
   * This controls the value update when you blur out of the input.
   * - If `true` and the value is greater than `max`, the value will be reset to `max`
   * - Else, the value remains the same.
   *
   * @default true
   */
  clampValueOnBlur?: boolean;
  /**
   * If `true`, the input's value will change based on mouse wheel
   *
   * @default true
   */
  allowMouseWheel?: boolean;
}

export const App: React.FC<AppProps> = props => {
  const state = useNumberInputState(props);
  const { clampValueOnBlur, allowMouseWheel } = props;

  // const initialProps = {
  //   vconstalue: 15,
  //   min: 10,
  //   max: 30,
  //   step: 1,
  //   precision: 2,
  //   keepWithinRange: false,
  //   focusInputOnChange: false,
  // };

  // const state = useNumberInputState(initialProps);

  return (
    <label htmlFor="number-input">
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInput
        id="number-input"
        clampValueOnBlur={clampValueOnBlur}
        allowMouseWheel={allowMouseWheel}
        {...state}
      />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </label>
  );
};

export default App;
