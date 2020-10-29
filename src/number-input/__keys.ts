// Automatically generated
const NUMBER_INPUT_STATE_KEYS = [
  "inputRef",
  "focusInput",
  "spinUp",
  "spinDown",
  "spinStop",
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
  "keepWithinRange",
  "min",
  "max",
  "step",
] as const;
export const NUMBER_INPUT_KEYS = [
  ...NUMBER_INPUT_STATE_KEYS,
  "clampValueOnBlur",
  "allowMouseWheel",
] as const;
export const NUMBER_INPUT_BUTTON_KEYS = NUMBER_INPUT_STATE_KEYS;
