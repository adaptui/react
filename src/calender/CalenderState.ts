import React from "react";
import { useCompositeState } from "reakit";
import {
  addYears,
  subYears,
  subMonths,
  addMonths,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { generateMonths } from "./__utils";

export const weeksDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

interface CalenderInitialState {
  from?: Date;
}

export const useCalenderState = ({
  from = new Date(),
}: CalenderInitialState = {}) => {
  const [selectedDate, setSelectedDate] = React.useState(from);
  const [startDate, setStartDate] = React.useState(new Date());
  const composite = useCompositeState({
    unstable_virtual: true,
    wrap: true,
  });

  const previousYear = () => {
    const year = subYears(startDate, 1);
    setStartDate(startOfMonth(year));
  };
  const nextYear = () => {
    const year = addYears(startDate, 1);
    setStartDate(startOfMonth(year));
  };

  const previousMonth = () => {
    const month = subMonths(startDate, 1);
    setStartDate(startOfWeek(month));
  };
  const nextMonth = () => {
    const month = addMonths(startDate, 1);
    setStartDate(startOfWeek(month));
  };

  const gotoMonthEnd = () => {};
  const gotoMonthStart = () => {};

  const weeks = generateMonths(startDate);

  return {
    ...composite,
    weeksDays,
    weeks,
    previousMonth,
    previousYear,
    nextMonth,
    nextYear,
    selectedDate,
    setSelectedDate,
    startDate,
    gotoMonthEnd,
    gotoMonthStart,
  };
};

export type CalenderStateReturn = ReturnType<typeof useCalenderState>;
