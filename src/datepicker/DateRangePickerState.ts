/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useDatePickerState](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/datepicker/src/useDatePickerState.ts)
 * to work with Reakit System
 */

import {
  Validation,
  ValueBase,
  RangeValue,
  ValidationState,
} from "@react-types/shared";
import * as React from "react";
import { useCompositeState, unstable_useId as useId } from "reakit";

import {
  useControllableState,
  addDays,
  toUTCString,
  toUTCRangeString,
} from "../utils";
import { makeRange } from "../calendar/helpers";
import { RangeValueBase } from "../utils/types";
import { useRangeCalendarState } from "../calendar";
import { SegmentInitialState, useSegmentState } from "../segment";
import { PickerBaseInitialState, usePickerBaseState } from "../picker-base";

export type DateRangePickerInitialState = ValueBase<RangeValue<string>> &
  RangeValueBase<string> &
  Validation &
  PickerBaseInitialState &
  Pick<Partial<SegmentInitialState>, "formatOptions" | "placeholderDate"> & {
    /**
     * Whether the element should receive focus on render.
     */
    autoFocus?: boolean;
  };

export const useDateRangePickerState = (
  props: DateRangePickerInitialState = {},
) => {
  const {
    value: initialValue,
    defaultValue = {
      start: toUTCString(new Date()),
      end: toUTCString(addDays(new Date(), 1)),
    },
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

  const dateRange: RangeValue<Date> = React.useMemo(
    () => ({
      start: new Date(value.start),
      end: new Date(value.end),
    }),
    [value.end, value.start],
  );
  const minDateValue = minValue ? new Date(minValue) : new Date(-864e13);
  const maxDateValue = maxValue ? new Date(maxValue) : new Date(864e13);

  const selectDate = (date: RangeValue<string>) => {
    if (props.isReadOnly || props.isDisabled) {
      return;
    }

    setValue(
      toUTCRangeString(makeRange(new Date(date.start), new Date(date.end))),
    );

    popover.hide();
  };

  const segmentComposite = useCompositeState({ orientation: "horizontal" });

  const startSegmentState = useSegmentState({
    value: dateRange.start,
    defaultValue: new Date(defaultValue.start),
    onChange: date =>
      setValue(toUTCRangeString({ start: date, end: dateRange.end })),
    formatOptions,
    placeholderDate,
  });

  const endSegmentState = useSegmentState({
    value: dateRange.end,
    defaultValue: new Date(defaultValue.end),
    onChange: date =>
      setValue(toUTCRangeString({ start: dateRange.start, end: date })),
    formatOptions,
    placeholderDate,
  });

  const popover = usePickerBaseState({
    segmentFocus: segmentComposite.first,
    ...props,
  });

  const calendar = useRangeCalendarState({
    value: { start: value.start, end: value.end },
    onChange: selectDate,
    minValue: minValue,
    maxValue: maxValue,
  });

  function isInvalidDateRange(value: Date) {
    const min = new Date(minDateValue);
    const max = new Date(maxDateValue);

    return value < min || value > max;
  }

  const isStartInRange = isInvalidDateRange(dateRange.start);
  const isEndInRange = isInvalidDateRange(dateRange.end);

  const validationState: ValidationState =
    props.validationState ||
    (value != null &&
    (isStartInRange ||
      isEndInRange ||
      (value.end != null && value.start != null && value.end < value.start))
      ? "invalid"
      : "valid");

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

  const { id: startId } = useId({ baseId: "startsegment" });
  const { id: endId } = useId({ baseId: "endsegment" });

  return {
    dateValue: value,
    setDateValue: setValue,
    selectDate,
    validationState,
    minValue,
    maxValue,
    isRequired,
    ...popover,
    startSegmentState: {
      ...startSegmentState,
      ...segmentComposite,
      baseId: startId,
    },
    endSegmentState: {
      ...endSegmentState,
      ...segmentComposite,
      baseId: endId,
    },
    calendar,
    isDateRangePicker: true,
  };
};

export type DateRangePickerStateReturn = ReturnType<
  typeof useDateRangePickerState
>;
