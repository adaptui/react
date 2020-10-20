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
import { useControllableState } from "@chakra-ui/hooks";

import { useSegmentState } from "../segment";
import { useCalendarState } from "../calendar";
import { DateTimeFormatOpts, RangeValueBase } from "../utils/types";
import { isInvalidDateRange, parseDate, stringifyDate } from "../utils";
import { PickerBaseInitialState, usePickerBaseState } from "../picker-base";

export interface DatePickerInitialState
  extends PickerBaseInitialState,
    Validation,
    FocusableProps,
    ValueBase<string>,
    RangeValueBase<string> {
  placeholderDate?: string;
  formatOptions?: DateTimeFormatOpts;
}

export const useDatePickerState = (props: DatePickerInitialState = {}) => {
  const {
    value: initialDate,
    defaultValue: defaultValueProp = stringifyDate(new Date()),
    onChange: onChangeProp,
    minValue: minValueProp,
    maxValue: maxValueProp,
    isRequired,
    autoFocus,
    formatOptions,
    placeholderDate: placeholderDateProp,
  } = props;

  const onChange = React.useCallback(
    (date: Date) => {
      return onChangeProp?.(stringifyDate(date));
    },
    [onChangeProp],
  );

  const [value, setValue] = useControllableState({
    value: parseDate(initialDate),
    defaultValue:
      parseDate(defaultValueProp) || parseDate(stringifyDate(new Date())),
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  const minValue = parseDate(minValueProp);
  const maxValue = parseDate(maxValueProp);
  const placeholderDate = parseDate(placeholderDateProp);

  const selectDate = (newValue: string) => {
    const newDate = parseDate(newValue);
    if (newDate) setValue(newDate);
    popover.hide();
  };

  const segmentState = useSegmentState({
    value,
    onChange: setValue,
    formatOptions,
    placeholderDate,
  });
  const popover = usePickerBaseState({ focus: segmentState.first, ...props });
  const calendar = useCalendarState({
    value: stringifyDate(value),
    onChange: selectDate,
    minValue: minValueProp,
    maxValue: maxValueProp,
  });

  const validationState: ValidationState =
    props.validationState ||
    (isInvalidDateRange(value, minValue, maxValue) ? "invalid" : "valid");

  React.useEffect(() => {
    if (popover.visible) {
      calendar.setFocused(true);
      calendar.focusCell(value);
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
    dateValue: value,
    setDateValue: setValue,
    selectDate,
    validationState,
    minValue,
    maxValue,
    isRequired,
    ...popover,
    ...segmentState,
    calendar,
    isRangeCalendar: false,
  };
};

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>;
