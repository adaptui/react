// Automatically generated
export const USE_CALENDAR_STATE_KEYS = [
  "value",
  "defaultValue",
  "onChange",
  "minValue",
  "maxValue",
  "isDisabled",
  "isReadOnly",
  "autoFocus",
  "id",
] as const;
export const CALENDAR_STATE_KEYS = [
  "calendarId",
  "dateValue",
  "month",
  "year",
  "weekStart",
  "weekDays",
  "daysInMonth",
  "isDisabled",
  "isFocused",
  "isReadOnly",
  "currentMonth",
  "focusedDate",
  "isInvalidDateRange",
  "isRangeCalendar",
  "setFocused",
  "setCurrentMonth",
  "setFocusedDate",
  "setDateValue",
  "focusCell",
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
export const USE_RANGE_CALENDAR_STATE_KEYS = USE_CALENDAR_STATE_KEYS;
export const RANGE_CALENDAR_STATE_KEYS = [
  ...CALENDAR_STATE_KEYS,
  "dateRangeValue",
  "anchorDate",
  "highlightedRange",
  "setDateRangeValue",
  "setAnchorDate",
  "highlightDate",
] as const;
export const CALENDAR_KEYS = RANGE_CALENDAR_STATE_KEYS;
export const CALENDAR_BUTTON_KEYS = [...CALENDAR_KEYS, "goto"] as const;
export const CALENDAR_CELL_KEYS = [...CALENDAR_KEYS, "date"] as const;
export const CALENDAR_CELL_BUTTON_KEYS = CALENDAR_CELL_KEYS;
export const CALENDAR_GRID_KEYS = CALENDAR_KEYS;
export const CALENDAR_HEADER_KEYS = [...CALENDAR_GRID_KEYS, "format"] as const;
export const CALENDAR_WEEK_TITLE_KEYS = [
  ...CALENDAR_GRID_KEYS,
  "dayIndex",
] as const;
