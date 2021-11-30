// Automatically generated
export const USE_SLIDER_BASE_STATE_KEYS = [
  "orientation",
  "isDisabled",
  "onChangeEnd",
  "minValue",
  "maxValue",
  "step",
  "value",
  "defaultValue",
  "onChange",
  "label",
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
export const SLIDER_STATE_KEYS = [
  "trackRef",
  "labelProps",
  "groupProps",
  "trackProps",
  "outputProps",
] as const;
export const USE_SLIDER_STATE_KEYS = [
  "orientation",
  "isDisabled",
  "onChangeEnd",
  "minValue",
  "maxValue",
  "step",
  "value",
  "defaultValue",
  "onChange",
  "label",
  "id",
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "aria-details",
  "state",
] as const;
export const SLIDER_THUMB_STATE_KEYS = [
  "inputRef",
  "thumbProps",
  "inputProps",
  "labelProps",
] as const;
export const USE_SLIDER_THUMB_STATE_KEYS = [
  "orientation",
  "isDisabled",
  "index",
  "autoFocus",
  "onFocus",
  "onBlur",
  "onFocusChange",
  "onKeyDown",
  "onKeyUp",
  "validationState",
  "isRequired",
  "label",
  "id",
  "excludeFromTabOrder",
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "aria-details",
  "aria-errormessage",
  "trackRef",
  "state",
] as const;
export const SLIDER_GROUP_KEYS = [
  ...SLIDER_BASE_STATE_KEYS,
  ...SLIDER_STATE_KEYS,
  ...SLIDER_THUMB_STATE_KEYS,
] as const;
export const SLIDER_INPUT_KEYS = SLIDER_GROUP_KEYS;
export const SLIDER_LABEL_KEYS = SLIDER_INPUT_KEYS;
export const SLIDER_OUTPUT_KEYS = SLIDER_LABEL_KEYS;
export const SLIDER_THUMB_KEYS = SLIDER_OUTPUT_KEYS;
export const SLIDER_TRACK_KEYS = SLIDER_THUMB_KEYS;
