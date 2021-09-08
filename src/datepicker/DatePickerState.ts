/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useDatePickerState](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/datepicker/src/useDatePickerState.ts)
 * to work with Reakit System
 */

import * as React from "react";
import { Validation, ValueBase, ValidationState } from "@react-types/shared";

import { useCalendarState } from "../calendar";
import { RangeValueBase } from "../utils/types";
import { toUTCString, useControllableState } from "../utils";
import { SegmentInitialState, useSegmentState } from "../segment";
import { PickerBaseInitialState, usePickerBaseState } from "../picker-base";

export type DatePickerInitialState = ValueBase<string> &
  RangeValueBase<string> &
  Validation &
  PickerBaseInitialState &
  Pick<Partial<SegmentInitialState>, "formatOptions" | "placeholderDate"> & {
    /**
     * Whether the element should receive focus on render.
     */
    autoFocus?: boolean;
  };

export const useDatePickerState = (props: DatePickerInitialState = {}) => {
  const {
    value: initialValue,
    defaultValue = toUTCString(new Date()),
    onChange,
    minValue,
    maxValue,
    isRequired,
    autoFocus,
    formatOptions,
    placeholderDate,
  } = props;

  const [value, setValue] = useControllableState({
    value: initialValue,
    defaultValue,
    onChange,
  });

  const date = new Date(value);
  const setDate = (date: Date) => setValue(toUTCString(date));
  const minDateValue = minValue ? new Date(minValue) : new Date(-864e13);
  const maxDateValue = maxValue ? new Date(maxValue) : new Date(864e13);

  const segmentState = useSegmentState({
    value: date,
    onChange: setDate,
    formatOptions,
    placeholderDate,
  });

  const popover = usePickerBaseState({
    segmentFocus: segmentState.first,
    ...props,
  });

  const selectDate = (newValue: string) => {
    setValue(newValue);
    popover.hide();
  };

  const calendar = useCalendarState({
    value,
    onChange: selectDate,
    minValue: minValue,
    maxValue: maxValue,
  });

  const validationState: ValidationState =
    props.validationState || (isInvalidDateRange(date) ? "invalid" : "valid");

  React.useEffect(() => {
    if (popover.visible) {
      calendar.setFocused(true);
      calendar.focusCell(date);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popover.visible]);

  React.useEffect(() => {
    if (autoFocus) {
      segmentState.first();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, segmentState.first]);

  function isInvalidDateRange(value: Date) {
    const min = new Date(minDateValue);
    const max = new Date(maxDateValue);

    return value < min || value > max;
  }

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
    isDateRangePicker: false,
  };
};

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>;
