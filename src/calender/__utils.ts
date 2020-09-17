import {
  getDaysInMonth,
  startOfMonth,
  getDay,
  endOfMonth,
  setDate,
  addMonths,
} from "date-fns";

export const chunk = function (array: any[], size: number): any[] {
  const results = [];
  while (array.length) results.push(array.splice(0, size));
  return results;
};

export const generateMonths = (
  selectedDate: Date,
): [{ date: Date; type: string }][] => {
  const daysInMonth = getDaysInMonth(selectedDate);
  const startWeekDays = getDay(startOfMonth(selectedDate));
  const endWeekDays = getDay(endOfMonth(selectedDate));

  const grid = chunk(
    [
      ...Array.from({ length: startWeekDays }, (_, i) => ({
        date: setDate(selectedDate, -i),
        type: "disabled",
      })).reverse(),
      ...Array.from({ length: daysInMonth }, (_, i) => ({
        date: setDate(selectedDate, i + 1),
        type: "current",
      })),
      ...Array.from({ length: 6 - endWeekDays }, (_, i) => ({
        date: setDate(addMonths(selectedDate, 1), i + 1),
        type: "disabled",
      })),
    ],
    7,
  );

  return grid;
};
