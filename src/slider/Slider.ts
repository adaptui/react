/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useSlider](https://github.com/chakra-ui/chakra-ui/blob/af613020125265914a9dcb74c92a07a16aa4ff8e/packages/slider/src/use-slider.ts)
 * to work with Reakit System
 */
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
