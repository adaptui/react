import dayjs from "dayjs";
import { RangeValue } from "@react-types/shared";

export const toUTCString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const toUTCRangeString = (date: RangeValue<Date>) => {
  return { start: toUTCString(date.start), end: toUTCString(date.end) };
};

export const subDays = (date: Date, amount: number) =>
  dayjs(date).subtract(amount, "day").toDate();

export const subMonths = (date: Date, amount: number) =>
  dayjs(date).subtract(amount, "months").toDate();

export const subWeeks = (date: Date, amount: number) =>
  dayjs(date).subtract(amount, "weeks").toDate();

export const subYears = (date: Date, amount: number) =>
  dayjs(date).subtract(amount, "years").toDate();

export const addDays = (date: Date, amount: number) =>
  dayjs(date).add(amount, "day").toDate();

export const addMonths = (date: Date, amount: number) =>
  dayjs(date).add(amount, "months").toDate();

export const addYears = (date: Date, amount: number) =>
  dayjs(date).add(amount, "years").toDate();

export const addWeeks = (date: Date, amount: number) =>
  dayjs(date).add(amount, "weeks").toDate();

export const getDate = (date: Date) => dayjs(date).get("date");

export const getHours = (date: Date) => dayjs(date).get("hours");

export const getMinutes = (date: Date) => dayjs(date).get("minutes");

export const getMonth = (date: Date) => dayjs(date).get("months");

export const getSeconds = (date: Date) => dayjs(date).get("seconds");

export const getYear = (date: Date) => dayjs(date).get("years");

export const setDate = (date: Date, value: number) =>
  dayjs(date).set("date", value).toDate();

export const setHours = (date: Date, value: number) =>
  dayjs(date).set("hour", value).toDate();

export const setMinutes = (date: Date, value: number) =>
  dayjs(date).set("minute", value).toDate();

export const setSeconds = (date: Date, value: number) =>
  dayjs(date).set("second", value).toDate();

export const setMonth = (date: Date, value: number) =>
  dayjs(date).set("month", value).toDate();

export const setYear = (date: Date, value: number) =>
  dayjs(date).set("year", value).toDate();

export const startOfMonth = (date: Date) => {
  return dayjs(date).startOf("month");
};

export const startOfDay = (date: Date) => {
  return dayjs(date).startOf("day");
};

export const endOfMonth = (date: Date) => {
  return dayjs(date).endOf("month");
};

export const getDaysInMonth = (date: Date) => dayjs(date).daysInMonth();

export const isSameMonth = (date1: Date, date2: Date) =>
  dayjs(date1).isSame(date2, "month");

export const isSameDay = (date1: Date, date2: Date) =>
  dayjs(date1).isSame(date2, "day");

export const isWeekend = (date: Date) => {
  const day = dayjs(date).get("day");
  return day === 0 || day === 6;
};

export const formatDate = (date: Date, fmt: string) => {
  return dayjs(date).format(fmt);
};
