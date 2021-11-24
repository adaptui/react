import { createComponent, createHook } from "reakit-system";
import { GroupHTMLProps, GroupOptions, useGroup } from "reakit";

import { SLIDER_GROUP_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderGroupOptions = GroupOptions &
  Pick<SliderStateReturn, "fieldProps">;

export type SliderGroupHTMLProps = GroupHTMLProps;

export type SliderGroupProps = SliderGroupOptions & SliderGroupHTMLProps;

export const useSliderGroup = createHook<
  SliderGroupOptions,
  SliderGroupHTMLProps
>({
  name: "SliderGroup",
  compose: useGroup,
  keys: SLIDER_GROUP_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    const { fieldProps } = options;

    return { ...fieldProps, ...htmlProps };
  },
});

export const SliderGroup = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderGroup,
});
