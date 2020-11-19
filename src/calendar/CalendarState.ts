/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useCalendarState](https://github.com/adobe/react-spectrum/tree/main/packages/%40react-stately/calendar)
 * to work with Reakit System
 */

import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  closestTo,
  endOfMonth,
  format,
  getDaysInMonth,
  isSameMonth,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import * as React from "react";
import { unstable_useId as useId } from "reakit";
import { useUpdateEffect } from "@chakra-ui/hooks";
import { useDateFormatter } from "@react-aria/i18n";
import { useControllableState } from "@chakra-ui/hooks";
import { InputBase, ValueBase } from "@react-types/shared";

import { RangeValueBase } from "../utils/types";
import { announce } from "../utils/LiveAnnouncer";
import { isInvalidDateRange, parseDate, stringifyDate } from "../utils";
import { useWeekStart, useWeekDays, generateDaysInMonthArray } from "./helpers";

export type CalendarState = {
  calendarId: string | undefined;
  dateValue: Date;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  month: number;
  year: number;
  weekStart: number;
  weekDays: {
    title: string;
    abbr: string;
  }[];
  daysInMonth: Date[][];
  isDisabled: boolean;
  isFocused: boolean;
  isReadOnly: boolean;
  currentMonth: Date;
  focusedDate: Date;
  isRangeCalendar: boolean;
};

export type CalendarActions = {
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setFocusedDate: React.Dispatch<React.SetStateAction<Date>>;
  setDateValue: (value: Date) => void;
  focusCell: (value: Date) => void;
  focusNextDay: () => void;
  focusPreviousDay: () => void;
  focusNextWeek: () => void;
  focusPreviousWeek: () => void;
  focusNextMonth: () => void;
  focusPreviousMonth: () => void;
  focusStartOfMonth: () => void;
  focusEndOfMonth: () => void;
  focusNextYear: () => void;
  focusPreviousYear: () => void;
  selectFocusedDate: () => void;
  selectDate: (value: Date) => void;
};

export type CalendarInitialState = ValueBase<string> &
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

export type CalendarStateReturn = CalendarState & CalendarActions;

export function useCalendarState(
  props: CalendarInitialState = {},
): CalendarStateReturn {
  const {
    value: initialDate,
    defaultValue: defaultValueProp,
    onChange: onChangeProp,
    minValue: minValueProp,
    maxValue: maxValueProp,
    isDisabled = false,
    isReadOnly = false,
    autoFocus = false,
  } = props;

  const onChange = React.useCallback(
    (date: Date) => {
      return onChangeProp?.(stringifyDate(date));
    },
    [onChangeProp],
  );

  const [value, setControllableValue] = useControllableState({
    value: parseDate(initialDate),
    defaultValue: parseDate(defaultValueProp),
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  const minValue = parseDate(minValueProp);
  const maxValue = parseDate(maxValueProp);

  const initialMonth = value ?? new Date();
  const [currentMonth, setCurrentMonth] = React.useState(initialMonth);
  const [focusedDate, setFocusedDate] = React.useState(initialMonth);

  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();
  const weekStart = useWeekStart();
  const weekDays = useWeekDays(weekStart);

  let monthStartsAt = (startOfMonth(currentMonth).getDay() - weekStart) % 7;
  if (monthStartsAt < 0) {
    monthStartsAt += 7;
  }

  const days = getDaysInMonth(currentMonth);
  const weeksInMonth = Math.ceil((monthStartsAt + days) / 7);

  // Get 2D Date arrays in 7 days a week format
  const daysInMonth = React.useMemo(
    () => generateDaysInMonthArray(month, monthStartsAt, weeksInMonth, year),
    [month, monthStartsAt, weeksInMonth, year],
  );

  // Sets focus to a specific cell date
  function focusCell(date: Date) {
    if (isInvalidDateRange(date, minValue, maxValue)) {
      // Fixes https://github.com/timelessco/renderless-components/issues/116
      // Issue causing the focusNextMonth & focusPrevMonth to not work because
      // of adding one month to the current date which becomes invalid above.
      if (minValue && maxValue) {
        if (!isSameMonth(date, minValue) && !isSameMonth(date, maxValue))
          return;

        const nextDate = closestTo(date, [minValue, maxValue]);
        if (!isSameMonth(nextDate, currentMonth)) {
          setCurrentMonth(startOfMonth(nextDate));
        }
        setFocusedDate(nextDate);
      }

      return;
    }

    if (!isSameMonth(date, currentMonth)) {
      setCurrentMonth(startOfMonth(date));
    }

    setFocusedDate(date);
  }

  const announceSelectedDate = React.useCallback((value: Date) => {
    if (!value) return;
    announce(`Selected Date: ${format(value, "do MMM yyyy")}`);
  }, []);

  function setValue(value: Date) {
    if (!isDisabled && !isReadOnly) {
      setControllableValue(value);
      announceSelectedDate(value);
    }
  }

  const [isFocused, setFocused] = React.useState(autoFocus);

  const monthFormatter = useDateFormatter({ month: "long", year: "numeric" });

  // Announce when the current month changes
  useUpdateEffect(() => {
    // announce the new month with a change from the Previous or Next button
    if (!isFocused) {
      announce(monthFormatter.format(currentMonth));
    }
    // handle an update to the current month from the Previous or Next button
    // rather than move focus, we announce the new month value
  }, [currentMonth]);

  const { id: calendarId } = useId({ id: props.id, baseId: "calendar" });

  return {
    calendarId,
    dateValue: value,
    minDate: minValue,
    maxDate: maxValue,
    month,
    year,
    weekStart,
    weekDays,
    daysInMonth,
    isDisabled,
    isFocused,
    isReadOnly,
    setFocused,
    setDateValue: setValue,
    currentMonth,
    setCurrentMonth,
    focusedDate,
    focusCell,
    setFocusedDate,
    focusNextDay() {
      focusCell(addDays(focusedDate, 1));
    },
    focusPreviousDay() {
      focusCell(subDays(focusedDate, 1));
    },
    focusNextWeek() {
      focusCell(addWeeks(focusedDate, 1));
    },
    focusPreviousWeek() {
      focusCell(subWeeks(focusedDate, 1));
    },
    focusNextMonth() {
      focusCell(addMonths(focusedDate, 1));
    },
    focusPreviousMonth() {
      focusCell(subMonths(focusedDate, 1));
    },
    focusStartOfMonth() {
      focusCell(startOfMonth(focusedDate));
    },
    focusEndOfMonth() {
      focusCell(endOfMonth(startOfDay(focusedDate)));
    },
    focusNextYear() {
      focusCell(addYears(focusedDate, 1));
    },
    focusPreviousYear() {
      focusCell(subYears(focusedDate, 1));
    },
    selectFocusedDate() {
      setValue(focusedDate);
    },
    selectDate(date: Date) {
      setValue(date);
    },
    isRangeCalendar: false,
  };
}
