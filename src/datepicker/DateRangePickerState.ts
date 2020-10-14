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

import {
  parseDate,
  stringifyDate,
  parseRangeDate,
  isInvalidDateRange,
} from "../utils";
import { useSegmentState } from "../segment";
import { makeRange } from "../calendar/__utils";
import { useRangeCalendarState } from "../calendar";
import { DateTimeFormatOpts, RangeValueBase } from "../utils/types";
import { PickerBaseInitialState, usePickerBaseState } from "../picker-base";

export interface DateRangePickerInitialState
  extends PickerBaseInitialState,
    Validation,
    FocusableProps,
    ValueBase<RangeValue<string>>,
    RangeValueBase<string> {
  placeholderDate?: string;
  formatOptions?: DateTimeFormatOpts;
}

export const useDateRangePickerState = (
  props: DateRangePickerInitialState = {},
) => {
  const {
    value: initialDate,
    defaultValue: defaultValueProp,
    onChange: onChangeProp,
    minValue: minValueProp,
    maxValue: maxValueProp,
    isRequired,
    autoFocus,
    formatOptions,
    placeholderDate: placeholderDateProp,
  } = props;

  const onChange = React.useCallback(
    (date: RangeValue<Date>) => {
      return onChangeProp?.({
        start: stringifyDate(date.start),
        end: stringifyDate(date.end),
      });
    },
    [onChangeProp],
  );

  const [value, setValue] = useControllableState<RangeValue<Date>>({
    value: parseRangeDate(initialDate),
    defaultValue: parseRangeDate(defaultValueProp) || {
      start: new Date(),
      end: new Date(),
    },
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  const minValue = parseDate(minValueProp);
  const maxValue = parseDate(maxValueProp);
  const placeholderDate = parseDate(placeholderDateProp);

  const selectDate = (date: RangeValue<string>) => {
    if (props.isReadOnly || props.isDisabled) {
      return;
    }

    setValue(
      makeRange(parseDate(date.start) as Date, parseDate(date.end) as Date),
    );

    popover.hide();
  };

  const segmentComposite = useCompositeState({ orientation: "horizontal" });
  const startSegmentState = useSegmentState({
    value: value.start,
    defaultValue: parseDate(defaultValueProp?.start),
    onChange: date => setValue({ start: date, end: value.end }),
    formatOptions,
    placeholderDate,
  });

  const endSegmentState = useSegmentState({
    value: value.end,
    defaultValue: parseDate(defaultValueProp?.end),
    onChange: date => setValue({ start: value.start, end: date }),
    formatOptions,
    placeholderDate,
  });

  const popover = usePickerBaseState({
    focus: segmentComposite.first,
    ...props,
  });

  const calendar = useRangeCalendarState({
    value: { start: stringifyDate(value.start), end: stringifyDate(value.end) },
    onChange: selectDate,
    minValue: minValueProp,
    maxValue: maxValueProp,
  });

  const isStartInRange = isInvalidDateRange(
    value.start,
    parseDate(props.minValue),
    parseDate(props.maxValue),
  );

  const isEndInRange = isInvalidDateRange(
    value.end,
    parseDate(props.minValue),
    parseDate(props.maxValue),
  );

  const validationState: ValidationState | null =
    props.validationState ||
    (value != null &&
    (isStartInRange ||
      isEndInRange ||
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
