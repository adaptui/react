/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useRangeCalendar](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/calendar/src/useRangeCalendar.ts)
 * to work with Reakit System
 */
import * as React from "react";
import { format, isSameDay } from "date-fns";
import { InputBase, ValueBase, RangeValue } from "@react-types/shared";

import { makeRange } from "./helpers";
import { RangeValueBase } from "../utils/types";
import { announce } from "../utils/LiveAnnouncer";
import { useCalendarState } from "./CalendarState";
import { CalendarActions, CalendarState } from "./CalendarState";
import { parseRangeDate, stringifyDate, useControllableState } from "../utils";

export function useRangeCalendarState(
  props: RangeCalendarInitialState = {},
): RangeCalendarStateReturn {
  const {
    value: initialDate,
    defaultValue: defaultValueProp,
    onChange: onChangeProp,
    ...calendarProps
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
    defaultValue: parseRangeDate(defaultValueProp),
    onChange,
  });

  const dateRange = value != null ? value : null;
  const [anchorDate, setAnchorDate] = React.useState<Date | null>(null);
  const calendar = useCalendarState({
    ...calendarProps,
    value: value && stringifyDate(value.start),
  });

  const highlightedRange = anchorDate
    ? makeRange(anchorDate, calendar.focusedDate)
    : value && dateRange && makeRange(dateRange.start, dateRange.end);

  const announceRange = React.useCallback(() => {
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

  const selectDate = (date: Date) => {
    if (props.isReadOnly) {
      return;
    }

    if (!anchorDate) {
      setAnchorDate(date);
      announce(`Starting range from ${format(date, "do MMM yyyy")}`);
    } else {
      setValue(makeRange(anchorDate, date));
      announceRange();
      setAnchorDate(null);
    }
  };

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
    isRangeCalendar: true,
  };
}

export type RangeCalendarState = CalendarState & {
  dateRangeValue: RangeValue<Date> | null;
  anchorDate: Date | null;
  highlightedRange: RangeValue<Date> | null;
  isRangeCalendar: boolean;
};

export type RangeCalendarActions = CalendarActions & {
  setDateRangeValue: React.Dispatch<React.SetStateAction<RangeValue<Date>>>;
  setAnchorDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectDate: (date: Date) => void;
  selectFocusedDate: () => void;
  highlightDate: (date: Date) => void;
};

export type RangeCalendarInitialState = ValueBase<RangeValue<string>> &
  RangeValueBase<string> &
  InputBase & {
    /**
     * Whether the element should receive focus on render.
     */
    autoFocus?: boolean;
    /**
     * Id for the calendar grid
     */
    id?: string;
  };

export type RangeCalendarStateReturn = RangeCalendarState &
  RangeCalendarActions;
