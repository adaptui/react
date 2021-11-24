import { createComponent, createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";

import { SLIDER_LABEL_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";
import { getSliderThumbId } from ".";

export type SliderOutputOptions = RoleOptions &
  Pick<SliderStateReturn, "baseState">;

export type SliderOutputHTMLProps = RoleHTMLProps;

export type SliderOutputProps = SliderOutputOptions & SliderOutputHTMLProps;

export const useSliderOutput = createHook<
  SliderOutputOptions,
  SliderOutputHTMLProps
>({
  name: "SliderOutput",
  compose: useRole,
  keys: SLIDER_LABEL_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    const { baseState } = options;
    const htmlFor = baseState.values
      .map((_, index) => getSliderThumbId(baseState, index))
      .join(" ");

    return { htmlFor, "aria-live": "off", ...htmlProps };
  },
});

export const SliderOutput = createComponent({
  as: "output",
  memo: true,
  useHook: useSliderOutput,
});
