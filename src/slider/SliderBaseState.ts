import * as React from "react";
import { useNumberFormatter } from "@react-aria/i18n";
import { snapValueToStep } from "@react-aria/utils";

import { clamp, useControlledState } from "../utils";

export interface SliderBaseState {
  /**
   * Values managed by the slider by thumb index.
   */
  values: number[];

  /**
   * Currently-focused thumb index.
   */
  focusedThumb: number | undefined;

  /**
   * The slider's step value.
   * @default 1
   */
  step: number;
}

export interface SliderBaseAction {
  /**
   * Get Thumb value based on its index
   * @param index
   */
  getThumbValue: (index: number) => number;

  /**
   * Sets the value for the specified thumb.
   * The actual value set will be clamped and rounded according to min/max/step.
   * @param index
   * @param value
   */
  setThumbValue: (index: number, value: number) => void;

  /**
   * Sets value for the specified thumb by percent offset (between 0 and 1).
   * @param index
   * @param percent
   */
  setThumbPercent: (index: number, percent: number) => void;

  /**
   * Whether the specific thumb is being dragged.
   * @param index
   */
  isThumbDragging: (index: number) => boolean;

  /**
   * Set is dragging on the specified thumb.
   * @param index
   * @param dragging
   */
  setThumbDragging: (index: number, dragging: boolean) => void;

  /**
   * Set focused true on specified thumb. This will remove focus from
   * any thumb that had it before.
   * @param index
   */
  setFocusedThumb: (index: number | undefined) => void;

  /**
   * Returns the specified thumb's value as a percentage from 0 to 1.
   * @param index
   */
  getThumbPercent(index: number): number;

  /**
   * Returns the value as a percent between the min and max of the slider.
   * @param index
   */
  getValuePercent(value: number): number;

  /**
   * Returns the string label for the specified thumb's value, per props.formatOptions.
   * @param index
   */
  getThumbValueLabel(index: number): string;

  /**
   * Returns the string label for the value, per props.formatOptions.
   * @param index
   */
  getFormattedValue(value: number): string;

  /**
   * Returns the min allowed value for the specified thumb.
   * @param index
   */
  getThumbMinValue(index: number): number;

  /**
   * Returns the max allowed value for the specified thumb.
   * @param index
   */
  getThumbMaxValue(index: number): number;

  /**
   * Converts a percent along track (between 0 and 1) to the corresponding value.
   * @param percent
   */
  getPercentValue(percent: number): number;

  /**
   * Returns if the specified thumb is editable.
   * @param index
   */
  isThumbEditable(index: number): boolean;

  /**
   * Set the specified thumb's editable state.
   * @param index
   * @param editable
   */
  setThumbEditable(index: number, editable: boolean): void;
}

export type SliderBaseInitialState = Partial<Pick<SliderBaseState, "step">> & {
  /**
   * The slider's minimum value.
   * @default 0
   */
  minValue?: number;

  /**
   * The slider's maximum value.
   * @default 100
   */
  maxValue?: number;

  /** Whether the whole Slider is disabled. */
  isDisabled?: boolean;

  /** The current value (controlled). */
  value?: number[];

  /** The default value (uncontrolled). */
  defaultValue?: number[];

  /** Handler that is called when the value changes. */
  onChange?: (value: number[]) => void;

  /**
   * Get the value when dragging is started
   */
  onChangeEnd?: (value: number[]) => void;

  /**
   * The display format of the value label.
   */
  formatOptions?: Intl.NumberFormatOptions;
};

export type SliderBaseStateReturn = SliderBaseState & SliderBaseAction;

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP_VALUE = 1;

export function useSliderBaseState(
  props: SliderBaseInitialState = {},
): SliderBaseStateReturn {
  const {
    isDisabled,
    minValue = DEFAULT_MIN_VALUE,
    maxValue = DEFAULT_MAX_VALUE,
    step = DEFAULT_STEP_VALUE,
  } = props;

  const [values, setValues] = useControlledState<number[]>(
    props.value as any,
    props.defaultValue ?? ([minValue] as any),
    props.onChange as any,
  );
  const [isDraggings, setDraggings] = React.useState<boolean[]>(
    new Array(values.length).fill(false),
  );
  const isEditablesRef = React.useRef<boolean[]>(
    new Array(values.length).fill(true),
  );
  const [focusedIndex, setFocusedIndex] = React.useState<number | undefined>(
    undefined,
  );

  const valuesRef = React.useRef<number[]>(null);
  // @ts-ignore
  valuesRef.current = values;
  const isDraggingsRef = React.useRef<boolean[]>(null);
  // @ts-ignore
  isDraggingsRef.current = isDraggings;

  const formatter = useNumberFormatter(props.formatOptions);

  function getValuePercent(value: number) {
    return (value - minValue) / (maxValue - minValue);
  }

  function getThumbMinValue(index: number) {
    return index === 0 ? minValue : values[index - 1];
  }
  function getThumbMaxValue(index: number) {
    return index === values.length - 1 ? maxValue : values[index + 1];
  }

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
    value = snapValueToStep(value, thisMin, thisMax, step);
    // @ts-ignore
    valuesRef.current = replaceIndex(valuesRef.current, index, value);
    setValues(valuesRef.current);
  }

  function updateDragging(index: number, dragging: boolean) {
    if (isDisabled || !isThumbEditable(index)) {
      return;
    }

    // @ts-ignore
    const wasDragging = isDraggingsRef.current[index];
    // @ts-ignore
    isDraggingsRef.current = replaceIndex(
      // @ts-ignore
      isDraggingsRef.current,
      index,
      dragging,
    );
    setDraggings(isDraggingsRef.current);

    // Call onChangeEnd if no handles are dragging.
    if (
      props.onChangeEnd &&
      wasDragging &&
      !isDraggingsRef.current.some(Boolean)
    ) {
      // @ts-ignore
      props.onChangeEnd(valuesRef.current);
    }
  }

  function getFormattedValue(value: number) {
    return formatter.format(value);
  }

  function setThumbPercent(index: number, percent: number) {
    updateValue(index, getPercentValue(percent));
  }

  function getRoundedValue(value: number) {
    return Math.round((value - minValue) / step) * step + minValue;
  }

  function getPercentValue(percent: number) {
    const val = percent * (maxValue - minValue) + minValue;
    return clamp(getRoundedValue(val), minValue, maxValue);
  }

  return {
    values,
    getThumbValue: (index: number) => values[index],
    setThumbValue: updateValue,
    setThumbPercent,
    isThumbDragging: (index: number) => isDraggings[index],
    setThumbDragging: updateDragging,
    focusedThumb: focusedIndex,
    setFocusedThumb: setFocusedIndex,
    getThumbPercent: (index: number) => getValuePercent(values[index]),
    getValuePercent,
    getThumbValueLabel: (index: number) => getFormattedValue(values[index]),
    getFormattedValue,
    getThumbMinValue,
    getThumbMaxValue,
    getPercentValue,
    isThumbEditable,
    setThumbEditable,
    step,
  };
}

function replaceIndex<T>(array: T[], index: number, value: T) {
  if (array[index] === value) {
    return array;
  }

  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}
