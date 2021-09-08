import { RangeValue } from "@react-types/shared";
import subDays from "date-fns/subDays";
import subMonths from "date-fns/subMonths";
import subWeeks from "date-fns/subWeeks";
import subYears from "date-fns/subYears";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import addYears from "date-fns/addYears";
import addWeeks from "date-fns/addWeeks";
import getDate from "date-fns/getDate";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import getMonth from "date-fns/getMonth";
import getSeconds from "date-fns/getSeconds";
import getYear from "date-fns/getYear";
import setDate from "date-fns/setDate";
import setDay from "date-fns/setDay";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import startOfMonth from "date-fns/startOfMonth";
import startOfDay from "date-fns/startOfDay";
import endOfMonth from "date-fns/endOfMonth";
import getDaysInMonth from "date-fns/getDaysInMonth";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import isWeekend from "date-fns/isWeekend";

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
