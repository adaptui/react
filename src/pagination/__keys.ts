// Automatically generated
const PAGINATION_STATE_KEYS = [
  "pages",
  "currentPage",
  "isAtMax",
  "isAtMin",
  "next",
  "prev",
  "move",
  "first",
  "last",
] as const;
export const PAGINATION_KEYS = PAGINATION_STATE_KEYS;
export const PAGINATION_BUTTON_KEYS = [
  ...PAGINATION_KEYS,
  "goto",
  "getAriaLabel",
] as const;
