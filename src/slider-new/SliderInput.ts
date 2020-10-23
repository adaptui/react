import * as React from "react";
import { useForkRef } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";
import {
  InputHTMLProps,
  InputOptions,
  unstable_IdHTMLProps,
  unstable_IdOptions,
  unstable_useId,
  useInput,
} from "reakit";

import { SLIDER_INPUT_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderInputOptions = InputOptions &
  unstable_IdOptions &
  SliderStateReturn & {
    index: number;
  };

export type SliderInputHTMLProps = InputHTMLProps & unstable_IdHTMLProps;

export type SliderInputProps = SliderInputOptions & SliderInputHTMLProps;

export const useSliderInput = createHook<
  SliderInputOptions,
  SliderInputHTMLProps
>({
  name: "SliderInput",
  compose: [unstable_useId, useInput],
  keys: SLIDER_INPUT_KEYS,

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);
    const { index, id, registerInputs, unregisterInputs } = options;

    React.useLayoutEffect(() => {
      if (!id) return undefined;
      registerInputs?.({ id, ref });

      return () => {
        unregisterInputs?.(id);
      };
    }, [id, registerInputs, unregisterInputs]);

    return {
      type: "range",
      tabIndex: !options.isDisabled ? 0 : undefined,
      min: options.getThumbMinValue(index),
      max: options.getThumbMaxValue(index),
      step: options.step,
      value: options.getThumbValueLabel(index),
      disabled: options.isDisabled,
      "aria-orientation": options.orientation,
      "aria-valuetext": options.getThumbValueLabel(index),
      ref: useForkRef(ref, htmlRef),
      onFocus: () => options.setFocusedThumb(index),
      onBlur: () => options.setFocusedThumb(undefined),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        options.setThumbValue(index, parseFloat(e.target.value));
      },
      ...htmlProps,
    };
  },
});

export const SliderInput = createComponent({
  as: "input",
  memo: true,
  useHook: useSliderInput,
});
