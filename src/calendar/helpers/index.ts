/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * for these utils inspiration
 */
import { RangeValue } from "@react-types/shared";
import { useDateFormatter } from "@react-aria/i18n";
import dayjs from "dayjs";

export function useWeekDays(weekStart: number) {
  const dayFormatter = useDateFormatter({ weekday: "short" });
  const dayFormatterLong = useDateFormatter({ weekday: "long" });

  return [0, 1, 2, 3, 4, 5, 6].map(index => {
    const dateDay = dayjs(Date.now())
      .set("day", (index + weekStart) % 7)
      .toDate();
    const day = dayFormatter.format(dateDay);
    const dayLong = dayFormatterLong.format(dateDay);
    return { title: dayLong, abbr: day } as const;
  });
}

export function generateDaysInMonthArray(
  month: number,
  monthStartsAt: number,
  weeksInMonth: number,
  year: number,
) {
  return Array(weeksInMonth)
    .fill(1)
    .reduce((weeks: Date[][], _, weekIndex) => {
      const daysInWeek = [0, 1, 2, 3, 4, 5, 6].reduce(
        (days: Date[], dayIndex) => {
          const day = weekIndex * 7 + dayIndex - monthStartsAt + 1;
          const cellDate = new Date(year, month, day, new Date().getHours());

          return [...days, cellDate];
        },
        [],
      );

      return [...weeks, daysInWeek];
    }, []);
}

export function makeRange(start: Date, end: Date): RangeValue<Date> {
  if (end < start) {
    [start, end] = [end, start];
  }

  return { start, end };
}

export * from "./useWeekStart";
