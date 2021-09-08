import { RangeValue } from "@react-types/shared";
import subDays from "date-fns/esm/subDays";
import subMonths from "date-fns/esm/subMonths";
import subWeeks from "date-fns/esm/subWeeks";
import subYears from "date-fns/esm/subYears";
import addDays from "date-fns/esm/addDays";
import addMonths from "date-fns/esm/addMonths";
import addYears from "date-fns/esm/addYears";
import addWeeks from "date-fns/esm/addWeeks";
import getDate from "date-fns/esm/getDate";
import getHours from "date-fns/esm/getHours";
import getMinutes from "date-fns/esm/getMinutes";
import getMonth from "date-fns/esm/getMonth";
import getSeconds from "date-fns/esm/getSeconds";
import getYear from "date-fns/esm/getYear";
import setDate from "date-fns/esm/setDate";
import setDay from "date-fns/esm/setDay";
import setHours from "date-fns/esm/setHours";
import setMinutes from "date-fns/esm/setMinutes";
import setSeconds from "date-fns/esm/setSeconds";
import setMonth from "date-fns/esm/setMonth";
import setYear from "date-fns/esm/setYear";
import startOfMonth from "date-fns/esm/startOfMonth";
import startOfDay from "date-fns/esm/startOfDay";
import endOfMonth from "date-fns/esm/endOfMonth";
import getDaysInMonth from "date-fns/esm/getDaysInMonth";
import isSameMonth from "date-fns/esm/isSameMonth";
import isSameDay from "date-fns/esm/isSameDay";
import isWeekend from "date-fns/esm/isWeekend";

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
};
