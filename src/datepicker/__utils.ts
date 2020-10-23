export function setTime(date: Date, time: Date) {
  if (!date || !time) {
    return;
  }

  date.setHours(time.getHours());
  date.setMinutes(time.getMinutes());
  date.setSeconds(time.getSeconds());
  date.setMilliseconds(time.getMilliseconds());
}
