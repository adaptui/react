import { createComponent, createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { setInteractionModality } from "@react-aria/interactions";

import { SLIDER_LABEL_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";
import { getSliderThumbId } from ".";

export type SliderLabelOptions = RoleOptions &
  Pick<SliderStateReturn, "labelProps" | "baseState">;

export type SliderLabelHTMLProps = RoleHTMLProps;

export type SliderLabelProps = SliderLabelOptions & SliderLabelHTMLProps;

export const useSliderLabel = createHook<
  SliderLabelOptions,
  SliderLabelHTMLProps
>({
  name: "SliderLabel",
  compose: useRole,
  keys: SLIDER_LABEL_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    const { labelProps, baseState } = options;

    if (labelProps.htmlFor) {
      // Ideally the `for` attribute should point to the first thumb, but VoiceOver on iOS
      // causes this to override the `aria-labelledby` on the thumb. This causes the first
      // thumb to only be announced as the slider label rather than its individual name as well.
      // See https://bugs.webkit.org/show_bug.cgi?id=172464.
      delete labelProps.htmlFor;
      labelProps.onClick = () => {
        // Safari does not focus <input type="range"> elements when clicking on an associated <label>,
        // so do it manually. In addition, make sure we show the focus ring.
        document.getElementById(getSliderThumbId(baseState, 0))?.focus();
        setInteractionModality("keyboard");
      };
    }

    return { ...labelProps, ...htmlProps };
  },
});

export const SliderLabel = createComponent({
  as: "label",
  memo: true,
  useHook: useSliderLabel,
});
