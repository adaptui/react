import { CalendarDate } from "@internationalized/date";
import { FieldOptions, useDatePickerState } from "@react-stately/datepicker";
import {
  DatePickerProps,
  DateValue,
  Granularity,
  TimeValue,
} from "@react-types/datepicker";
import { ValidationState } from "@react-types/shared";

export function useDatePickerBaseState(
  props: DatePickerBaseStateProps,
): DatePickerBaseState {
  const state = useDatePickerState(props);

  return state;
}

export type DatePickerBaseState = {
  /** The currently selected date. */
  value: DateValue;
  /** Sets the selected date. */
  setValue(value: DateValue): void;
  /**
   * The date portion of the value. This may be set prior to `value` if the user has
   * selected a date but has not yet selected a time.
   */
  dateValue: DateValue;
  /** Sets the date portion of the value. */
  setDateValue(value: CalendarDate): void;
  /**
   * The time portion of the value. This may be set prior to `value` if the user has
   * selected a time but has not yet selected a date.
   */
  timeValue: TimeValue;
  /** Sets the time portion of the value. */
  setTimeValue(value: TimeValue): void;
  /** The granularity for the field, based on the `granularity` prop and current value. */
  granularity: Granularity;
  /** Whether the date picker supports selecting a time, according to the `granularity` prop and current value. */
  hasTime: boolean;
  /** Whether the calendar popover is currently open. */
  isOpen: boolean;
  /** Sets whether the calendar popover is open. */
  setOpen(isOpen: boolean): void;
  /** The current validation state of the date picker, based on the `validationState`, `minValue`, and `maxValue` props. */
  validationState: ValidationState;
  /** Formats the selected value using the given options. */
  formatValue(locale: string, fieldOptions: FieldOptions): string;
};

export type DatePickerBaseStateProps = DatePickerProps<DateValue> & {
  /**
   * Determines whether the date picker popover should close automatically when a date is selected.
   * @default true
   */
  shouldCloseOnSelect?: boolean | (() => boolean);
};
