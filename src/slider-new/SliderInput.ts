import { createComponent, createHook } from "reakit-system";
import { InputHTMLProps, InputOptions, useInput } from "reakit";

import { SLIDER_INPUT_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";
import { mergeProps } from "@react-aria/utils";
import { useFocusable } from "@react-aria/focus";

export type SliderInputOptions = InputOptions & SliderStateReturn;

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
    const {} = options;
    const index = 0;
    const value = options.values[index];

    // Immediately register editability with the state
    options.setThumbEditable(index, !options.isDisabled);

    const { focusableProps } = useFocusable(
      mergeProps(options, {
        onFocus: () => options.setFocusedThumb(index),
        onBlur: () => options.setFocusedThumb(undefined),
      }),
      options.inputRef as React.RefObject<HTMLElement>,
    );

    return mergeProps(htmlProps, focusableProps, {
      type: "range",
      ref: options.inputRef,
      tabIndex: !options.isDisabled ? 0 : undefined,
      min: options.getThumbMinValue(index),
      max: options.getThumbMaxValue(index),
      step: options.step,
      value: value,
      disabled: options.isDisabled,
      "aria-orientation": options.orientation,
      "aria-valuetext": `${value}`,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        options.setThumbValue(index, parseFloat(e.target.value));
      },
    });
  },
});

export const SliderInput = createComponent({
  as: "input",
  memo: true,
  useHook: useSliderInput,
});
