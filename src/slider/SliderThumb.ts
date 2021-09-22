import * as React from "react";
import { createComponent, createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { useLocale } from "@react-aria/i18n";
import { useMove } from "@react-aria/interactions";
import {
  focusWithoutScrolling,
  mergeProps,
  useGlobalListeners,
} from "@react-aria/utils";

import { clamp } from "../utils";

import { SLIDER_THUMB_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";

export type SliderThumbOptions = RoleOptions &
  Pick<
    SliderStateReturn,
    | "inputs"
    | "orientation"
    | "setThumbEditable"
    | "isDisabled"
    | "focusedThumb"
    | "setThumbDragging"
    | "trackRef"
    | "getThumbValue"
    | "setThumbValue"
    | "setThumbPercent"
    | "getThumbPercent"
    | "step"
    | "reversed"
  > & {
    index: number;
  };

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
    const { index, inputs, isDisabled, setThumbEditable } = options;
    const isVertical = options.orientation === "vertical";
    const { direction } = useLocale();
    const { addGlobalListener, removeGlobalListener } = useGlobalListeners();

    React.useEffect(() => {
      // Immediately register editability with the state
      setThumbEditable(index, !isDisabled);
    }, [isDisabled, index, setThumbEditable]);

    const inputRef = React.useRef(inputs[index]);
    inputRef.current = inputs[index];

    const focusInput = React.useCallback(() => {
      if (inputRef.current?.ref.current) {
        focusWithoutScrolling(inputRef.current.ref.current);
      }
    }, []);

    const isFocused = options.focusedThumb === index;

    React.useEffect(() => {
      if (isFocused) {
        focusInput();
      }
    }, [isFocused, focusInput]);

    const reverseX = options.reversed || direction === "rtl";
    const currentPosition = React.useRef<number | null>(null);

    const { moveProps } = useMove({
      onMoveStart() {
        currentPosition.current = null;
        options.setThumbDragging(index, true);
      },
      onMove({ deltaX, deltaY, pointerType }) {
        if (!options.trackRef.current) return;

        const size = isVertical
          ? options.trackRef.current.offsetHeight
          : options.trackRef.current.offsetWidth;

        if (currentPosition.current == null) {
          currentPosition.current = options.getThumbPercent(index) * size;
        }

        if (pointerType === "keyboard") {
          // (invert left/right according to language direction) + (according to vertical)
          const delta =
            ((reverseX ? -deltaX : deltaX) + (isVertical ? -deltaY : -deltaY)) *
            options.step;

          currentPosition.current += delta * size;
          options.setThumbValue(index, options.getThumbValue(index) + delta);
        } else {
          let delta = isVertical ? deltaY : deltaX;
          if (isVertical || reverseX) {
            delta = -delta;
          }

          currentPosition.current += delta;
          options.setThumbPercent(
            index,
            clamp(currentPosition.current / size, 0, 1),
          );
        }
      },
      onMoveEnd() {
        options.setThumbDragging(index, false);
      },
    });

    const currentPointer = React.useRef<number | null | undefined>(undefined);
    const onDown = (id: number | null) => {
      focusInput();
      currentPointer.current = id;
      options.setThumbDragging(index, true);

      addGlobalListener(window, "mouseup", onUp, false);
      addGlobalListener(window, "touchend", onUp, false);
      addGlobalListener(window, "pointerup", onUp, false);
    };

    const onUp = (e: any) => {
      const id = e.pointerId ?? e.changedTouches?.[0].identifier;
      if (id === currentPointer.current) {
        focusInput();
        options.setThumbDragging(index, false);
        removeGlobalListener(window, "mouseup", onUp, false);
        removeGlobalListener(window, "touchend", onUp, false);
        removeGlobalListener(window, "pointerup", onUp, false);
      }
    };

    return mergeProps(
      moveProps,
      {
        onMouseDown: () => onDown(null),
        onPointerDown: (e: React.PointerEvent) => onDown(e.pointerId),
        onTouchStart: (e: React.TouchEvent) =>
          onDown(e.changedTouches[0].identifier),
      },
      htmlProps,
    );
  },
});

export const SliderThumb = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderThumb,
});
