const PAGINATION_STATE_KEYS = [
  "currentPage",
  "isAtMin",
  "isAtMax",
  "next",
  "prev",
  "goTo",
  "id",
  "page",
  "pages",
] as const;

export const PAGINATION_KEYS = PAGINATION_STATE_KEYS;
