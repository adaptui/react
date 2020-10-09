import { isString } from "@chakra-ui/utils";

import { ColumnType } from "./TimePickerColumnState";

export function parseTime(timeValue: string | undefined) {
  if (timeValue == null) return;

  if (isString(timeValue)) {
    const timeRegex = timeValue.match(/(\d+)(:(\d\d))?\s*(p?)/i);
    if (timeRegex == null) return;

    const time = timeValue.split(":");
    const date = new Date();

    date.setHours(parseInt(time[0], 10));
    date.setMinutes(parseInt(time[1], 10));
    date.setSeconds(0, 0);

    return date;
  }

  return new Date(timeValue);
}

function pad(number: number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

export function stringifyTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function getSelectedValueFromDate(date: Date, type: ColumnType) {
  if (type === "minute") return date.getMinutes();
  if (type === "meridian") return date.getHours() >= 12 ? 1 : 0;
  return date.getHours() % 12 || 12;
}

export function getSelectedDateFromValue(
  value: number,
  date: Date,
  type: ColumnType,
) {
  if (type === "minute") {
    return new Date(date.setMinutes(value));
  }

  if (type === "meridian") {
    let hours = date.getHours() % 12;

    if (value === 1) {
      hours = hours + 12;
    } else {
      hours = hours % 12;
    }

    return new Date(date.setHours(hours));
  }

  if (date.getHours() >= 12) {
    if (value !== 12) {
      value = value + 12;
    }
  } else {
    if (value !== 12) {
      value = value % 12;
    } else {
      value = 0;
    }
  }

  return new Date(date.setHours(value));
}
