import { RangeValue } from "@react-types/shared";

export const toUTCString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const toUTCRangeString = (date: RangeValue<Date>) => {
  return { start: toUTCString(date.start), end: toUTCString(date.end) };
};

export {
  subDays,
  subMonths,
  subWeeks,
  subYears,
  addDays,
  addMonths,
  addYears,
  addWeeks,
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  setDate,
  setDay,
  setHours,
  setMinutes,
  setSeconds,
  setMonth,
  setYear,
  startOfMonth,
  startOfDay,
  endOfMonth,
  getDaysInMonth,
  isSameMonth,
  isSameDay,
  isWeekend,
} from "date-fns";
