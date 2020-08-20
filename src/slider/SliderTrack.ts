import { createComponent, createHook } from "reakit-system";
import { mergeRefs, dataAttr } from "@chakra-ui/utils";
import { useId } from "@chakra-ui/hooks";
import { BoxHTMLProps, useBox } from "reakit";

import { UseSliderReturn } from "./SliderState";
import { SLIDER_TRACK_KEYS } from "./__keys";

export type useSliderTrackOptions = UseSliderReturn & {
  /**
   * The base `id` to use for the sliderTrack and it's components
   */
  id?: string;
};

export const useSliderTrack = createHook<useSliderTrackOptions, BoxHTMLProps>({
  name: "useSliderTrack",
  compose: [useBox],
  keys: SLIDER_TRACK_KEYS,

  useProps(options, { ref: htmlRef, style: htmlStyle, ...htmlProps }) {
    const id = useId(options.id, "slider-track");

    return {
      id,
      ref: mergeRefs(htmlRef, options.refs.trackRef),
      "data-disabled": dataAttr(options.state.isDisabled),
      style: { ...options.styles.trackStyle, ...htmlStyle },
      ...htmlProps,
    };
  },
});

export const SliderTrack = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderTrack,
});
