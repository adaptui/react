// Automatically generated
export const CALENDAR_STATE_KEYS = [
  "dateValue",
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
  "isDisabled",
  "isFocused",
  "isReadOnly",
  "setFocused",
  "weeksInMonth",
  "weekStart",
  "getCellOptions",
] as const;

export const CALENDAR_CELL_BUTTON_KEYS = [
  ...CALENDAR_STATE_KEYS,
  "weekIndex",
  "dayIndex",
] as const;

export const CALENDAR_CELL_KEYS = CALENDAR_CELL_BUTTON_KEYS;
export const CALENDAR_GRID_KEYS = CALENDAR_STATE_KEYS;
export const CALENDAR_BUTTON_KEYS = CALENDAR_STATE_KEYS;
