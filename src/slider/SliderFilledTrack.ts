/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useSlider](https://github.com/chakra-ui/chakra-ui/blob/af613020125265914a9dcb74c92a07a16aa4ff8e/packages/slider/src/use-slider.ts)
 * to work with Reakit System
 */
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
