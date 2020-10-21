import * as React from "react";
import { css } from "emotion";

import { useSliderState, SliderInitialState } from "../SliderNewState";

export interface StyledSliderInitialState extends SliderInitialState {}

export const StyledSlider: React.FC<StyledSliderInitialState> = props => {
  const { children, ...rest } = props;
  const state = useSliderState(rest);
  console.log("%c state", "color: #e5de73", state);

  return <div>Slider</div>;
};
