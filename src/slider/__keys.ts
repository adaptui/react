export const SLIDERE_STATE_KEYS = [
  "actions",
  "handlers",
  "refs",
  "state",
  "styles",
] as const;
export const SLIDER_KEYS = [...SLIDERE_STATE_KEYS] as const;
export const SLIDER_TRACK_KEYS = [...SLIDER_KEYS, "id"] as const;
export const SLIDER_FILLED_TRACK_KEYS = [...SLIDER_KEYS] as const;
export const SLIDER_THUMB_KEYS = [
  ...SLIDER_KEYS,
  "id",
  "getAriaValueText",
] as const;
