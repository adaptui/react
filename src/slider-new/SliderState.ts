import * as React from "react";
import { useCompositeState } from "reakit";
import { useNumberFormatter } from "@react-aria/i18n";
import { Item } from "reakit/ts/Composite/__utils/types";
import { SealedInitialState, useSealedState } from "reakit-utils";

import { getOptimumValue, clamp } from "../utils";

export interface SliderState {
  /**
   * The `value` of the slider indicator.
   * If `undefined`/`not valid` the slider bar will be the optimum of min & max
   * @default [50]
   */
  values: number[];
  /**
   * The minimum value of the slider
   * @default 0
   */
  min: number;
  /**
   * The maximum value of the slider
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
   * @default false
   */
  isDisabled: boolean;
  /**
   * orientation of the slider
   * @default "horizontal"
   */
  orientation: "horizontal" | "vertical";
  /**
   * The track slider element.
   */
  trackRef: React.RefObject<HTMLElement | null>;
  /**
   * Currently focused thumb
   */
  focusedThumb: number | undefined;
  /**
   * Get Thumb value based on its index
   */
  getThumbValue: (index: number) => number;
  /**
   * Returns a percentage from 0 to 1 with respect to min & max
   */
  getValuePercent: (value: number) => number;
  /**
   * Returns the value offset as a percentage from 0 to 1.
   */
  getThumbPercent: (index: number) => number;
  /**
   * Returns the min values for the index
   */
  getThumbMinValue: (index: number) => number;
  /**
   * Returns the max values for the index
   */
  getThumbMaxValue: (index: number) => number;
  /**
   * Returns the string label for the value, per props.formatOptions
   */
  getFormattedValue: (value: number) => string;
  /**
   * Returns the formatted thumb value based on it's index
   */
  getThumbValueLabel: (index: number) => string;
  /**
   * Converts a percent along track (between 0 and 1) to the corresponding value
   */
  getPercentValue: (percent: number) => number;
  /**
   * Get editableThumb based on the index
   */
  isThumbEditable: (index: number) => boolean;
  /**
   *  Whether a specific index is being dragged
   */
  isThumbDragging: (index: number) => boolean;
  /**
   * Get all the inputs in the DOM
   */
  inputs: Item[];
  /**
   * Register the inputs on mount
   */
  registerInput: (item: Item) => void;
  /**
   * Unregister the inputs on mount
   */
  unregisterInput: (id: string) => void;
}

export interface SliderAction {
  /**
   * Set currently Focused Thumb
   */
  setFocusedThumb: (index: number | undefined) => void;
  /**
   * Sets value for thumb.  The actually value set will be clamped and
   * rounded according to min/max/step
   */
  setThumbValue: (index: number, value: number) => void;
  /**
   * Sets value for thumb by percent offset (between 0 and 1)
   */
  setThumbPercent: (index: number, percent: number) => void;
  /**
   * Set true if the thumb registered is editable
   */
  setThumbEditable: (index: number, editable: boolean) => void;
  /**
   * set dragging true if the thumb registered is being currently dragged
   */
  setThumbDragging: (index: number, dragging: boolean) => void;
}

export type SliderInitialState = Pick<
  Partial<SliderState>,
  "values" | "min" | "max" | "step" | "isDisabled" | "orientation"
> & {
  /**
   * Get the value when dragging is started
   */
  onChangeEnd?: (value: number[]) => void;
  /**
   * Get the value when dragging is stopped
   */
  onChangeStart?: (value: number[]) => void;
  /**
   * Get the formated value based on number format options
   */
  formatOptions?: Intl.NumberFormatOptions;
};

export type SliderStateReturn = SliderState & SliderAction;

