const PAGINATION_STATE_KEYS = [
  "next",
  "prev",
  "goTo",
  "first",
  "last",
  "pages",
  "currentPage",
  "isAtMin",
  "isAtMax",
] as const;

export const PAGINATION_KEYS = PAGINATION_STATE_KEYS;
export const PAGINATION_ITEM_KEYS = [
  ...PAGINATION_STATE_KEYS,
  "page",
  "getAriaLabel",
];
