/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * for these utils inspiration
 */
import { DateValue } from "./index.d";
import { RangeValue } from "@react-types/shared";
import { useDateFormatter } from "@react-aria/i18n";
import { endOfDay, setDay, startOfDay } from "date-fns";

export function isInvalid(
  date: Date,
  minDate: Date | null,
  maxDate: Date | null,
) {
  return (
    (minDate != null && date < minDate) || (maxDate != null && date > maxDate)
  );
}

export function useWeekDays(weekStart: number) {
  const dayFormatter = useDateFormatter({ weekday: "short" });
  const dayFormatterLong = useDateFormatter({ weekday: "long" });

  return [...new Array(7).keys()].map(index => {
    const dateDay = setDay(Date.now(), (index + weekStart) % 7);
    const day = dayFormatter.format(dateDay);
    const dayLong = dayFormatterLong.format(dateDay);
    return { title: dayLong, abbr: day };
  });
}

export function generateDaysInMonthArray(
  month: number,
  monthStartsAt: number,
  weeksInMonth: number,
  year: number,
) {
  return [...new Array(weeksInMonth).keys()].reduce(
    (weeks: Date[][], weekIndex) => {
      const daysInWeek = [...new Array(7).keys()].reduce(
        (days: Date[], dayIndex) => {
          const day = weekIndex * 7 + dayIndex - monthStartsAt + 1;
          const cellDate = new Date(year, month, day, new Date().getHours());

          return [...days, cellDate];
        },
        [],
      );

      return [...weeks, daysInWeek];
    },
    [],
  );
}

export function makeRange(start: Date, end: Date): RangeValue<Date> {
  if (end < start) {
    [start, end] = [end, start];
  }

  return { start: start, end: endOfDay(end) };
}

export function convertRange(range: RangeValue<DateValue>): RangeValue<Date> {
  return {
    start: new Date(range.start),
    end: new Date(range.end),
  };
}
