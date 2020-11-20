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

export type CalendarState = {
  /**
   * Id for the Calendar Header
   */
  calendarId: string | undefined;
  /**
   * Selected Date value
   */
  dateValue: Date;
  /**
   * Minimum allowed Date value
   */
  minDate: Date | undefined;
  /**
   * Maximum allowed Date value
   */
  maxDate: Date | undefined;
  /**
   * Month of the current date value
   */
  month: number;
  /**
   * Year of the current date value
   */
  year: number;
  /**
   * Start of the week for the current date value
   */
  weekStart: number;
  /**
   * Generated week days for CalendarWeekTitle based on weekStart
   */
  weekDays: {
    title: string;
    abbr: string;
  }[];
  /**
   * Generated days in the current month
   */
  daysInMonth: Date[][];
  /**
   * `true` if the calendar is disabled
   */
  isDisabled: boolean;
  /**
   * `true` if the calendar is focused
   */
  isFocused: boolean;
  /**
   * `true` if the calendar is only readonly
   */
  isReadOnly: boolean;
  /**
   * Month of the current Date
   */
  currentMonth: Date;
  /**
   * Date value that is currently focused
   */
  focusedDate: Date;
  /**
   * `true` if the calendar is used as RangeCalendar
   */
  isRangeCalendar: boolean;
};

export type CalendarActions = {
  /**
   * Sets `isFocused`
   */
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Sets `currentMonth`
   */
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  /**
   *  Sets `focusedDate`
   */
  setFocusedDate: React.Dispatch<React.SetStateAction<Date>>;
  /**
   * Sets `dateValue`
   */
  setDateValue: (value: Date) => void;
  /**
   * Focus the cell of the specified date
   */
  focusCell: (value: Date) => void;
  /**
   * Focus the cell next to the current date
   */
  focusNextDay: () => void;
  /**
   * Focus the cell prev to the current date
   */
  focusPreviousDay: () => void;
  /**
   * Focus the cell one week next to the current date
   */
  focusNextWeek: () => void;
  /**
   * Focus the cell one week prev to the current date
   */
  focusPreviousWeek: () => void;
  /**
   * Focus the cell one month next to the current date
   */
  focusNextMonth: () => void;
  /**
   * Focus the cell one month prev to the current date
   */
  focusPreviousMonth: () => void;
  /**
   * Focus the cell of the first day of the month
   */
  focusStartOfMonth: () => void;
  /**
   * Focus the cell of the last day of the month
   */
  focusEndOfMonth: () => void;
  /**
   * Focus the cell of the date one year from the current date
   */
  focusNextYear: () => void;
  /**
   * Focus the cell of the date one year before the current date
   */
  focusPreviousYear: () => void;
  /**
   * Selects the `focusedDate`
   */
  selectFocusedDate: () => void;
  /**
   * sets `dateValue`
   */
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
