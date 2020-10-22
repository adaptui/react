/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the Slider Component [Slider](https://github.com/chakra-ui/chakra-ui/tree/develop/packages/Slider)
 * to work with Reakit System
 */
import * as React from "react";
import { SealedInitialState, useSealedState } from "reakit-utils";
import { useNumberFormatter } from "@react-aria/i18n";
import { getOptimumValue, clamp, isNull } from "../utils";

export interface SliderState {
  /**
   * The `value` of the meter indicator.
   * If `undefined`/`not valid` the meter bar will be equal to `min`
   * @default 0
   */
  values: number[];
  /**
   * The minimum value of the meter
   * @default 0
   */
  min: number;
  /**
   * The maximum value of the meter
   * @default 100
   */
  max: number;
  /**
   * The step in which increments/decrements have to be made
   * @default 1
   */
  step: number;
  /**
   * If `true`, the slider will be disabled
   */
  isDisabled?: boolean;
  /**
   * The popover element.
   */
  trackRef: React.RefObject<HTMLElement | null>;
  /**
   * The arrow element.
   */
  inputRef: React.RefObject<HTMLElement | null>;
  /**
   * orientation of the slider
   * @default "horizontal"
   */
  orientation: "horizontal" | "vertical";

  getThumbValue: (index: number) => number;

  // Sets value for thumb.  The actually value set will be clamped and
  // rounded according to min/max/step
  setThumbValue: (index: number, value: number) => void;

  // Sets value for thumb by percent offset (between 0 and 1)
  setThumbPercent: (index: number, percent: number) => void;

  // Whether a specific index is being dragged
  isThumbDragging: (index: number) => boolean;
  setThumbDragging: (index: number, dragging: boolean) => void;

  // Currently-focused index
  readonly focusedThumb: number | undefined;
  setFocusedThumb: (index: number | undefined) => void;

  // Returns the value offset as a percentage from 0 to 1.
  getThumbPercent: (index: number) => number;
  getValuePercent: (value: number) => number;

  // Returns the min and max values for the index
  getThumbMinValue: (index: number) => number;
  getThumbMaxValue: (index: number) => number;

  // Converts a percent along track (between 0 and 1) to the corresponding value
  getPercentValue: (percent: number) => number;

  // editable
  isThumbEditable: (index: number) => boolean;
  setThumbEditable: (index: number, editable: boolean) => void;

  // Returns the string label for the value, per props.formatOptions
  getThumbValueLabel: (index: number) => string;
  getFormattedValue: (value: number) => string;
}

export interface SliderAction {
  /**
   * Update the value of the progress indicator
   */
  setValues?: React.Dispatch<React.SetStateAction<number[]>>;
}

export type SliderInitialState = Partial<
  Pick<
    SliderState,
    "values" | "min" | "max" | "step" | "isDisabled" | "orientation"
  >
> & {
  formatOptions?: Intl.NumberFormatOptions;
};

export type SliderStateReturn = SliderState & SliderAction;

export function useSliderState(
  initialState: SealedInitialState<SliderInitialState> = {},
): SliderStateReturn {
  const {
    values: initialValues,
    min = 0,
    max = 100,
    step = 1,
    isDisabled,
    orientation = "horizontal",
    formatOptions,
  } = useSealedState(initialState);
  const [values, setValues] = React.useState(
    clampValues(initialValues, min, max),
  );

  const trackRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [focusedIndex, setFocusedIndex] = React.useState<number | undefined>(
    undefined,
  );
  const [isDraggings, setDraggings] = React.useState<boolean[]>(
    new Array(values.length).fill(false),
  );

  const valuesRef = React.useRef<number[]>(values);
  valuesRef.current = values;
  const isDraggingsRef = React.useRef<boolean[]>(isDraggings);
  isDraggingsRef.current = isDraggings;
  const isEditablesRef = React.useRef<boolean[]>(
    new Array(values.length).fill(true),
  );

  function isThumbEditable(index: number) {
    return isEditablesRef.current[index];
  }

  function setThumbEditable(index: number, editable: boolean) {
    isEditablesRef.current[index] = editable;
  }

  function updateValue(index: number, value: number) {
    if (isDisabled || !isThumbEditable(index)) {
      return;
    }

    const thisMin = getThumbMinValue(index);
    const thisMax = getThumbMaxValue(index);

    // Round value to multiple of step, clamp value between min and max
    value = clamp(getRoundedValue(value), thisMin, thisMax);
    valuesRef.current = replaceIndex(valuesRef.current, index, value);
    setValues(valuesRef.current);
  }

  function updateDragging(index: number, dragging: boolean) {
    if (isDisabled || !isThumbEditable(index)) {
      return;
    }

    // const wasDragging = isDraggingsRef.current[index];
    isDraggingsRef.current = replaceIndex(
      isDraggingsRef.current,
      index,
      dragging,
    );

    setDraggings(isDraggingsRef.current);

    // Call onChangeEnd if no handles are dragging.
    // if (
    //   props.onChangeEnd &&
    //   wasDragging &&
    //   !isDraggingsRef.current.some(Boolean)
    // ) {
    //   props.onChangeEnd(valuesRef.current);
    // }
  }

  function setThumbPercent(index: number, percent: number) {
    updateValue(index, getPercentValue(percent));
  }

  function getValuePercent(value: number) {
    return (value - min) / (max - min);
  }

  function getThumbMinValue(index: number) {
    return index === 0 ? min : values[index - 1];
  }

  function getThumbMaxValue(index: number) {
    return index === values.length - 1 ? max : values[index + 1];
  }

  function getRoundedValue(value: number) {
    return Math.round((value - min) / step) * step + min;
  }

  function getPercentValue(percent: number) {
    const val = percent * (max - min) + min;
    return clamp(getRoundedValue(val), min, max);
  }

  const formatter = useNumberFormatter(formatOptions);

  function getFormattedValue(value: number) {
    return formatter.format(value);
  }

  return {
    values,
    min,
    max,
    step,
    isDisabled,
    setValues,
    getThumbValue: (index: number) => values[index],
    setThumbValue: updateValue,
    setThumbPercent,
    isThumbDragging: (index: number) => isDraggings[index],
    setThumbDragging: updateDragging,
    focusedThumb: focusedIndex,
    setFocusedThumb: setFocusedIndex,
    getThumbPercent: (index: number) => getValuePercent(values[index]),
    getValuePercent,
    getThumbMinValue,
    getThumbMaxValue,
    getPercentValue,
    isThumbEditable,
    setThumbEditable,
    getFormattedValue,
    getThumbValueLabel: (index: number) => getFormattedValue(values[index]),
    trackRef,
    inputRef,
    orientation,
  };
}

function replaceIndex<T>(array: T[], index: number, value: T) {
  if (array[index] === value) {
    return array;
  }

  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}

function clampValues(values: number[] | undefined, min: number, max: number) {
  if (!values) return [getOptimumValue(min, max)];

  return values.reduce<number[]>(
    (acc, value) => [...acc, Math.min(Math.max(value, min), max)],
    [],
  );
}
