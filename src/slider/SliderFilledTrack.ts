/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useSlider](https://github.com/chakra-ui/chakra-ui/blob/af613020125265914a9dcb74c92a07a16aa4ff8e/packages/slider/src/use-slider.ts)
 * to work with Reakit System
 */
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { SliderStateReturn } from "./SliderState";
import { SLIDER_FILLED_TRACK_KEYS } from "./__keys";

export type SliderFilledTrackOptions = BoxOptions & SliderStateReturn;

export type SliderFilledTrackHTMLProps = BoxHTMLProps;

export type SliderFilledTrackProps = SliderFilledTrackOptions &
  SliderFilledTrackHTMLProps;

export const useSliderFilledTrack = createHook<
  SliderFilledTrackOptions,
  SliderFilledTrackHTMLProps
>({
  name: "SliderFilledTrack",
  compose: useBox,
  keys: SLIDER_FILLED_TRACK_KEYS,

  useProps(options, { style: htmlStyle, ...htmlProps }) {
    const { styles } = options;

    return {
      ...htmlProps,
      style: { ...htmlStyle, ...styles.innerTrackStyle },
    };
  },
});

export const SliderFilledTrack = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderFilledTrack,
});
