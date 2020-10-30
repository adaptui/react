// Automatically generated
const NUMBER_INPUT_STATE_KEYS = [
  "value",
  "min",
  "max",
  "step",
  "precision",
  "keepWithinRange",
  "valueAsNumber",
  "isOutOfRange",
  "isAtMax",
  "isAtMin",
  "inputRef",
  "setValue",
  "increment",
  "decrement",
  "reset",
  "clamp",
  "cast",
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
