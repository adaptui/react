import * as React from "react";

import {
  NumberInput as RenderlesskitNumberInput,
  NumberInputDecrementButton,
  NumberInputIncrementButton,
  NumberinputInitialState,
  NumberInputProps as RenderlesskitNumberInputProps,
  useNumberInputState,
} from "../../index";

export type NumberInputProps = NumberinputInitialState &
  Pick<
    RenderlesskitNumberInputProps,
    "clampValueOnBlur" | "allowMouseWheel"
  > & {};

export const NumberInput: React.FC<NumberInputProps> = props => {
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
      <RenderlesskitNumberInput
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

export default NumberInput;
