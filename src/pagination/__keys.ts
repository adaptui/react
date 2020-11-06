// Automatically generated
const PAGINATION_STATE_KEYS = [
  "currentPage",
  "pages",
  "isAtFirstPage",
  "isAtLastPage",
  "movePage",
  "nextPage",
  "prevPage",
  "firstPage",
  "lastPage",
] as const;
export const PAGINATION_KEYS = PAGINATION_STATE_KEYS;
export const PAGINATION_BUTTON_KEYS = [...PAGINATION_KEYS, "goto"] as const;
