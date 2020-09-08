const NUMBERINPUT_STATE_KEYS = [
  "keepWithinRange",
  "clampValueOnBlur",
  "min",
  "max",
  "step",
  "isReadOnly",
  "isDisabled",
  "isInteractive",
  "inputRef",
  "focusInput",
  "isFocused",
  "setFocused",
  "value",
  "valueAsNumber",
  "isAtMax",
  "isAtMin",
  "isOutOfRange",
  "precision",
  "increment",
  "decrement",
  "update",
  "reset",
  "cast",
  "clamp",
  "spinner",
] as const;

export const NUMBERINPUT_KEYS = [
  ...NUMBERINPUT_STATE_KEYS,
  "getAriaValueText",
] as const;
export const NUMBERINPUT_BUTTON_KEYS = NUMBERINPUT_STATE_KEYS;
