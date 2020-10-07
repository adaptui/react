// Automatically generated
const CALENDAR_STATE_KEYS = [
  "calendarId",
  "dateValue",
  "minDate",
  "maxDate",
  "month",
  "year",
  "weekStart",
  "weekDays",
  "daysInMonth",
  "isDisabled",
  "isFocused",
  "isReadOnly",
  "setFocused",
  "setDateValue",
  "currentMonth",
  "setCurrentMonth",
  "focusedDate",
  "focusCell",
  "setFocusedDate",
  "focusNextDay",
  "focusPreviousDay",
  "focusNextWeek",
  "focusPreviousWeek",
  "focusNextMonth",
  "focusPreviousMonth",
  "focusStartOfMonth",
  "focusEndOfMonth",
  "focusNextYear",
  "focusPreviousYear",
  "selectFocusedDate",
  "selectDate",
] as const;
const RANGE_CALENDAR_STATE_KEYS = [
  ...CALENDAR_STATE_KEYS,
  "dateRangeValue",
  "setDateRangeValue",
  "anchorDate",
  "setAnchorDate",
  "highlightedRange",
  "highlightDate",
] as const;
export const CALENDAR_KEYS = RANGE_CALENDAR_STATE_KEYS;
export const CALENDAR_BUTTON_KEYS = [
  ...CALENDAR_KEYS,
  "goto",
  "getAriaLabel",
] as const;
export const CALENDAR_CELL_KEYS = [...CALENDAR_KEYS, "date"] as const;
export const CALENDAR_CELL_BUTTON_KEYS = CALENDAR_CELL_KEYS;
export const CALENDAR_GRID_KEYS = CALENDAR_KEYS;
export const CALENDAR_HEADER_KEYS = [...CALENDAR_GRID_KEYS, "format"] as const;
export const CALENDAR_WEEK_TITLE_KEYS = [
  ...CALENDAR_GRID_KEYS,
  "dayIndex",
] as const;
