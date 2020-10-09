import { ColumnType } from "./TimePickerColumnState";

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
