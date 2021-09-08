import { formatDate } from "../utils";
import { isString } from "@chakra-ui/utils";

import { ColumnType } from "./TimePickerColumnState";

// As per https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#times
export function parseTime(timeValue: string | undefined) {
  if (timeValue == null || !isString(timeValue)) return;

  const timeRegex = timeValue.match(/(\d\d)(:(\d\d)){1,2}/i);
  if (timeRegex == null) return;

  const time = timeValue.split(":");
  const date = new Date();

  if (+time[0] < 0 || +time[0] > 23 || +time[1] < 0 || +time[1] > 59) return;

  date.setHours(+time[0]);
  date.setMinutes(+time[1]);
  date.setSeconds(0);

  if (time[2]) {
    if (+time[2] < 0 || +time[2] > 60) return;
    date.setSeconds(+time[2]);
  }

  return date;
}

export function stringifyTime(date: Date) {
  return formatDate(date, "HH:mm:ss");
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
