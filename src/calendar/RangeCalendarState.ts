/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useRangeCalendar](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/calendar/src/useRangeCalendar.ts)
 * to work with Reakit System
 */
import * as React from "react";
import { InputBase, RangeValue } from "@react-types/shared";

import { makeRange } from "./helpers";
import { announce } from "../utils/LiveAnnouncer";
import { useCalendarState } from "./CalendarState";
import { CalendarActions, CalendarState } from "./CalendarState";
import {
  isSameDay,
  toUTCRangeString,
  toUTCString,
  useControllableState,
  addDays,
} from "../utils";
import { useDateFormatter } from "@react-aria/i18n";

export function useRangeCalendarState(
  props: RangeCalendarInitialState = {},
): RangeCalendarStateReturn {
  const {
    value: initialValue,
    defaultValue = {
      start: toUTCString(new Date()),
      end: toUTCString(addDays(new Date(), 1)),
    },
    onChange,
    ...calendarProps
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
  const [anchorDate, setAnchorDate] = React.useState<Date | null>(null);
  const [lastSelectedDate, setLastSelectedDate] = React.useState<Date>(
    dateRange.end,
  );
  const calendar = useCalendarState({
    ...calendarProps,
    value: toUTCString(lastSelectedDate),
  });

  const highlightedRange = anchorDate
    ? makeRange(anchorDate, calendar.focusedDate)
    : value && dateRange && makeRange(dateRange.start, dateRange.end);

  const dateFormatter = useDateFormatter({ dateStyle: "full" });

  const announceRange = React.useCallback(() => {
    if (!highlightedRange) return;

    if (isSameDay(highlightedRange.start, highlightedRange.end)) {
      announce(
        `Selected range, from ${dateFormatter.format(
          highlightedRange.start,
        )} to ${dateFormatter.format(highlightedRange.start)}`,
      );
    } else {
      announce(
        `Selected range from ${dateFormatter.format(
          highlightedRange.start,
        )} to ${dateFormatter.format(highlightedRange.start)}`,
      );
    }
  }, [dateFormatter, highlightedRange]);

  const selectDate = React.useCallback(
    (date: Date) => {
      if (props.isReadOnly) return;

      setLastSelectedDate(date);
      if (!anchorDate) {
        setAnchorDate(date);
        announce(`Starting range from ${dateFormatter.format(date)}`);
      } else {
        setValue(toUTCRangeString(makeRange(anchorDate, date)));
        announceRange();
        setAnchorDate(null);
      }
    },
    [anchorDate, announceRange, dateFormatter, props.isReadOnly, setValue],
  );

  const setDateValue = React.useCallback(
    (value: RangeValue<Date>) => {
      setValue(toUTCRangeString(value));
    },
    [setValue],
  );

  return {
    ...calendar,
    dateRangeValue: dateRange,
    setDateRangeValue: setDateValue,
    anchorDate,
    setAnchorDate,
    highlightedRange,
    selectDate,
    selectFocusedDate() {
      selectDate(calendar.focusedDate);
    },
    highlightDate(date: Date) {
      if (!anchorDate) return;
      calendar.setFocusedDate(date);
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
  setDateRangeValue: (value: RangeValue<Date>) => void;
  setAnchorDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectDate: (date: Date) => void;
  selectFocusedDate: () => void;
  highlightDate: (date: Date) => void;
};

type Range = {
  /** The start value of the range. */
  start: string;
  /** The end value of the range. */
  end: string;
};

type RangeValueBase = {
  /** The current value (controlled). */
  value?: Range;
  /** The default value (uncontrolled). */
  defaultValue?: Range;
  /** Handler that is called when the value changes. */
  onChange?: (value: Range) => void;
};

type RangeValueMinMax = {
  /** The smallest value allowed. */
  minValue?: string;
  /** The largest value allowed. */
  maxValue?: string;
};

export type RangeCalendarInitialState = RangeValueBase &
  RangeValueMinMax &
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
