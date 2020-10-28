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
import { FocusableProps, InputBase, ValueBase } from "@react-types/shared";

import { useWeekStart } from "./useWeekStart";
import { RangeValueBase } from "../utils/types";
import { announce } from "../utils/LiveAnnouncer";
import { useWeekDays, generateDaysInMonthArray } from "./__utils";
import { isInvalidDateRange, parseDate, stringifyDate } from "../utils";

export interface CalendarInitialState
  extends FocusableProps,
    InputBase,
    ValueBase<string>,
    RangeValueBase<string> {
  id?: string;
}

export function useCalendarState(props: CalendarInitialState = {}) {
  const {
    value: initialDate,
    defaultValue: defaultValueProp,
    onChange: onChangeProp,
    minValue: minValueProp,
    maxValue: maxValueProp,
    isDisabled = false,
    isReadOnly = false,
    autoFocus = false,
    id,
  } = props;

  const { id: calendarId } = useId({ id, baseId: "calendar" });

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

  const [isFocused, setFocused] = React.useState(autoFocus);

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

export type CalendarStateReturn = ReturnType<typeof useCalendarState>;
