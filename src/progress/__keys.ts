const PROGRESS_STATE_KEYS = [
  "value",
  "isIndeterminate",
  "min",
  "max",
  "percent",
] as const;

export const PROGRESS_KEYS = PROGRESS_STATE_KEYS;
export const PROGRESS_BAR_KEYS = [...PROGRESS_STATE_KEYS, "getAriaValueText"];
