import {
  getDate,
  getDaysInMonth,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
} from "date-fns";

import { DateTimeFormatOpts } from "../../utils/types";

export function convertValue(value: Date | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }

  return new Date(value);
}

export function getSegmentLimits(
  date: Date,
  type: string,
  options: DateTimeFormatOpts,
) {
  let value, minValue, maxValue;
  switch (type) {
    case "day":
      value = getDate(date);
      minValue = 1;
      maxValue = getDaysInMonth(date);
      break;
    case "dayPeriod":
      value = getHours(date) >= 12 ? 12 : 0;
      minValue = 0;
      maxValue = 12;
      break;
    case "hour":
      value = getHours(date);
      if (options.hour12) {
        const isPM = value >= 12;
        minValue = isPM ? 12 : 0;
        maxValue = isPM ? 23 : 11;
      } else {
        minValue = 0;
        maxValue = 23;
      }
      break;
    case "minute":
      value = getMinutes(date);
      minValue = 0;
      maxValue = 59;
      break;
    case "second":
      value = getSeconds(date);
      minValue = 0;
      maxValue = 59;
      break;
    case "month":
      value = getMonth(date) + 1;
      minValue = 1;
      maxValue = 12;
      break;
    case "year":
      value = getYear(date);
      minValue = 1;
      maxValue = 9999;
      break;
    default:
      return {};
  }

  return {
    value,
    minValue,
    maxValue,
  };
}

export function add(
  value: Date,
  part: string,
  amount: number,
  options: Intl.ResolvedDateTimeFormatOptions,
) {
  switch (part) {
    case "day": {
      const day = getDate(value);
      return setDate(value, cycleValue(day, amount, 1, getDaysInMonth(value)));
    }
    case "dayPeriod": {
      const hours = getHours(value);
      const isPM = hours >= 12;
      return setHours(value, isPM ? hours - 12 : hours + 12);
    }
    case "hour": {
      let hours = getHours(value);
      let min = 0;
      let max = 23;
      if (options.hour12) {
        const isPM = hours >= 12;
        min = isPM ? 12 : 0;
        max = isPM ? 23 : 11;
      }
      hours = cycleValue(hours, amount, min, max);
      return setHours(value, hours);
    }
    case "minute": {
      const minutes = cycleValue(getMinutes(value), amount, 0, 59, true);
      return setMinutes(value, minutes);
    }
    case "month": {
      const months = cycleValue(getMonth(value), amount, 0, 11);
      return setMonth(value, months);
    }
    case "second": {
      const seconds = cycleValue(getSeconds(value), amount, 0, 59, true);
      return setSeconds(value, seconds);
    }
    case "year": {
      const year = cycleValue(getYear(value), amount, 1, 9999, true);
      return setYear(value, year);
    }
  }
}

export function cycleValue(
  value: number,
  amount: number,
  min: number,
  max: number,
  round = false,
) {
  if (round) {
    value += amount > 0 ? 1 : -1;

    if (value < min) {
      value = max;
    }

    const div = Math.abs(amount);
    if (amount > 0) {
      value = Math.ceil(value / div) * div;
    } else {
      value = Math.floor(value / div) * div;
    }

    if (value > max) {
      value = min;
    }
  } else {
    value += amount;
    if (value < min) {
      value = max - (min - value - 1);
    } else if (value > max) {
      value = min + (value - max - 1);
    }
  }

  return value;
}

export function setSegment(
  value: Date,
  part: string,
  segmentValue: number,
  options: Intl.ResolvedDateTimeFormatOptions,
) {
  switch (part) {
    case "day":
      return setDate(value, segmentValue);
    case "dayPeriod": {
      const hours = getHours(value);
      const wasPM = hours >= 12;
      const isPM = segmentValue >= 12;
      if (isPM === wasPM) {
        return value;
      }
      return setHours(value, wasPM ? hours - 12 : hours + 12);
    }
    case "hour":
      // In 12 hour time, ensure that AM/PM does not change
      if (options.hour12) {
        const hours = getHours(value);
        const wasPM = hours >= 12;
        if (!wasPM && segmentValue === 12) {
          segmentValue = 0;
        }
        if (wasPM && segmentValue < 12) {
          segmentValue += 12;
        }
      }
      return setHours(value, segmentValue);
    case "minute":
      return setMinutes(value, segmentValue);
    case "month":
      return setMonth(value, segmentValue - 1);
    case "second":
      return setSeconds(value, segmentValue);
    case "year":
      return setYear(value, segmentValue);
  }
}

// Converts unicode number strings to real JS numbers.
// Numbers can be displayed and typed in many number systems, but JS
// only understands latin numbers.
// See https://www.fileformat.info/info/unicode/category/Nd/list.htm
// for a list of unicode numeric characters.
// Currently only Arabic and Latin numbers are supported, but more
// could be added here in the future.
// Keep this in sync with `isNumeric` below.
export function parseNumber(str: string): number {
  str = str
    // Arabic Indic
    .replace(/[\u0660-\u0669]/g, c => String(c.charCodeAt(0) - 0x0660))
    // Extended Arabic Indic
    .replace(/[\u06f0-\u06f9]/g, c => String(c.charCodeAt(0) - 0x06f0));

  return Number(str);
}

// Checks whether a unicode string could be converted to a number.
// Keep this in sync with `parseNumber` above.
export function isNumeric(str: string) {
  return /^[0-9\u0660-\u0669\u06f0-\u06f9]+$/.test(str);
}

export * from "./useSpinButton";
