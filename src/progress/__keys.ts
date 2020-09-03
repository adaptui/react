const PROGRESS_STATE_KEYS = [
  "value",
  "isIndeterminate",
  "min",
  "max",
  "percent",
] as const;

export const PROGRESS_KEYS = [...PROGRESS_STATE_KEYS, "getAriaValueText"];
