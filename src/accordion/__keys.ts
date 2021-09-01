// Automatically generated
export const USE_ACCORDION_BASE_STATE_KEYS = [
  "baseId",
  "unstable_virtual",
  "rtl",
  "orientation",
  "currentId",
  "loop",
  "wrap",
  "shift",
  "unstable_includesBaseElement",
] as const;
export const ACCORDION_BASE_STATE_KEYS = [
  ...USE_ACCORDION_BASE_STATE_KEYS,
  "unstable_idCountRef",
  "items",
  "groups",
  "unstable_moves",
  "unstable_hasActiveWidget",
  "panels",
  "setBaseId",
  "registerItem",
  "unregisterItem",
  "registerGroup",
  "unregisterGroup",
  "move",
  "next",
  "previous",
  "up",
  "down",
  "first",
  "last",
  "sort",
  "unstable_setVirtual",
  "setRTL",
  "setOrientation",
  "setCurrentId",
  "setLoop",
  "setWrap",
  "setShift",
  "reset",
  "unstable_setIncludesBaseElement",
  "unstable_setHasActiveWidget",
  "registerPanel",
  "unregisterPanel",
] as const;
export const USE_ACCORDION_MULTI_STATE_KEYS = [
  ...USE_ACCORDION_BASE_STATE_KEYS,
  "manual",
  "selectedIds",
  "defaultSelectedIds",
  "onSelectedIdsChange",
  "shouldUpdate",
] as const;
export const ACCORDION_MULTI_STATE_KEYS = [
  ...ACCORDION_BASE_STATE_KEYS,
  "selectedIds",
  "allowToggle",
  "allowMultiple",
  "manual",
  "setSelectedIds",
  "select",
] as const;
export const USE_ACCORDION_STATE_KEYS = [
  ...USE_ACCORDION_BASE_STATE_KEYS,
  "selectedId",
  "manual",
  "allowToggle",
  "defaultSelectedId",
  "onSelectedIdChange",
  "shouldUpdate",
] as const;
export const ACCORDION_STATE_KEYS = [
  ...ACCORDION_BASE_STATE_KEYS,
  "selectedId",
  "allowToggle",
  "allowMultiple",
  "manual",
  "setSelectedId",
  "select",
] as const;
export const ACCORDION_KEYS = [
  ...ACCORDION_MULTI_STATE_KEYS,
  ...ACCORDION_STATE_KEYS,
] as const;
export const ACCORDION_PANEL_KEYS = [...ACCORDION_KEYS, "accordionId"] as const;
export const ACCORDION_TRIGGER_KEYS = ACCORDION_KEYS;
