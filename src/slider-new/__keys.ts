// Automatically generated
const SLIDER_STATE_KEYS = [
  "values",
  "min",
  "max",
  "step",
  "isDisabled",
  "trackRef",
  "orientation",
  "getThumbValue",
  "setThumbValue",
  "setThumbPercent",
  "isThumbDragging",
  "setThumbDragging",
  "focusedThumb",
  "setFocusedThumb",
  "getThumbPercent",
  "getValuePercent",
  "getThumbMinValue",
  "getThumbMaxValue",
  "getPercentValue",
  "isThumbEditable",
  "setThumbEditable",
  "getThumbValueLabel",
  "getFormattedValue",
  "setValues",
] as const;
export const SLIDER_INPUT_KEYS = [...SLIDER_STATE_KEYS, "index"] as const;
export const SLIDER_THUMB_KEYS = [...SLIDER_INPUT_KEYS, "inputRef"] as const;
export const SLIDER_TRACK_KEYS = SLIDER_STATE_KEYS;
