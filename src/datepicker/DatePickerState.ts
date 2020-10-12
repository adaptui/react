/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useDatePickerState](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/datepicker/src/useDatePickerState.ts)
 * to work with Reakit System
 */

import {
  Validation,
  FocusableProps,
  ValueBase,
  ValidationState,
} from "@react-types/shared";
import * as React from "react";
import { isValid } from "date-fns";
import { useControllableState } from "@chakra-ui/hooks";

import { useSegmentState } from "../segment";
import { useCalendarState } from "../calendar";
import { setTime, isInvalid } from "./__utils";
import { PickerBaseInitialState, usePickerBaseState } from "../picker-base";
import { DateTimeFormatOpts, DateValue, RangeValueBase } from "../utils/types";

export interface DatePickerInitialState
  extends PickerBaseInitialState,
    Validation,
    FocusableProps,
    ValueBase<DateValue>,
    RangeValueBase<DateValue> {
  placeholderDate?: DateValue;
  formatOptions?: DateTimeFormatOpts;
}

export const useDatePickerState = (props: DatePickerInitialState = {}) => {
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

  const defaultValue =
    defaultValueProp && isValid(defaultValueProp)
      ? new Date(defaultValueProp)
      : new Date();

  const [value, setValue] = useControllableState({
    value: initialDate,
    defaultValue,
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  const dateValue = value && isValid(value) ? new Date(value) : undefined;
  const minValue =
    minValueProp && isValid(minValueProp) ? new Date(minValueProp) : undefined;
  const maxValue =
    maxValueProp && isValid(maxValueProp) ? new Date(maxValueProp) : undefined;
  const placeholderDate =
    placeholderDateProp && isValid(placeholderDateProp)
      ? new Date(placeholderDateProp)
      : undefined;

  // Intercept setValue to make sure the Time section is not changed by date selection in Calendar
  const selectDate = (newValue: DateValue) => {
    if (dateValue) {
      setTime(new Date(newValue), dateValue);
    }

    setValue(newValue);
    popover.hide();
  };

  const segmentState = useSegmentState({
    value: dateValue,
    defaultValue,
    onChange: setValue,
    formatOptions,
    placeholderDate,
  });
  const popover = usePickerBaseState({ focus: segmentState.first, ...props });
  const calendar = useCalendarState({
    value: dateValue,
    defaultValue,
    onChange: selectDate,
  });

  const validationState: ValidationState =
    props.validationState ||
    (isInvalid(dateValue, props.minValue, props.maxValue)
      ? "invalid"
      : "valid");

  React.useEffect(() => {
    if (popover.visible) {
      calendar.setFocused(true);
      dateValue && calendar.focusCell(dateValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popover.visible]);

  React.useEffect(() => {
    if (autoFocus) {
      segmentState.first();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, segmentState.first]);

  return {
    dateValue,
    setDateValue: setValue,
    selectDate,
    validationState,
    minValue,
    maxValue,
    isRequired,
    ...popover,
    ...segmentState,
    calendar,
  };
};

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>;
