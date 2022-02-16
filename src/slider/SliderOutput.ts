import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { mergeProps } from "@react-aria/utils";

import { createComponent, createHook } from "../system";

import { SLIDER_LABEL_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderOutputOptions = RoleOptions &
  Pick<SliderStateReturn, "outputProps">;

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
    return mergeProps(options.outputProps, htmlProps);
  },
});

export const SliderOutput = createComponent({
  as: "output",
  memo: true,
  useHook: useSliderOutput,
});
