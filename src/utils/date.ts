import { format, parse } from "date-fns";
import { RangeValue } from "@react-types/shared";

export function parseDate(dateValue: string | undefined) {
  if (dateValue == null) return;

  const parsedDate = parse(dateValue, "yyyyyy-MM-dd", new Date());

  // Check for Invalid Date
  if (isNaN(+parsedDate)) return;
  parsedDate.setHours(new Date().getHours());
  return parsedDate;
}

export const parseRangeDate = (
  date?: RangeValue<string>,
): RangeValue<Date> | undefined => {
  if (!date) return;

  const start = parseDate(date.start);
  const end = parseDate(date.end);
  if (!start || !end) return;
  return { start, end };
};

export function stringifyDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function isInvalidDateRange(
  value: Date,
  minValue?: Date,
  maxValue?: Date,
) {
  return (
    value != null &&
    ((minValue != null && value < minValue) ||
      (maxValue != null && value > maxValue))
  );
}
