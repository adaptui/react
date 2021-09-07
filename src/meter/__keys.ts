// Automatically generated
export const USE_METER_STATE_KEYS = [
  "value",
  "min",
  "max",
  "low",
  "optimum",
  "high",
] as const;
export const METER_STATE_KEYS = [
  ...USE_METER_STATE_KEYS,
  "percent",
  "status",
] as const;
export const METER_KEYS = METER_STATE_KEYS;
