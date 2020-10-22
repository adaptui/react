import * as React from "react";
import { useLocale } from "@react-aria/i18n";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { useGlobalListeners, useMove } from "./helpers";
import { SLIDER_THUMB_KEYS } from "./__keys";
import { SliderStateReturn } from "./SliderState";
import { clamp } from "../utils";
import { focusWithoutScrolling, mergeProps } from "@react-aria/utils";

export type SliderThumbOptions = BoxOptions &
  SliderStateReturn & {
    index: number;
  };

export type SliderThumbHTMLProps = BoxHTMLProps;

export type SliderThumbProps = SliderThumbOptions & SliderThumbHTMLProps;

export const useSliderThumb = createHook<
  SliderThumbOptions,
  SliderThumbHTMLProps
>({
  name: "SliderThumb",
  compose: useBox,
  keys: SLIDER_THUMB_KEYS,

  useProps(options, { ...htmlProps }) {
    const { index } = options;
    const isVertical = options.orientation === "vertical";
    const { direction } = useLocale();
    const { addGlobalListener, removeGlobalListener } = useGlobalListeners();

    // Immediately register editability with the state
    options.setThumbEditable(index, !options.isDisabled);

    const focusInput = React.useCallback(() => {
      if (options.inputRef.current) {
        focusWithoutScrolling(options.inputRef.current);
      }
    }, [options.inputRef]);

    const isFocused = options.focusedThumb === index;

    React.useEffect(() => {
      if (isFocused) {
        focusInput();
      }
    }, [isFocused, focusInput]);

    const reverseX = direction === "rtl";
    const currentPosition = React.useRef<number | null>(null);

    const moveProps = useMove({
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

    return {
      ...htmlProps,
      ...mergeProps(moveProps, {
        onMouseDown: () => onDown(null),
        onPointerDown: (e: React.PointerEvent) => onDown(e.pointerId),
        onTouchStart: (e: React.TouchEvent) =>
          onDown(e.changedTouches[0].identifier),
      }),
    };
  },
});

export const SliderThumb = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderThumb,
});
