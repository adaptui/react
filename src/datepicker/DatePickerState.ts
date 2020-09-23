import { parse, setDate, setMonth, setYear } from "date-fns";
import React from "react";
import { useCompositeState, useDisclosureState } from "reakit";
import { useCalendarState } from "../calendar-v1";
import { useNumberInputState } from "../number-input";

export const useDatePickerState = () => {
  const segmentComposite = useCompositeState({ orientation: "horizontal" });
  const disclosure = useDisclosureState();

  const calendar = useCalendarState({
    autoFocus: true,
    defaultValue: new Date(),
    onChange: date => {
      disclosure.hide();
    },
  });

  const currentDate = calendar.dateValue?.getDate();
  const currentMonth = calendar.currentMonth?.getMonth();
  const currentYear = calendar.dateValue?.getFullYear();

  const numberSegmentStates = {
    date: useNumberInputState({
      min: 1,
      max: 31,
      value: currentDate,
      onChange: value => {
        const date = setDate(calendar.dateValue as Date, parseInt(value));
        calendar.focusCell(date);
        calendar.selectDate(date);
      },
    }),
    month: useNumberInputState({
      min: 1,
      max: 12,
      value: currentMonth,
      onChange: value => {
        const date = setMonth(calendar.dateValue as Date, parseInt(value));
        calendar.focusCell(date);
      },
    }),
    year: useNumberInputState({
      min: 1999,
      max: 2999,
      value: currentYear,
      onChange: value => {
        const date = setYear(calendar.dateValue as Date, parseInt(value));
        calendar.focusCell(date);
        calendar.selectDate(date);
      },
    }),
  };

  return {
    ...segmentComposite,
    ...disclosure,
    ...calendar,
    numberSegmentStates,
  };
};

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>;
