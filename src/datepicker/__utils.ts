import { isString } from "@chakra-ui/utils";

export function setTime(date: Date, time: Date) {
  if (!date || !time) {
    return;
  }

  date.setHours(time.getHours());
  date.setMinutes(time.getMinutes());
  date.setSeconds(time.getSeconds());
  date.setMilliseconds(time.getMilliseconds());
}

export function isInvalid(value: Date, minValue?: Date, maxValue?: Date) {
  return (
    value != null &&
    ((minValue != null && value < new Date(minValue)) ||
      (maxValue != null && value > new Date(maxValue)))
  );
}

// As per https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#dates
export function parseDate(dateValue: string | undefined) {
  if (dateValue == null || !isString(dateValue)) return;

  const dateRegex = dateValue.match(/(\d{4,})(-(\d\d)){1,2}/i);
  if (dateRegex == null) return;

  const date = dateValue.split("-");
  if (+date[0] <= 0 || +date[1] < 1 || +date[1] > 12) return;

  const maxDay = isLeapYear(+date[0])
    ? getMaxDay(+date[1], true)
    : getMaxDay(+date[1]);
  if (+date[2] < 1 && +date[2] > maxDay) return;

  return new Date(+date[0], +date[1] - 1, +date[2], 0, 0, 0, 0);
}

function getMaxDay(month: number, isLeapYear = false) {
  const _31DaysMonth = [1, 3, 5, 7, 8, 10];
  const _30DaysMonth = [4, 6, 9, 11];

  if (_31DaysMonth.includes(month)) return 31;
  if (_30DaysMonth.includes(month)) return 30;
  if (month === 2 && isLeapYear) return 29;
  return 28;
}

function isLeapYear(year: number) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

export function stringifyDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`;
}

function pad(number: number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}
