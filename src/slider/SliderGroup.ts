import { createHook } from "reakit-system";
import { GroupHTMLProps, GroupOptions, useGroup } from "reakit";
import { mergeProps } from "@react-aria/utils";

import { createComponent } from "../system";

import { SLIDER_GROUP_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderGroupOptions = GroupOptions &
  Pick<SliderStateReturn, "groupProps">;

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
    return mergeProps(options.groupProps, htmlProps);
  },
});

export const SliderGroup = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderGroup,
});
