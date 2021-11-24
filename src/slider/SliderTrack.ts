import * as React from "react";
import { createComponent, createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { useForkRef } from "reakit-utils";
import { mergeProps } from "@react-aria/utils";

import { SLIDER_TRACK_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderTrackOptions = RoleOptions &
  Pick<SliderStateReturn, "onDownTrack" | "moveProps" | "trackRef">;

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
    const { onDownTrack, moveProps } = options;

    return mergeProps(
      {
        onMouseDown(e: React.MouseEvent<HTMLElement>) {
          if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey) {
            return;
          }

          // @ts-ignore
          onDownTrack(e, undefined, e.clientX, e.clientY);
        },
        onPointerDown(e: React.PointerEvent<HTMLElement>) {
          if (
            e.pointerType === "mouse" &&
            (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey)
          ) {
            return;
          }

          onDownTrack(e, e.pointerId, e.clientX, e.clientY);
        },
        onTouchStart(e: React.TouchEvent<HTMLElement>) {
          onDownTrack(
            e,
            e.changedTouches[0].identifier,
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY,
          );
        },
      },
      moveProps,
      { ref: useForkRef(options.trackRef, htmlRef), ...restHtmlProps },
    );
  },
});

export const SliderTrack = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderTrack,
});
