// Automatically generated
export const USE_PAGINATION_STATE_KEYS = [
  "defaultPage",
  "page",
  "onChange",
  "count",
  "boundaryCount",
  "siblingCount",
] as const;
export const PAGINATION_STATE_KEYS = [
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
