/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useSlider](https://github.com/chakra-ui/chakra-ui/blob/af613020125265914a9dcb74c92a07a16aa4ff8e/packages/slider/src/use-slider.ts)
 * to work with Reakit System
 */
import { useForkRef } from "reakit-utils";
import { BoxHTMLProps, useBox } from "reakit";
import { ariaAttr } from "@chakra-ui/utils";
import { createComponent, createHook } from "reakit-system";

import { SLIDER_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export const useSlider = createHook<SliderStateReturn, BoxHTMLProps>({
  name: "Slider",
  compose: useBox,
  keys: SLIDER_KEYS,

  useProps(options, { ref: htmlRef, style: htmlStyle, ...htmlProps }) {
    const { refs, state, styles } = options;

    return {
      ...htmlProps,
      tabIndex: -1,
      "aria-disabled": ariaAttr(state.isDisabled),
      ref: useForkRef(htmlRef, refs.rootRef),
      style: { ...htmlStyle, ...styles.rootStyle },
    };
  },
});

export const Slider = createComponent({
  as: "div",
  memo: true,
  useHook: useSlider,
});
