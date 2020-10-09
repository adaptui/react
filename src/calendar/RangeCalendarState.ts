/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useRangeCalendar](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/calendar/src/useRangeCalendar.ts)
 * to work with Reakit System
 */
import {
  FocusableProps,
  InputBase,
  ValueBase,
  RangeValue,
} from "@react-types/shared";
import * as React from "react";
import { format, isSameDay } from "date-fns";
import { useControllableState, useUpdateEffect } from "@chakra-ui/hooks";

import { DateValue } from "../utils/types";
import { announce } from "../utils/LiveAnnouncer";
import { useCalendarState } from "./CalendarState";
import { convertRange, makeRange } from "./__utils";

export interface RangeCalendarInitialState
  extends FocusableProps,
    InputBase,
    ValueBase<RangeValue<DateValue>> {
  minValue?: DateValue;
  maxValue?: DateValue;
  id?: string;
}

export function useRangeCalendarState(props: RangeCalendarInitialState = {}) {
  const {
    value: initialValue,
    defaultValue,
    onChange,
    ...calendarProps
  } = props;

  const [value, setValue] = useControllableState({
    value: initialValue,
    defaultValue,
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  const dateRange = value != null ? convertRange(value) : null;
  const [anchorDate, setAnchorDate] = React.useState<Date | null>(null);
  const calendar = useCalendarState({
    ...calendarProps,
    value: value && value.start,
  });

  const highlightedRange = anchorDate
    ? makeRange(anchorDate, calendar.focusedDate)
    : value && dateRange && makeRange(dateRange.start, dateRange.end);

  const selectDate = (date: Date) => {
    if (props.isReadOnly) {
      return;
    }

    if (!anchorDate) {
      setAnchorDate(date);
    } else {
      setValue(makeRange(anchorDate, date));
      setAnchorDate(null);
    }
  };

  useUpdateEffect(() => {
    if (anchorDate) return;
    if (!highlightedRange) return;
    if (isSameDay(highlightedRange.start, highlightedRange.end)) {
      announce(
        `Selected range, from ${format(
          highlightedRange.start,
          "do MMM yyyy",
        )} to ${format(highlightedRange.start, "do MMM yyyy")}`,
      );
    } else {
      announce(
        `Selected range, from ${format(
          highlightedRange.start,
          "do MMM yyyy",
        )} to ${format(highlightedRange.end, "do MMM yyyy")}`,
      );
    }
  }, [highlightedRange]);

  return {
    ...calendar,
    dateRangeValue: dateRange,
    setDateRangeValue: setValue,
    anchorDate,
    setAnchorDate,
    highlightedRange,
    selectDate,
    selectFocusedDate() {
      selectDate(calendar.focusedDate);
    },
    highlightDate(date: Date) {
      if (anchorDate) {
        calendar.setFocusedDate(date);
      }
    },
  };
}

export type RangeCalendarStateReturn = ReturnType<typeof useRangeCalendarState>;
