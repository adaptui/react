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
  "isReadOnly",
  "isInvalid",
  "isDisabled",
  "isRequired",
  "updateValue",
  "setValue",
  "setCastedValue",
  "increment",
  "decrement",
  "reset",
  "clampToPrecision",
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
export const NUMBER_INPUT_DECREMENT_BUTTON_KEYS = NUMBER_INPUT_STATE_KEYS;
export const NUMBER_INPUT_INCREMENT_BUTTON_KEYS = NUMBER_INPUT_DECREMENT_BUTTON_KEYS;
