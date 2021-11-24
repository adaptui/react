import * as React from "react";
import { useId } from "@chakra-ui/hooks";
import { useLocale } from "@react-aria/i18n";
import { useMove } from "@react-aria/interactions";
import { clamp, useGlobalListeners, useLabels } from "@react-aria/utils";

import {
  SliderBaseInitialState,
  SliderBaseStateReturn,
  useSliderBaseState,
} from "./index";

export type SliderState = UseLabelReturnType & {
  /**
   * Ref for the "track" element.  The width of this element provides the "length"
   * of the track -- the span of one dimensional space that the slider thumb can be.  It also
   * accepts click and drag motions, so that the closest thumb will follow clicks and drags on
   * the track..
   */
  trackRef: React.RefObject<HTMLElement>;

  moveProps: React.HTMLAttributes<HTMLElement>;
};

export type SliderAction = {
  onDownTrack: (
    e: React.UIEvent,
    id: number,
    clientX: number,
    clientY: number,
  ) => void;
};

export type SliderInitialState = SliderBaseInitialState &
  AriaLabelingProps & {
    /**
     * The orientation of the Slider.
     * @default 'horizontal'
     */
    orientation?: "horizontal" | "vertical";
  };

export type SliderStateReturn = SliderState &
  SliderAction & {
    baseState: SliderBaseStateReturn;
  };

export const sliderIds = new WeakMap<SliderBaseStateReturn, string>();

export function useSliderState(
  props: SliderInitialState = {},
): SliderStateReturn {
  const baseState = useSliderBaseState(props);
  const { labelProps, fieldProps } = useLabel(props);
  const trackRef = React.useRef<HTMLElement>(null);

  const isVertical = props.orientation === "vertical";

  // Attach id of the label to the state so it can be accessed by useSliderThumb.
  // @ts-ignore
  sliderIds.set(baseState, labelProps.id ?? fieldProps.id);

  let { direction } = useLocale();

  let { addGlobalListener, removeGlobalListener } = useGlobalListeners();

  // When the user clicks or drags the track, we want the motion to set and drag the
  // closest thumb.  Hence we also need to install useMove() on the track element.
  // Here, we keep track of which index is the "closest" to the drag start point.
  // It is set onMouseDown/onTouchDown; see trackProps below.
  const realTimeTrackDraggingIndex = React.useRef<number | null>(null);

  const stateRef = React.useRef<SliderBaseStateReturn>(null);
  // @ts-ignore
  stateRef.current = baseState;
  const reverseX = direction === "rtl";
  const currentPosition = React.useRef<number>(null);

  const { moveProps } = useMove({
    onMoveStart() {
      // @ts-ignore
      currentPosition.current = null;
    },
    onMove({ deltaX, deltaY }) {
      let size = isVertical
        ? // @ts-ignore
          trackRef.current.offsetHeight
        : // @ts-ignore
          trackRef.current.offsetWidth;

      if (currentPosition.current == null) {
        // @ts-ignore
        currentPosition.current =
          // @ts-ignore
          stateRef.current.getThumbPercent(realTimeTrackDraggingIndex.current) *
          size;
      }

      let delta = isVertical ? deltaY : deltaX;
      if (isVertical || reverseX) {
        delta = -delta;
      }

      // @ts-ignore
      currentPosition.current += delta;

      if (realTimeTrackDraggingIndex.current != null && trackRef.current) {
        const percent = clamp(currentPosition.current / size, 0, 1);
        // @ts-ignore
        stateRef.current.setThumbPercent(
          realTimeTrackDraggingIndex.current,
          percent,
        );
      }
    },
    onMoveEnd() {
      if (realTimeTrackDraggingIndex.current != null) {
        // @ts-ignore
        stateRef.current.setThumbDragging(
          realTimeTrackDraggingIndex.current,
          false,
        );
        realTimeTrackDraggingIndex.current = null;
      }
    },
  });

  let currentPointer = React.useRef<number | null | undefined>(undefined);
  let onDownTrack = (
    e: React.UIEvent,
    id: number,
    clientX: number,
    clientY: number,
  ) => {
    // We only trigger track-dragging if the user clicks on the track itself and nothing is currently being dragged.
    if (
      trackRef.current &&
      !props.isDisabled &&
      baseState.values.every((_, i) => !baseState.isThumbDragging(i))
    ) {
      let size = isVertical
        ? trackRef.current.offsetHeight
        : trackRef.current.offsetWidth;
      // Find the closest thumb
      const trackPosition =
        trackRef.current.getBoundingClientRect()[isVertical ? "top" : "left"];
      const clickPosition = isVertical ? clientY : clientX;
      const offset = clickPosition - trackPosition;
      let percent = offset / size;
      if (direction === "rtl" || isVertical) {
        percent = 1 - percent;
      }
      let value = baseState.getPercentValue(percent);

      // to find the closet thumb we split the array based on the first thumb position to the "right/end" of the click.
      let closestThumb;
      let split = baseState.values.findIndex(v => value - v < 0);
      if (split === 0) {
        // If the index is zero then the closetThumb is the first one
        closestThumb = split;
      } else if (split === -1) {
        // If no index is found they've clicked past all the thumbs
        closestThumb = baseState.values.length - 1;
      } else {
        let lastLeft = baseState.values[split - 1];
        let firstRight = baseState.values[split];
        // Pick the last left/start thumb, unless they are stacked on top of each other, then pick the right/end one
        if (Math.abs(lastLeft - value) < Math.abs(firstRight - value)) {
          closestThumb = split - 1;
        } else {
          closestThumb = split;
        }
      }

      // Confirm that the found closest thumb is editable, not disabled, and move it
      if (closestThumb >= 0 && baseState.isThumbEditable(closestThumb)) {
        // Don't unfocus anything
        e.preventDefault();

        realTimeTrackDraggingIndex.current = closestThumb;
        baseState.setFocusedThumb(closestThumb);
        currentPointer.current = id;

        baseState.setThumbDragging(realTimeTrackDraggingIndex.current, true);
        baseState.setThumbValue(closestThumb, value);

        addGlobalListener(window, "mouseup", onUpTrack, false);
        addGlobalListener(window, "touchend", onUpTrack, false);
        addGlobalListener(window, "pointerup", onUpTrack, false);
      } else {
        realTimeTrackDraggingIndex.current = null;
      }
    }
  };

  let onUpTrack = (e: any) => {
    let id = e.pointerId ?? e.changedTouches?.[0].identifier;
    if (id === currentPointer.current) {
      if (realTimeTrackDraggingIndex.current != null) {
        baseState.setThumbDragging(realTimeTrackDraggingIndex.current, false);
        realTimeTrackDraggingIndex.current = null;
      }

      removeGlobalListener(window, "mouseup", onUpTrack, false);
      removeGlobalListener(window, "touchend", onUpTrack, false);
      removeGlobalListener(window, "pointerup", onUpTrack, false);
    }
  };

  return {
    baseState,
    labelProps,
    fieldProps,
    trackRef,
    moveProps,
    onDownTrack,
  };
}

