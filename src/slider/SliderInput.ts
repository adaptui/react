import { createComponent, createHook } from "reakit-system";
import { InputHTMLProps, InputOptions, unstable_useId, useInput } from "reakit";
import { useForkRef } from "reakit-utils";
import { mergeProps } from "@react-aria/utils";

import { SLIDER_INPUT_KEYS } from "./__keys";
import { SliderThumbStateReturn } from "./SliderThumbState";

export type SliderInputOptions = InputOptions &
  Pick<SliderThumbStateReturn, "inputProps" | "inputRef"> & {};

export type SliderInputHTMLProps = InputHTMLProps & {};

export type SliderInputProps = SliderInputOptions & SliderInputHTMLProps;

export const useSliderInput = createHook<
  SliderInputOptions,
  SliderInputHTMLProps
>({
  name: "SliderInput",
  compose: [unstable_useId, useInput],
  keys: SLIDER_INPUT_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    const { inputRef, inputProps } = options;
    const { ref: htmlRef, ...restHtmlProps } = htmlProps;

    return mergeProps(inputProps, {
      ref: useForkRef(htmlRef, inputRef),
      ...restHtmlProps,
    });
  },
});

export const SliderInput = createComponent({
  as: "input",
  memo: true,
  useHook: useSliderInput,
});
