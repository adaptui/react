import { useNumberFormatter } from "@react-aria/i18n";
import { useSliderState } from "@react-stately/slider";
import { SliderProps } from "@react-types/slider";

export function useSliderBaseState(
  props: SliderBaseStateProps = {},
): SliderBaseState {
  const numberFormatter = useNumberFormatter(props.formatOptions);
  const state = useSliderState({ ...props, numberFormatter });

  return state;
}

export interface SliderBaseState {
  /**
   * Values managed by the slider by thumb index.
   */
  readonly values: number[];
  /**
   * Currently-focused thumb index.
   */
  readonly focusedThumb: number | undefined;
  /**
   * The slider's step value.
   * @default 1
   */
  readonly step: number;
  /**
   * The page size for the slider, used to do a bigger step.
   */
  readonly pageSize: number;
  /**
   * Get Thumb value based on its index
   * @param index
   */
  getThumbValue(index: number): number;
  /**
   * Sets the value for the specified thumb.
   * The actual value set will be clamped and rounded according to min/max/step.
   * @param index
   * @param value
   */
  setThumbValue(index: number, value: number): void;
  /**
   * Sets value for the specified thumb by percent offset (between 0 and 1).
   * @param index
   * @param percent
   */
  setThumbPercent(index: number, percent: number): void;
  /**
   * Whether the specific thumb is being dragged.
   * @param index
   */
  isThumbDragging(index: number): boolean;
  /**
   * Set is dragging on the specified thumb.
   * @param index
   * @param dragging
   */
  setThumbDragging(index: number, dragging: boolean): void;
  /**
   * Set focused true on specified thumb. This will remove focus from
   * any thumb that had it before.
   * @param index
   */
  setFocusedThumb(index: number | undefined): void;
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
  /**
   * Increments the value of the thumb by the step or page amount.
   */
  incrementThumb(index: number, stepSize?: number): void;
  /**
   * Decrements the value of the thumb by the step or page amount.
   */
  decrementThumb(index: number, stepSize?: number): void;
}

export type SliderBaseStateProps = SliderProps & {
  /**
   * The display format of the value label.
   */
  formatOptions?: Intl.NumberFormatOptions;
};
