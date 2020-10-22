/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useSlider](https://github.com/chakra-ui/chakra-ui/blob/af613020125265914a9dcb74c92a07a16aa4ff8e/packages/slider/src/use-slider.ts)
 * to work with Reakit System
 */
import { createComponent, createHook } from "reakit-system";
import { InputHTMLProps, InputOptions, useInput } from "reakit";

import { SLIDER_INPUT_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderInputOptions = InputOptions &
  Pick<SliderStateReturn, "state">;

export type SliderInputHTMLProps = InputHTMLProps;

export type SliderInputProps = SliderInputOptions & SliderInputHTMLProps;

export const useSliderInput = createHook<
  SliderInputOptions,
  SliderInputHTMLProps
>({
  name: "SliderInput",
  compose: useInput,
  keys: SLIDER_INPUT_KEYS,

  useProps(options, htmlProps) {
    const { state } = options;

    return {
      type: "hidden",
      value: state.value,
      ...htmlProps,
    };
  },
});

export const SliderInput = createComponent({
  as: "input",
  memo: true,
  useHook: useSliderInput,
});
