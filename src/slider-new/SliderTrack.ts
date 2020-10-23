import * as React from "react";
import { useForkRef } from "reakit-utils";
import { useLocale } from "@react-aria/i18n";
import { mergeProps } from "@react-aria/utils";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { clamp } from "../utils";
import { SLIDER_TRACK_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";
import { useGlobalListeners, useMove } from "./helpers";

export type SliderTrackOptions = BoxOptions &
  Pick<
    SliderStateReturn,
    | "orientation"
    | "trackRef"
    | "values"
    | "isDisabled"
    | "getThumbPercent"
    | "setThumbPercent"
    | "isThumbDragging"
    | "setThumbDragging"
    | "setThumbValue"
    | "isThumbEditable"
    | "getPercentValue"
    | "setFocusedThumb"
  >;

export type SliderTrackHTMLProps = BoxHTMLProps;

export type SliderTrackProps = SliderTrackOptions & SliderTrackHTMLProps;

export const useSliderTrack = createHook<
  SliderTrackOptions,
  SliderTrackHTMLProps
>({
  name: "SliderTrack",
  compose: useBox,
  keys: SLIDER_TRACK_KEYS,

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const isVertical = options.orientation === "vertical";
    const { direction } = useLocale();
    const { addGlobalListener, removeGlobalListener } = useGlobalListeners();

    // When the user clicks or drags the track, we want the motion to set and drag the
    // closest thumb.  Hence we also need to install useMove() on the track element.
    // Here, we keep track of which index is the "closest" to the drag start point.
    // It is set onMouseDown/onTouchDown; see trackProps below.
    const realTimeTrackDraggingIndex = React.useRef<number | null>(null);

    const stateRef = React.useRef<SliderTrackOptions>(options);
    stateRef.current = options;
    const reverseX = direction === "rtl";
    const currentPosition = React.useRef<number | null>(null);
    const moveProps = useMove({
      onMoveStart() {
        currentPosition.current = null;
      },
      onMove({ deltaX, deltaY }) {
        if (!options.trackRef.current) return;

        const size = isVertical
          ? options.trackRef.current.offsetHeight
          : options.trackRef.current.offsetWidth;

        if (
          currentPosition.current == null &&
          realTimeTrackDraggingIndex.current != null
        ) {
          currentPosition.current =
            stateRef.current.getThumbPercent(
              realTimeTrackDraggingIndex.current,
            ) * size;
        }

        let delta = isVertical ? deltaY : deltaX;
        if (isVertical || reverseX) {
          delta = -delta;
        }

        if (currentPosition.current == null) return;
        currentPosition.current += delta;

        if (
          realTimeTrackDraggingIndex.current != null &&
          options.trackRef.current
        ) {
          const percent = clamp(currentPosition.current / size, 0, 1);
          stateRef.current.setThumbPercent(
            realTimeTrackDraggingIndex.current,
            percent,
          );
        }
      },
      onMoveEnd() {
        if (realTimeTrackDraggingIndex.current != null) {
          stateRef.current.setThumbDragging(
            realTimeTrackDraggingIndex.current,
            false,
          );
          realTimeTrackDraggingIndex.current = null;
        }
      },
    });

    const currentPointer = React.useRef<number | null | undefined>(undefined);
    const onDownTrack = (
      e: React.UIEvent,
      id: number | undefined,
      clientX: number,
      clientY: number,
    ) => {
      // We only trigger track-dragging if the user clicks on the track itself and nothing is currently being dragged.
      if (
        options.trackRef.current &&
        !options.isDisabled &&
        options.values.every((_, i) => !options.isThumbDragging(i))
      ) {
        const size = isVertical
          ? options.trackRef.current.offsetHeight
          : options.trackRef.current.offsetWidth;
        // Find the closest thumb
        const trackPosition = options.trackRef.current.getBoundingClientRect()[
          isVertical ? "top" : "left"
        ];
        const clickPosition = isVertical ? clientY : clientX;
        const offset = clickPosition - trackPosition;

        let percent = offset / size;
        if (direction === "rtl" || isVertical) {
          percent = 1 - percent;
        }

        const value = options.getPercentValue(percent);

        // Only compute the diff for thumbs that are editable, as only they can be dragged
        const minDiff = Math.min(
          ...options.values.map((v, index) =>
            options.isThumbEditable(index)
              ? Math.abs(v - value)
              : Number.POSITIVE_INFINITY,
          ),
        );
        const index = options.values.findIndex(
          v => Math.abs(v - value) === minDiff,
        );
        if (minDiff !== Number.POSITIVE_INFINITY && index >= 0) {
          // Don't unfocus anything
          e.preventDefault();

          realTimeTrackDraggingIndex.current = index;
          options.setFocusedThumb(index);
          currentPointer.current = id;

          options.setThumbDragging(realTimeTrackDraggingIndex.current, true);

          options.setThumbValue(index, value);

          addGlobalListener(window, "mouseup", onUpTrack, false);
          addGlobalListener(window, "touchend", onUpTrack, false);
          addGlobalListener(window, "pointerup", onUpTrack, false);
        } else {
          realTimeTrackDraggingIndex.current = null;
        }
      }
    };

    const onUpTrack = (e: any) => {
      const id = e.pointerId ?? e.changedTouches?.[0].identifier;
      if (id === currentPointer.current) {
        if (realTimeTrackDraggingIndex.current != null) {
          options.setThumbDragging(realTimeTrackDraggingIndex.current, false);
          realTimeTrackDraggingIndex.current = null;
        }

        removeGlobalListener(window, "mouseup", onUpTrack, false);
        removeGlobalListener(window, "touchend", onUpTrack, false);
        removeGlobalListener(window, "pointerup", onUpTrack, false);
      }
    };

    return mergeProps(
      {
        onMouseDown(e: React.MouseEvent<HTMLElement>) {
          onDownTrack(e, undefined, e.clientX, e.clientY);
        },
        onPointerDown(e: React.PointerEvent<HTMLElement>) {
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
      { ref: useForkRef(options.trackRef, htmlRef), ...htmlProps },
    );
  },
});

export const SliderTrack = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderTrack,
});
