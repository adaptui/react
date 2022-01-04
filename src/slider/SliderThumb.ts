import { createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { mergeProps } from "@react-aria/utils";

import { createComponent } from "../system";

import { SLIDER_THUMB_KEYS } from "./__keys";
import { SliderThumbStateReturn } from "./SliderThumbState";

export type SliderThumbOptions = RoleOptions &
  Pick<SliderThumbStateReturn, "thumbProps">;

export type SliderThumbHTMLProps = RoleHTMLProps;

export type SliderThumbProps = SliderThumbOptions & SliderThumbHTMLProps;

export const useSliderThumb = createHook<
  SliderThumbOptions,
  SliderThumbHTMLProps
>({
  name: "SliderThumb",
  compose: useRole,
  keys: SLIDER_THUMB_KEYS,

  useProps(options, htmlProps) {
    const { thumbProps } = options;

    return mergeProps(thumbProps, htmlProps);
  },
});

export const SliderThumb = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderThumb,
});
