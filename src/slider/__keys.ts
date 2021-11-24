// Automatically generated
export const USE_SLIDER_BASE_STATE_KEYS = [
  "step",
  "minValue",
  "maxValue",
  "isDisabled",
  "value",
  "defaultValue",
  "onChange",
  "onChangeEnd",
  "formatOptions",
] as const;
export const SLIDER_BASE_STATE_KEYS = [
  "values",
  "focusedThumb",
  "step",
  "getThumbValue",
  "setThumbValue",
  "setThumbPercent",
  "isThumbDragging",
  "setThumbDragging",
  "setFocusedThumb",
  "getThumbPercent",
  "getValuePercent",
  "getThumbValueLabel",
  "getFormattedValue",
  "getThumbMinValue",
  "getThumbMaxValue",
  "getPercentValue",
  "isThumbEditable",
  "setThumbEditable",
] as const;
export const USE_SLIDER_STATE_KEYS = [
  ...USE_SLIDER_BASE_STATE_KEYS,
  "id",
  "aria-label",
  "aria-labelledby",
  "orientation",
] as const;
export const SLIDER_STATE_KEYS = [
  "labelProps",
  "fieldProps",
  "trackRef",
  "moveProps",
  "onDownTrack",
  "baseState",
] as const;
export const SLIDER_GROUP_KEYS = [
  ...SLIDER_BASE_STATE_KEYS,
  ...SLIDER_STATE_KEYS,
] as const;
export const SLIDER_INPUT_KEYS = [...SLIDER_GROUP_KEYS, "index"] as const;
export const SLIDER_LABEL_KEYS = SLIDER_GROUP_KEYS;
export const SLIDER_OUTPUT_KEYS = SLIDER_LABEL_KEYS;
export const SLIDER_THUMB_KEYS = [
  ...SLIDER_OUTPUT_KEYS,
  ...SLIDER_INPUT_KEYS,
] as const;
export const SLIDER_TRACK_KEYS = SLIDER_OUTPUT_KEYS;
