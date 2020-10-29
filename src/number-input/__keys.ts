// Automatically generated
const NUMBER_INPUT_STATE_KEYS = [
  "keepWithinRange",
  "min",
  "max",
  "step",
  "isOutOfRange",
  "isAtMax",
  "isAtMin",
  "precision",
  "value",
  "valueAsNumber",
  "update",
  "reset",
  "increment",
  "decrement",
  "clamp",
  "cast",
  "inputRef",
  "focusInput",
  "spinUp",
  "spinDown",
  "spinStop",
] as const;
export const NUMBER_INPUT_KEYS = [
  ...NUMBER_INPUT_STATE_KEYS,
  "clampValueOnBlur",
  "allowMouseWheel",
] as const;
export const NUMBER_INPUT_BUTTON_KEYS = NUMBER_INPUT_STATE_KEYS;
