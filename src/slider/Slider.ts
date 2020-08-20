import { createComponent, createHook } from "reakit-system";
import { mergeRefs, ariaAttr, dataAttr } from "@chakra-ui/utils";
import { BoxHTMLProps, useBox } from "reakit";

import { UseSliderReturn } from "./SliderState";
import { SLIDER_KEYS } from "./__keys";

export const useSlider = createHook<UseSliderReturn, BoxHTMLProps>({
  name: "useSlider",
  keys: SLIDER_KEYS,
  compose: [useBox],

  useProps(options, { ref: htmlRef, style: htmlStyle, ...htmlProps }) {
    return {
      ref: mergeRefs(htmlRef, options.refs.rootRef),
      tabIndex: -1,
      "aria-disabled": ariaAttr(options.state.isDisabled),
      "data-focused": dataAttr(options.state.isFocused),
      style: { ...options.styles.rootStyle, ...htmlStyle },
      ...htmlProps,
    };
  },
});

export const Slider = createComponent({
  as: "div",
  memo: true,
  useHook: useSlider,
});