export function useSliderState(
  initialState: SealedInitialState<SliderInitialState> = {},
): SliderStateReturn {
  const {
    values: valuesProp,
    min = 0,
    max = 100,
    step = 1,
    isDisabled = false,
    orientation = "horizontal",
    onChangeStart,
    onChangeEnd,
    formatOptions,
  } = useSealedState(initialState);

  const initialValues = valuesProp ? valuesProp : [getOptimumValue(min, max)];
  const [values, setValues] = React.useState(
    bulkClamp(initialValues, min, max),
  );
  const [focusedThumb, setFocusedThumb] = React.useState<number | undefined>(
    undefined,
  );

  const trackRef = React.useRef<HTMLDivElement>(null);
  const inputs = useCompositeState();
  const valuesRef = React.useRef<number[]>(values);
  valuesRef.current = values;

  // Get & Set Editable Thumb
  const isEditablesRef = React.useRef<boolean[]>(
    new Array(values.length).fill(true),
  );

  function isThumbEditable(index: number) {
    return isEditablesRef.current[index];
  }

  const setThumbEditable = React.useCallback(
    (index: number, editable: boolean) => {
      isEditablesRef.current[index] = editable;
    },
    [],
  );

  const [isDraggings, setDraggings] = React.useState<boolean[]>(
    new Array(values.length).fill(false),
  );

  const isDraggingsRef = React.useRef<boolean[]>(isDraggings);
  isDraggingsRef.current = isDraggings;

  function isThumbDragging(index: number) {
    return isDraggings[index];
  }

  function setThumbDragging(index: number, dragging: boolean) {
    if (isDisabled || !isThumbEditable(index)) {
      return;
    }

    const wasDragging = isDraggingsRef.current[index];
    isDraggingsRef.current = replaceIndex(
      isDraggingsRef.current,
      index,
      dragging,
    );

    setDraggings(isDraggingsRef.current);

    // Call onChangeEnd if no handles are dragging.
    if (!wasDragging && isDraggingsRef.current.every(Boolean)) {
      onChangeStart?.(valuesRef.current);
    }

    // Call onChangeEnd if no handles are dragging.
    if (wasDragging && !isDraggingsRef.current.some(Boolean)) {
      onChangeEnd?.(valuesRef.current);
    }
  }

  // Get and Set values based on the index
  function getThumbValue(index: number) {
    return values[index];
  }

  function setThumbValue(index: number, value: number) {
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

  function setThumbPercent(index: number, percent: number) {
    setThumbValue(index, getPercentValue(percent));
  }

  function getValuePercent(value: number) {
    return (value - min) / (max - min);
  }

  function getThumbPercent(index: number) {
    return getValuePercent(values[index]);
  }

  function getRoundedValue(value: number) {
    return Math.round((value - min) / step) * step + min;
  }

  function getPercentValue(percent: number) {
    const val = percent * (max - min) + min;
    return clamp(getRoundedValue(val), min, max);
  }

  function getThumbMinValue(index: number) {
    return index === 0 ? min : values[index - 1];
  }

  function getThumbMaxValue(index: number) {
    return index === values.length - 1 ? max : values[index + 1];
  }

  const formatter = useNumberFormatter(formatOptions);

  function getFormattedValue(value: number) {
    return formatter.format(value);
  }

  function getThumbValueLabel(index: number) {
    return getFormattedValue(values[index]);
  }

  return {
    values,
    min,
    max,
    step,
    isDisabled,
    orientation,
    trackRef,
    focusedThumb,
    setFocusedThumb,
    getThumbValue,
    setThumbValue,
    setThumbPercent,
    getThumbPercent,
    getValuePercent,
    getThumbMinValue,
    getThumbMaxValue,
    getPercentValue,
    getFormattedValue,
    getThumbValueLabel,
    isThumbEditable,
    setThumbEditable,
    isThumbDragging,
    setThumbDragging,
    inputs: inputs.items,
    registerInput: inputs.registerItem,
    unregisterInput: inputs.unregisterItem,
  };
}

function replaceIndex<T>(array: T[], index: number, value: T) {
  if (array[index] === value) {
    return array;
  }

  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}

function bulkClamp(values: number[], min: number, max: number) {
  return values.reduce<number[]>(
    (acc, value) => [...acc, clamp(value, min, max)],
    [],
  );
}
