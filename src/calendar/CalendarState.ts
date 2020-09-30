/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useCalendarState](https://github.com/adobe/react-spectrum/tree/main/packages/%40react-stately/calendar)
 * to work with Reakit System
 */
import * as React from "react";
import { unstable_useId as useId } from "reakit";
import { useUpdateEffect } from "@chakra-ui/hooks";
import { useDateFormatter } from "@react-aria/i18n";
import { useControllableState } from "@chakra-ui/hooks";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfDay,
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

import { CalendarProps } from "./index.d";
import { useWeekStart } from "./useWeekStart";
import { announce } from "../utils/LiveAnnouncer";
import { isInvalid, useWeekDays, generateDaysInMonthArray } from "./__utils";

export type DateValue = string | number | Date;
export interface CalendarStateInitialProps {
  minValue?: DateValue;
  maxValue?: DateValue;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
  /** The current value (controlled). */
  value?: DateValue;
  /** The default value (uncontrolled). */
  defaultValue?: DateValue;
  /** Handler that is called when the value changes. */
  onChange?: (value: DateValue) => void;
  id?: string;
}

export function useCalendarState(props: CalendarStateInitialProps = {}) {
  const {
    minValue: initialMinValue,
    maxValue: initialMaxValue,
    isDisabled = false,
    isReadOnly = false,
    autoFocus = false,
    value: initialValue,
    defaultValue,
    onChange,
    id,
  } = props;

  const { id: calendarId } = useId({ id, baseId: "calendar" });
  const [value, setControllableValue] = useControllableState({
    value: initialValue,
    defaultValue,
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  const dateValue = value ? new Date(value) : null;
  const minValue = initialMinValue ? new Date(initialMinValue) : null;
  const maxValue = initialMaxValue ? new Date(initialMaxValue) : null;
  const minDate = minValue ? startOfDay(minValue) : null;
  const maxDate = maxValue ? endOfDay(maxValue) : null;

  const [isFocused, setFocused] = React.useState(autoFocus);

  const initialMonth = dateValue ?? new Date();
  const [currentMonth, setCurrentMonth] = React.useState(initialMonth); // TODO: does this need to be in state at all??
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
    if (isInvalid(date, minDate, maxDate)) {
      return;
    }

    if (!isSameMonth(date, currentMonth)) {
      setCurrentMonth(startOfMonth(date));
    }

    setFocusedDate(date);
  }

  function setValue(value: Date) {
    if (!isDisabled && !isReadOnly) {
      setControllableValue(value);
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

  useUpdateEffect(() => {
    if (!dateValue) return;

    announce(`Selected Date: ${format(dateValue, "do MMM yyyy")}`);
  }, [dateValue]);

  return {
    calendarId,
    dateValue,
    minDate,
    maxDate,
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
  };
}

export type CalendarStateReturn = ReturnType<typeof useCalendarState>;
