import { Calendar, DateFormatter } from "@internationalized/date";
import { FieldOptions, useDateFieldState } from "@react-stately/datepicker";
import {
  DatePickerProps,
  DateValue,
  Granularity,
} from "@react-types/datepicker";
import { ValidationState } from "@react-types/shared";

export function useDateFieldBaseState(
  props: DateFieldBaseStateProps,
): DateFieldBaseState {
  const state = useDateFieldState(props);

  return state;
}

export type SegmentType =
  | "era"
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute"
  | "second"
  | "dayPeriod"
  | "literal"
  | "timeZoneName";

export interface DateSegment {
  /** The type of segment. */
  type: SegmentType;
  /** The formatted text for the segment. */
  text: string;
  /** The numeric value for the segment, if applicable. */
  value?: number;
  /** The minimum numeric value for the segment, if applicable. */
  minValue?: number;
  /** The maximum numeric value for the segment, if applicable. */
  maxValue?: number;
  /** Whether the value is a placeholder. */
  isPlaceholder: boolean;
  /** Whether the segment is editable. */
  isEditable: boolean;
}

export type DateFieldBaseState = {
  /** The current field value. */
  value: DateValue;
  /** The current value, converted to a native JavaScript `Date` object.  */
  dateValue: Date;
  /** Sets the field's value. */
  setValue(value: DateValue): void;
  /** A list of segments for the current value. */
  segments: DateSegment[];
  /** A date formatter configured for the current locale and format. */
  dateFormatter: DateFormatter;
  /** The current validation state of the date field, based on the `validationState`, `minValue`, and `maxValue` props. */
  validationState: ValidationState;
  /** The granularity for the field, based on the `granularity` prop and current value. */
  granularity: Granularity;
  /** Whether the field is disabled. */
  isDisabled: boolean;
  /** Whether the field is read only. */
  isReadOnly: boolean;
  /** Whether the field is required. */
  isRequired: boolean;
  /** Increments the given segment. Upon reaching the minimum or maximum value, the value wraps around to the opposite limit. */
  increment(type: SegmentType): void;
  /** Decrements the given segment. Upon reaching the minimum or maximum value, the value wraps around to the opposite limit. */
  decrement(type: SegmentType): void;
  /**
   * Increments the given segment by a larger amount, rounding it to the nearest increment.
   * The amount to increment by depends on the field, for example 15 minutes, 7 days, and 5 years.
   * Upon reaching the minimum or maximum value, the value wraps around to the opposite limit.
   */
  incrementPage(type: SegmentType): void;
  /**
   * Decrements the given segment by a larger amount, rounding it to the nearest increment.
   * The amount to decrement by depends on the field, for example 15 minutes, 7 days, and 5 years.
   * Upon reaching the minimum or maximum value, the value wraps around to the opposite limit.
   */
  decrementPage(type: SegmentType): void;
  /** Sets the value of the given segment. */
  setSegment(type: SegmentType, value: number): void;
  /**
   * Replaces the value of the date field with the placeholder value.
   * If a segment type is provided, only that segment is confirmed. Otherwise, all segments that have not been entered yet are confirmed.
   */
  confirmPlaceholder(type?: SegmentType): void;
  /** Clears the value of the given segment, reverting it to the placeholder. */
  clearSegment(type: SegmentType): void;
  /** Formats the current date value using the given options. */
  formatValue(fieldOptions: FieldOptions): string;
};

export type DateFieldBaseStateProps = DatePickerProps<DateValue> & {
  /**
   * The maximum unit to display in the date field.
   * @default 'year'
   */
  maxGranularity?: "year" | "month" | Granularity;
  /** The locale to display and edit the value according to. */
  locale: string;
  /**
   * A function that creates a [Calendar](../internationalized/date/Calendar.html)
   * object for a given calendar identifier. Such a function may be imported from the
   * `@internationalized/date` package, or manually implemented to include support for
   * only certain calendars.
   */
  createCalendar: (name: string) => Calendar;
};
