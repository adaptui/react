/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the hook [useSlider](https://github.com/chakra-ui/chakra-ui/blob/af613020125265914a9dcb74c92a07a16aa4ff8e/packages/slider/src/use-slider.ts)
 * to work with Reakit System
 */
import { ensureFocus } from "reakit-utils";
import {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  CSSProperties,
} from "react";
import {
  useBoolean,
  useControllableState,
  useDimensions,
  useEventCallback,
  useEventListener,
  useUpdateEffect,
} from "@chakra-ui/hooks";
import {
  clampValue,
  createOnKeyDown,
  getBox,
  getOwnerDocument,
  percentToValue,
  roundValueToStep,
  valueToPercent,
  isRightClick,
  Dict,
} from "@chakra-ui/utils";

import { getDefaultValue, orient } from "./__utils";

export interface SliderStateProps {
  /**
   * The minimum allowed value of the slider. Cannot be greater than max.
   * @default 0
   */
  min?: number;
  /**
   * The maximum allowed value of the slider. Cannot be less than min.
   * @default 100
   */
  max?: number;
  /**
   * The step in which increments/decrements have to be made
   * @default 1
   */
  step?: number;
  /**
   * The value of the slider in controlled mode
   */
  value?: number;
  /**
   * The initial value of the slider in uncontrolled mode
   */
  defaultValue?: number;
  /**
   * orientation of the slider
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * If `true`, the value will be incremented or decremented in reverse.
   */
  isReversed?: boolean;
  /**
   * function gets called whenever the user starts dragging the slider handle
   */
  onChangeStart?(value: number): void;
  /**
   * function gets called whenever the user stops dragging the slider handle.
   */
  onChangeEnd?(value: number): void;
  /**
   * function gets called whenever the slider handle is being dragged or clicked
   */
  onChange?(value: number): void;
  /**
   * If `true`, the slider will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true`, the slider will be in `read-only` state
   */
  isReadOnly?: boolean;
}

type EventSource = "mouse" | "touch" | "keyboard";

/**
 * React hook that implements an accessible range slider.
 *
 * It's an alternative to `<input type="range" />`, and returns
 * prop getters for the component parts
 *
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.1/#slider
 */
export function useSliderState(props: SliderStateProps = {}) {
  const {
    min = 0,
    max = 100,
    onChange,
    value: valueProp,
    defaultValue,
    isReversed,
    orientation = "horizontal",
    isDisabled,
    isReadOnly,
    onChangeStart,
    onChangeEnd,
    step = 1,
  } = props;

  const [isDragging, setDragging] = useBoolean();

  const [eventSource, setEventSource] = useState<EventSource>();

  const isInteractive = !(isDisabled || isReadOnly);

  /**
   * Enable the slider handle controlled and uncontrolled scenarios
   */
  const [computedValue, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? getDefaultValue(min, max),
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  /**
   * Slider uses DOM APIs to add and remove event listeners.
   * Noticed some issues with React's synthetic events.
   *
   * We use `ref` to save the functions used to remove
   * the event listeners.
   *
   * Ideally, we'll love to use pointer-events API but it's
   * not fully supported in all browsers.
   */
  const cleanUpRef = useRef<Dict<Function>>({});

  /**
   * Constrain the value because it can't be less than min
   * or greater than max
   */
  const value = clampValue(computedValue, min, max);
  const prev = useRef<number>();

  const reversedValue = max - value + min;
  const trackValue = isReversed ? reversedValue : value;
  const trackPercent = valueToPercent(trackValue, min, max);

  const isVertical = orientation === "vertical";

  /**
   * Let's keep a reference to the slider track and thumb
   */
  const trackRef = useRef<any>(null);
  const thumbRef = useRef<any>(null);
  const rootRef = useRef<any>(null);

  /**
   * Get relative value of slider from the event by tracking
   * how far you clicked within the track to determine the value
   */
  const getValueFromPointer = useCallback(
    event => {
      if (!trackRef.current) return;

      const trackRect = getBox(trackRef.current).borderBox;
      const { clientX, clientY } = event.touches?.[0] ?? event;

      const diff = isVertical
        ? trackRect.bottom - clientY
        : clientX - trackRect.left;

      const length = isVertical ? trackRect.height : trackRect.width;
      let percent = diff / length;

      if (isReversed) {
        percent = 1 - percent;
      }

      let nextValue = percentToValue(percent, min, max);

      if (step) {
        nextValue = parseFloat(roundValueToStep(nextValue, min, step));
      }

      nextValue = clampValue(nextValue, min, max);

      return nextValue;
    },
    [isVertical, isReversed, max, min, step],
  );

  const tenSteps = (max - min) / 10;
  const oneStep = step || (max - min) / 100;

  const constrain = useCallback(
    (value: number) => {
      // bail out if slider isn't interactive
      if (!isInteractive) return;
      prev.current = value;
      value = parseFloat(roundValueToStep(value, min, oneStep));
      value = clampValue(value, min, max);
      setValue(value);
    },
    [oneStep, max, min, setValue, isInteractive],
  );

  const actions = useMemo(
    () => ({
      stepUp: (step = oneStep) => {
        const next = isReversed ? value - step : value + step;
        constrain(next);
      },
      stepDown: (step = oneStep) => {
        const next = isReversed ? value + step : value - step;
        constrain(next);
      },
      reset: () => constrain(defaultValue || 0),
      stepTo: (value: number) => constrain(value),
    }),
    [constrain, isReversed, value, oneStep, defaultValue],
  );

  /**
   * Keyboard interaction to ensure users can operate
   * the slider using only their keyboard.
   */
  const onKeyDown = createOnKeyDown({
    stopPropagation: true,
    onKey: () => setEventSource("keyboard"),
    keyMap: {
      ArrowRight: () => actions.stepUp(),
      ArrowUp: () => actions.stepUp(),
      ArrowLeft: () => actions.stepDown(),
      ArrowDown: () => actions.stepDown(),
      PageUp: () => actions.stepUp(tenSteps),
      PageDown: () => actions.stepDown(tenSteps),
      Home: () => constrain(min),
      End: () => constrain(max),
    },
  });

  /**
   * Measure the dimensions of the thumb so
   * we can center it within the track properly
   */
  const thumbBoxModel = useDimensions(thumbRef);
  const thumbRect = thumbBoxModel?.borderBox ?? {
    width: 0,
    height: 0,
  };

  /**
   * Compute styles for all component parts.
   */
  const thumbStyle: CSSProperties = {
    position: "absolute",
    userSelect: "none",
    touchAction: "none",
    ...orient({
      orientation,
      vertical: {
        bottom: `calc(${trackPercent}% - ${thumbRect.height / 2}px)`,
      },
      horizontal: {
        left: `calc(${trackPercent}% - ${thumbRect.width / 2}px)`,
      },
    }),
  };

  const rootStyle: CSSProperties = {
    position: "relative",
    touchAction: "none",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    userSelect: "none",
    outline: 0,
    ...orient({
      orientation,
      vertical: {
        paddingLeft: thumbRect.width / 2,
        paddingRight: thumbRect.width / 2,
      },
      horizontal: {
        paddingTop: thumbRect.height / 2,
        paddingBottom: thumbRect.height / 2,
      },
    }),
  };

  const trackStyle: CSSProperties = {
    position: "absolute",
    ...orient({
      orientation,
      vertical: {
        left: "50%",
        transform: "translateX(-50%)",
        height: "100%",
      },
      horizontal: {
        top: "50%",
        transform: "translateY(-50%)",
        width: "100%",
      },
    }),
  };

  const innerTrackStyle: CSSProperties = {
    ...trackStyle,
    ...orient({
      orientation,
      vertical: isReversed
        ? { height: `${100 - trackPercent}%`, top: 0 }
        : { height: `${trackPercent}%`, bottom: 0 },
      horizontal: isReversed
        ? { width: `${100 - trackPercent}%`, right: 0 }
        : { width: `${trackPercent}%`, left: 0 },
    }),
  };

  useUpdateEffect(() => {
    if (thumbRef.current) {
      ensureFocus(thumbRef.current);
    }
  }, [value]);

  useUpdateEffect(() => {
    const shouldUpdate =
      !isDragging && eventSource !== "keyboard" && prev.current !== value;

    if (shouldUpdate) {
      onChangeEnd?.(value);
    }

    if (eventSource === "keyboard") {
      onChangeEnd?.(value);
    }
  }, [isDragging, onChangeEnd, value, eventSource]);

  const onMouseDown = useEventCallback((event: MouseEvent) => {
    /**
     * Prevent update if it's right-click
     */
    if (isRightClick(event)) return;

    if (!isInteractive || !rootRef.current) return;

    setDragging.on();
    prev.current = value;
    onChangeStart?.(value);

    const doc = getOwnerDocument(rootRef.current);

    const run = (event: MouseEvent) => {
      const nextValue = getValueFromPointer(event);
      if (nextValue != null && nextValue !== value) {
        setEventSource("mouse");
        setValue(nextValue);
      }
    };

    run(event);

    doc.addEventListener("mousemove", run);

    const clean = () => {
      doc.removeEventListener("mousemove", run);
      setDragging.off();
    };

    doc.addEventListener("mouseup", clean);
    cleanUpRef.current.mouseup = () => {
      doc.removeEventListener("mouseup", clean);
    };
  });

  const onTouchStart = useEventCallback((event: TouchEvent) => {
    if (!isInteractive || !rootRef.current) return;

    // Prevent scrolling for touch events
    event.preventDefault();

    setDragging.on();
    prev.current = value;
    onChangeStart?.(value);

    const doc = getOwnerDocument(rootRef.current);

    const run = (event: TouchEvent) => {
      const nextValue = getValueFromPointer(event);

      if (nextValue != null && nextValue !== value) {
        setEventSource("touch");
        setValue(nextValue);
      }
    };

    run(event);

    doc.addEventListener("touchmove", run);

    const clean = () => {
      doc.removeEventListener("touchmove", run);
      setDragging.off();
    };

    doc.addEventListener("touchend", clean);
    doc.addEventListener("touchcancel", clean);

    cleanUpRef.current.touchend = () => {
      doc.removeEventListener("touchend", clean);
    };

    cleanUpRef.current.touchcancel = () => {
      doc.removeEventListener("touchcancel", clean);
    };
  });

  /**
   * Remove all event handlers
   */
  const detach = () => {
    Object.values(cleanUpRef.current).forEach(cleanup => {
      cleanup?.();
    });
    cleanUpRef.current = {};
  };

  /**
   * Ensure we clean up listeners when slider unmounts
   */
  useEffect(() => {
    return () => detach();
  }, []);

  useUpdateEffect(() => {
    if (!isDragging) {
      detach();
    }
  }, [isDragging]);

  cleanUpRef.current.mousedown = useEventListener(
    "mousedown",
    onMouseDown,
    rootRef.current,
  );

  cleanUpRef.current.touchstart = useEventListener(
    "touchstart",
    onTouchStart,
    rootRef.current,
  );

  return {
    actions,
    state: {
      min,
      max,
      value,
      isDragging,
      isDisabled,
      isReadOnly,
      orientation,
    },
    refs: {
      rootRef,
      trackRef,
      thumbRef,
    },
    handlers: {
      onKeyDown,
    },
    styles: {
      rootStyle,
      trackStyle,
      innerTrackStyle,
      thumbStyle,
    },
  };
}

export type SliderStateReturn = ReturnType<typeof useSliderState>;
