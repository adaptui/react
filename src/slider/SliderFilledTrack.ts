import { createComponent, createHook } from "reakit-system";
import { BoxHTMLProps, useBox } from "reakit";

import { UseSliderReturn } from "./SliderState";
import { SLIDER_FILLED_TRACK_KEYS } from "./__keys";

export const useSliderFilledTrack = createHook<UseSliderReturn, BoxHTMLProps>({
  name: "useSliderFilledTrack",
  keys: SLIDER_FILLED_TRACK_KEYS,
  compose: [useBox],

  useProps(options, { style: htmlStyle, ...htmlProps }) {
    return {
      style: { ...options.styles.innerTrackStyle, ...htmlStyle },
      ...htmlProps,
    };
  },
});

export const SliderFilledTrack = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderFilledTrack,
});
