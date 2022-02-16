import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { mergeProps } from "@react-aria/utils";

import { createComponent, createHook } from "../system";

import { SLIDER_LABEL_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderLabelOptions = RoleOptions &
  Pick<SliderStateReturn, "labelProps">;

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
    const { labelProps } = options;

    return mergeProps(labelProps, htmlProps);
  },
});

export const SliderLabel = createComponent({
  as: "label",
  memo: true,
  useHook: useSliderLabel,
});
