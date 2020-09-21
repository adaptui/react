// Automatically generated
const CALENDAR_STATE_KEYS = [
  "dateValue",
  "minDate",
  "maxDate",
  "month",
  "year",
  "weekStart",
  "daysInMonth",
  "isDisabled",
  "isFocused",
  "isReadOnly",
  "setFocused",
  "setDateValue",
  "currentMonth",
  "setCurrentMonth",
  "focusedDate",
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
export const CALENDAR_BUTTON_KEYS = [
  ...CALENDAR_STATE_KEYS,
  "goto",
  "getAriaLabel",
] as const;
export const CALENDAR_CELL_KEYS = [...CALENDAR_STATE_KEYS, "date"] as const;
export const CALENDAR_CELL_BUTTON_KEYS = CALENDAR_CELL_KEYS;
export const CALENDAR_GRID_KEYS = CALENDAR_STATE_KEYS;
