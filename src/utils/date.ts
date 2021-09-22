import { RangeValue } from "@react-types/shared";

export const toUTCString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const toUTCRangeString = (date: RangeValue<Date>) => {
  return { start: toUTCString(date.start), end: toUTCString(date.end) };
};

export {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  getDate,
  getDaysInMonth,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  isSameDay,
  isSameMonth,
  isWeekend,
  setDate,
  setDay,
  setHours,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
