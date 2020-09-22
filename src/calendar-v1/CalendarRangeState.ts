import { useState } from "react";
import { RangeValue } from "@react-types/shared";
import { useCalendarState } from "./CalendarState";
import { DateValue, RangeCalendarProps } from "./index.d";
import { useControllableState, useUpdateEffect } from "@chakra-ui/hooks";
import {
  format,
  endOfDay,
  isSameDay,
  startOfDay,
  getDaysInMonth,
} from "date-fns";
import { announce } from "../utils/LiveAnnouncer";

export function useRangeCalendarState(props: RangeCalendarProps) {
  const {
    value: valueProp,
    defaultValue,
    onChange = () => {},
    ...calendarProps
  } = props;
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange,
  });

  const dateRange: any = value != null ? convertRange(value) : null;
  const [anchorDate, setAnchorDate] = useState<Date | null>(null);
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
    if (isSameDay(highlightedRange.start, highlightedRange.end)) return;
    if (highlightedRange) {
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
    value: dateRange,
    setValue,
    anchorDate,
    setAnchorDate,
    highlightedRange,
    selectFocusedDate() {
      selectDate(calendar.focusedDate);
    },
    selectDate,
    highlightDate(date: Date) {
      if (anchorDate) {
        calendar.setFocusedDate(date);
      }
    },
    getCellOptions(weekIndex: number, dayIndex: number) {
      const opts = calendar.getCellOptions(weekIndex, dayIndex);
      const isSelected =
        highlightedRange &&
        opts.cellDate >= highlightedRange.start &&
        opts.cellDate <= highlightedRange.end;

      return {
        ...opts,
        isRangeSelection: isSelected,
        isSelected,
        isRangeStart:
          isSelected && (dayIndex === 0 || opts.cellDate.getDate() === 1),
        isRangeEnd:
          isSelected &&
          (dayIndex === 6 ||
            opts.cellDate.getDate() === getDaysInMonth(calendar.currentMonth)),
        isSelectionStart:
          highlightedRange && isSameDay(opts.cellDate, highlightedRange.start),
        isSelectionEnd:
          highlightedRange && isSameDay(opts.cellDate, highlightedRange.end),
      };
    },
  };
}

export type RangeCalendarStateReturn = ReturnType<typeof useRangeCalendarState>;

function makeRange(start: Date, end: Date): RangeValue<Date> {
  if (end < start) {
    [start, end] = [end, start];
  }

  return { start: startOfDay(start), end: endOfDay(end) };
}

function convertRange(range: RangeValue<DateValue>): RangeValue<Date> {
  return {
    start: new Date(range.start),
    end: new Date(range.end),
  };
}
