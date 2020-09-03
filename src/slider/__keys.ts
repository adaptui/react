export const SLIDER_STATE_KEYS = [
  "actions",
  "handlers",
  "refs",
  "state",
  "styles",
] as const;

export const SLIDER_KEYS = SLIDER_STATE_KEYS;
export const SLIDER_TRACK_KEYS = [...SLIDER_KEYS, "id"] as const;
export const SLIDER_FILLED_TRACK_KEYS = SLIDER_KEYS;
export const SLIDER_THUMB_KEYS = [
  ...SLIDER_TRACK_KEYS,
  "getAriaValueText",
] as const;
export const SLIDER_INPUT_KEYS = SLIDER_KEYS;
