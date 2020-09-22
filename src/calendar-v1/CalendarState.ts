/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useCalendarState](https://github.com/adobe/react-spectrum/tree/main/packages/%40react-stately/calendar)
 * to work with Reakit System
 */
import { useState } from "react";
import { unstable_useId as useId } from "reakit";
import { useControllableState } from "@chakra-ui/hooks";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfDay,
  endOfMonth,
  getDaysInMonth,
  isSameDay,
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
import { isInvalid, useWeekDays } from "./__utils";

export interface IUseCalendarProps extends CalendarProps {
  id?: string;
}

export type getCellOptionsReturn = {
  cellDate: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  isFocused: boolean;
  isReadOnly: boolean | undefined;
};

export function useCalendarState(props: IUseCalendarProps = {}) {
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

  const [isFocused, setFocused] = useState(autoFocus);

  const initialMonth = dateValue ?? new Date();
  const [currentMonth, setCurrentMonth] = useState(initialMonth); // TODO: does this need to be in state at all??
  const [focusedDate, setFocusedDate] = useState(initialMonth);

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
  const daysInMonth = [...new Array(weeksInMonth).keys()].reduce(
    (weeks: Date[][], weekIndex) => {
      const daysInWeek = [...new Array(7).keys()].reduce(
        (days: Date[], dayIndex) => {
          const day = weekIndex * 7 + dayIndex - monthStartsAt + 1;
          const cellDate = new Date(year, month, day);

          return [...days, cellDate];
        },
        [],
      );

      return [...weeks, daysInWeek];
    },
    [],
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
    getCellOptions(cellDate: Date): getCellOptionsReturn {
      const isCurrentMonth = cellDate.getMonth() === month;

      return {
        cellDate,
        isToday: isSameDay(cellDate, new Date()),
        isCurrentMonth,
        isDisabled:
          props.isDisabled ||
          !isCurrentMonth ||
          isInvalid(cellDate, minDate, maxDate),
        isSelected: isSameDay(cellDate, value as Date),
        isFocused: isFocused && focusedDate && isSameDay(cellDate, focusedDate),
        isReadOnly: props.isReadOnly,
      };
    },
  };
}

export type CalendarStateReturn = ReturnType<typeof useCalendarState>;
