import * as React from "react";

import {
  NumberInput,
  useNumberInputState,
  NumberinputInitialState,
  NumberInputDecrementButton,
  NumberInputIncrementButton,
} from "../index";

export interface AppProps extends NumberinputInitialState {
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
  //   defaultValue: 15,
  //   min: 10,
  //   max: 30,
  //   step: 1,
  //   precision: 2,
  //   keepWithinRange: false,
  //   focusInputOnChange: false,
  // };

  // const state = useNumberInputState(initialProps);

  return (
    <label htmlFor="number-input" id="numberinput-label">
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInput
        placeholder="Enter a number"
        id="number-input"
        aria-labelledby="numberinput-label"
        clampValueOnBlur={clampValueOnBlur}
        allowMouseWheel={allowMouseWheel}
        {...state}
      />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </label>
  );
};

export default App;
