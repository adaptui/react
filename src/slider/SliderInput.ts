import {
  useInput,
  InputOptions,
  InputHTMLProps,
  unstable_useId,
  unstable_IdOptions,
  unstable_IdHTMLProps,
} from "reakit";
import * as React from "react";
import { useWarning } from "reakit-warning";
import { useForkRef, useLiveRef } from "reakit-utils";
import { createComponent, createHook, useCreateElement } from "reakit-system";

import { SLIDER_INPUT_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderInputOptions = InputOptions &
  unstable_IdOptions &
  Pick<
    SliderStateReturn,
    | "isDisabled"
    | "registerInput"
    | "unregisterInput"
    | "setFocusedThumb"
    | "setThumbValue"
    | "getThumbMaxValue"
    | "getThumbMinValue"
    | "getThumbValueLabel"
    | "step"
    | "orientation"
  > & {
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

  useOptions(options, { disabled: htmlDisabled, ...htmlProps }) {
    const disabled = options.isDisabled || htmlDisabled;
    return { disabled, ...options };
  },

  useProps(
    options,
    {
      ref: htmlRef,
      onFocus: onHtmlFocus,
      onBlur: onHtmlBlur,
      onChange: onHtmlChange,
      ...htmlProps
    },
  ) {
    const ref = React.useRef<HTMLElement>(null);
    const onFocusRef = useLiveRef(onHtmlFocus);
    const onBlurRef = useLiveRef(onHtmlBlur);
    const onChangeRef = useLiveRef(onHtmlChange);

    const {
      index,
      id,
      registerInput,
      unregisterInput,
      disabled,
      setFocusedThumb,
      setThumbValue,
    } = options;

    React.useLayoutEffect(() => {
      if (!id) return undefined;
      registerInput?.({ id, ref });

      return () => {
        unregisterInput?.(id);
      };
    }, [id, registerInput, unregisterInput]);

    const onFocus = React.useCallback(
      (event: React.FocusEvent) => {
        onFocusRef.current?.(event);
        if (event.defaultPrevented) return;
        if (disabled) return;

        setFocusedThumb(index);
      },
      [disabled, index, onFocusRef, setFocusedThumb],
    );

    const onBlur = React.useCallback(
      (event: React.FocusEvent) => {
        onBlurRef.current?.(event);
        if (event.defaultPrevented) return;
        if (disabled) return;

        setFocusedThumb(undefined);
      },
      [disabled, onBlurRef, setFocusedThumb],
    );

    const onChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeRef.current?.(event);
        if (event.defaultPrevented) return;
        if (disabled) return;

        setThumbValue(index, parseFloat(event.target.value));
      },
      [disabled, index, onChangeRef, setThumbValue],
    );

    return {
      type: "range",
      tabIndex: !disabled ? 0 : undefined,
      min: options.getThumbMinValue(index),
      max: options.getThumbMaxValue(index),
      step: options.step,
      value: options.getThumbValueLabel(index),
      disabled: disabled,
      "aria-orientation": options.orientation,
      "aria-valuetext": options.getThumbValueLabel(index),
      ref: useForkRef(ref, htmlRef),
      onFocus,
      onBlur,
      onChange,
      ...htmlProps,
    };
  },
});

export const SliderInput = createComponent({
  as: "input",
  memo: true,
  useHook: useSliderInput,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://www.w3.org/TR/wai-aria-practices-1.1/#slider_roles_states_props",
    );
    return useCreateElement(type, props, children);
  },
});
