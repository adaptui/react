/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * for these utils inspiration
 */
import { setDay } from "date-fns";
import { useDateFormatter } from "@react-aria/i18n";

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
