import * as React from "react";

import {
  useRadioState,
  RadioInitialState,
  Radio as RenderlesskitRadio,
  RadioProps as RenderlesskitRadioProps,
  USE_RADIO_STATE_KEYS,
  splitStateProps,
  RadioGroup,
} from "../../index";

export type RadioProps = RenderlesskitRadioProps & RadioInitialState & {};

export const Radio: React.FC<RadioProps> = props => {
  const [stateProps, radioProps] = splitStateProps<
    RadioInitialState,
    RadioProps
  >(props, USE_RADIO_STATE_KEYS);

  const state = useRadioState(stateProps);

  return (
    <RadioGroup {...state} aria-label="fruits" {...radioProps}>
      <label>
        <RenderlesskitRadio {...state} value="apple" /> apple
      </label>
      <label>
        <RenderlesskitRadio {...state} value="orange" /> orange
      </label>
      <label>
        <RenderlesskitRadio {...state} value="watermelon" /> watermelon
      </label>
    </RadioGroup>
  );
};

export default Radio;
