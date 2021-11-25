import { createComponent, createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { useForkRef } from "reakit-utils";
import { mergeProps } from "@react-aria/utils";

import { SLIDER_TRACK_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderTrackOptions = RoleOptions &
  Pick<SliderStateReturn, "trackProps" | "trackRef">;

export type SliderTrackHTMLProps = RoleHTMLProps;

export type SliderTrackProps = SliderTrackOptions & SliderTrackHTMLProps;

export const useSliderTrack = createHook<
  SliderTrackOptions,
  SliderTrackHTMLProps
>({
  name: "SliderTrack",
  compose: useRole,
  keys: SLIDER_TRACK_KEYS,

  useProps(options, htmlProps) {
    const { ref: htmlRef, ...restHtmlProps } = htmlProps;

    return mergeProps(options.trackProps, {
      ref: useForkRef(options.trackRef, htmlRef),
      ...restHtmlProps,
    });
  },
});

export const SliderTrack = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderTrack,
});
