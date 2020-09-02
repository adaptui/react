/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useSlider](https://github.com/chakra-ui/chakra-ui/blob/af613020125265914a9dcb74c92a07a16aa4ff8e/packages/slider/src/use-slider.ts)
 * to work with Reakit System
 */
import { useId } from "@chakra-ui/hooks";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeRefs, dataAttr } from "@chakra-ui/utils";
import { createComponent, createHook } from "reakit-system";

import { SLIDER_TRACK_KEYS } from "./__keys";
import { UseSliderReturn } from "./SliderState";

export type useSliderTrackOptions = UseSliderReturn & {
  /**
   * The base `id` to use for the sliderTrack
   */
  id?: string;
};

export const useSliderTrack = createHook<useSliderTrackOptions, BoxHTMLProps>({
  name: "SliderTrack",
  compose: useBox,
  keys: SLIDER_TRACK_KEYS,

  useProps(options, { ref: htmlRef, style: htmlStyle, ...htmlProps }) {
    const { refs, state, styles } = options;

    const id = useId(options.id, "slider-track");

    return {
      ...htmlProps,
      id,
      "data-disabled": dataAttr(state.isDisabled),
      style: { ...htmlStyle, ...styles.trackStyle },
      ref: mergeRefs(htmlRef, refs.trackRef),
    };
  },
});

export const SliderTrack = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderTrack,
});
