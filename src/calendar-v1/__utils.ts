export function isInvalid(
  date: Date,
  minDate: Date | null,
  maxDate: Date | null,
) {
  return (
    (minDate != null && date < minDate) || (maxDate != null && date > maxDate)
  );
}