export interface AriaLabelingProps {
  /**
   * The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).
   */
  id?: string;

  /**
   * Defines a string value that labels the current element.
   */
  "aria-label"?: string;

  /**
   * Identifies the element (or elements) that labels the current element.
   */
  "aria-labelledby"?: string;
}

export interface UseLabelProps extends AriaLabelingProps {
  /**
   * The HTML element used to render the label, e.g. 'label', or 'span'.
   * @default 'label'
   */
  labelElementType?: React.ElementType;
}

export interface UseLabelReturnType {
  /** Props to apply to the label container element. */
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;

  /** Props to apply to the field container element being labeled. */
  fieldProps: AriaLabelingProps;
}

/**
 * Provides the accessibility implementation for labels and their associated elements.
 * Labels provide context for user inputs.
 * @param props - The props for labels and fields.
 */
export function useLabel(props: UseLabelProps): UseLabelReturnType {
  let {
    id,
    "aria-labelledby": ariaLabelledby,
    "aria-label": ariaLabel,
    labelElementType = "label",
  } = props;

  id = useId(id);
  const labelId = useId();
  let labelProps = {};
  ariaLabelledby = ariaLabelledby ? `${ariaLabelledby} ${labelId}` : labelId;
  labelProps = {
    id: labelId,
    htmlFor: labelElementType === "label" ? id : undefined,
  };

  let fieldProps = useLabels({
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
  });

  return {
    labelProps,
    fieldProps,
  };
}

export function getSliderThumbId(state: SliderBaseStateReturn, index: number) {
  let id = sliderIds.get(state);

  if (!id) {
    throw new Error("Unknown slider state");
  }

  return `${id}-${index}`;
}
