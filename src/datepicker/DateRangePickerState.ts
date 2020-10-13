/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useDatePickerState](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/datepicker/src/useDatePickerState.ts)
 * to work with Reakit System
 */

import {
  Validation,
  FocusableProps,
  ValueBase,
  RangeValue,
  ValidationState,
} from "@react-types/shared";
import * as React from "react";
import { useCompositeState } from "reakit";
import { useControllableState } from "@chakra-ui/hooks";

import { useSegmentState } from "../segment";
import { setTime, isInvalid } from "./__utils";
import { convertValue } from "../segment/__utils";
import { convertRange } from "../calendar/__utils";
import { useRangeCalendarState } from "../calendar";
import { PickerBaseInitialState, usePickerBaseState } from "../picker-base";
import { DateTimeFormatOpts, DateValue, RangeValueBase } from "../utils/types";

export interface DateRangePickerInitialState
  extends PickerBaseInitialState,
    Validation,
    FocusableProps,
    ValueBase<RangeValue<DateValue>>,
    RangeValueBase<DateValue> {
  placeholderDate?: DateValue;
  formatOptions?: DateTimeFormatOpts;
}

export const useDateRangePickerState = (
  props: DateRangePickerInitialState = {},
) => {
  const {
    value: initialDate,
    defaultValue: defaultValueProp,
    onChange,
    minValue: minValueProp,
    maxValue: maxValueProp,
    isRequired,
    autoFocus,
    formatOptions,
    placeholderDate: placeholderDateProp,
  } = props;

  const [value, setValue] = useControllableState({
    value: initialDate,
    defaultValue: defaultValueProp && convertRange(defaultValueProp),
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  const minValue = convertValue(minValueProp);
  const maxValue = convertValue(maxValueProp);
  const placeholderDate = convertValue(placeholderDateProp);

  // Intercept setValue to make sure the Time section is not changed by date selection in Calendar
  const selectDate = (range: RangeValue<DateValue>) => {
    if (range) {
      setTime(new Date(range.start), new Date(value.start));
      setTime(new Date(range.end), new Date(value.end));
    }
    setValue(range);

    popover.hide();
  };

  const segmentComposite = useCompositeState({ orientation: "horizontal" });
  const startSegmentState = useSegmentState({
    value: convertValue(value.start),
    defaultValue: convertValue(defaultValueProp?.start),
    onChange: date => setValue({ start: date, end: value.end }),
    formatOptions,
    placeholderDate,
  });

  const endSegmentState = useSegmentState({
    value: convertValue(value.end),
    defaultValue: convertValue(defaultValueProp?.end),
    onChange: date => setValue({ start: value.start, end: date }),
    formatOptions,
    placeholderDate,
  });

  const popover = usePickerBaseState({
    focus: segmentComposite.first,
    ...props,
  });
  const calendar = useRangeCalendarState({
    value: value,
    onChange: selectDate,
    defaultValue: defaultValueProp,
  });

  const validationState: ValidationState | null =
    props.validationState ||
    (value != null &&
    (isInvalid(value.start as Date, props.minValue, props.maxValue) ||
      isInvalid(value.end as Date, props.minValue, props.maxValue) ||
      (value.end != null && value.start != null && value.end < value.start))
      ? "invalid"
      : null);

  React.useEffect(() => {
    if (popover.visible) {
      calendar.setFocused(true);
      value.start && calendar.focusCell(new Date(value.start));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popover.visible]);

  React.useEffect(() => {
    if (autoFocus) {
      segmentComposite.first();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, segmentComposite.first]);

  return {
    dateValue: value,
    setDateValue: setValue,
    selectDate,
    validationState,
    minValue,
    maxValue,
    isRequired,
    ...popover,
    startSegmentState: { ...startSegmentState, ...segmentComposite },
    endSegmentState: { ...endSegmentState, ...segmentComposite },
    calendar,
  };
};

export type DateRangePickerStateReturn = ReturnType<
  typeof useDateRangePickerState
>;
