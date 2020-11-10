// Automatically generated
const COMBOBOX_LIST_STATE_KEYS = [
  "baseId",
  "unstable_idCountRef",
  "unstable_virtual",
  "rtl",
  "orientation",
  "groups",
  "currentId",
  "loop",
  "wrap",
  "unstable_moves",
  "unstable_angular",
  "unstable_hasActiveWidget",
  "items",
  "menuRole",
  "inputValue",
  "minValueLength",
  "currentValue",
  "values",
  "limit",
  "matches",
  "list",
  "inline",
  "autoSelect",
  "visible",
  "setBaseId",
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
  "reset",
  "unstable_setHasActiveWidget",
  "registerItem",
  "setInputValue",
  "setMinValueLength",
  "setValues",
  "setLimit",
  "setList",
  "setInline",
  "setAutoSelect",
] as const;
const COMBOBOX_BASE_STATE_KEYS = COMBOBOX_LIST_STATE_KEYS;
const COMBOBOX_LIST_GRID_STATE_KEYS = [
  ...COMBOBOX_BASE_STATE_KEYS,
  "columns",
  "setColumns",
] as const;
const SELECT_POPOVER_STATE_KEYS = [
  "baseId",
  "unstable_idCountRef",
  "visible",
  "animated",
  "animating",
  "modal",
  "unstable_disclosureRef",
  "unstable_referenceRef",
  "unstable_popoverRef",
  "unstable_arrowRef",
  "unstable_popoverStyles",
  "unstable_arrowStyles",
  "unstable_originalPlacement",
  "unstable_update",
  "placement",
  "setBaseId",
  "show",
  "hide",
  "toggle",
  "setVisible",
  "setAnimated",
  "stopAnimation",
  "setModal",
  "place",
] as const;
const COMBOBOX_POPOVER_STATE_KEYS = SELECT_POPOVER_STATE_KEYS;
const COMBOBOX_STATE_KEYS = [
  ...COMBOBOX_BASE_STATE_KEYS,
  ...COMBOBOX_POPOVER_STATE_KEYS,
] as const;
const COMBOBOX_GRID_STATE_KEYS = [
  ...COMBOBOX_LIST_GRID_STATE_KEYS,
  ...COMBOBOX_STATE_KEYS,
] as const;
const SELECT_LIST_STATE_KEYS = [
  "baseId",
  "unstable_idCountRef",
  "unstable_virtual",
  "rtl",
  "orientation",
  "groups",
  "currentId",
  "loop",
  "wrap",
  "unstable_moves",
  "unstable_angular",
  "unstable_hasActiveWidget",
  "items",
  "menuRole",
  "value",
  "selectedId",
  "setBaseId",
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
  "reset",
  "unstable_setHasActiveWidget",
  "registerItem",
  "setValue",
] as const;
const SELECT_BASE_STATE_KEYS = SELECT_LIST_STATE_KEYS;
const SELECT_LIST_GRID_STATE_KEYS = [
  ...SELECT_BASE_STATE_KEYS,
  "columns",
  "setColumns",
] as const;
const SELECT_STATE_KEYS = [
  ...COMBOBOX_POPOVER_STATE_KEYS,
  ...SELECT_BASE_STATE_KEYS,
] as const;
const SELECT_GRID_STATE_KEYS = [
  ...SELECT_LIST_GRID_STATE_KEYS,
  ...SELECT_STATE_KEYS,
] as const;
export const COMBOBOX_KEYS = [
  ...COMBOBOX_GRID_STATE_KEYS,
  ...SELECT_GRID_STATE_KEYS,
  "hideOnEsc",
] as const;
export const COMBOBOX_GRID_CELL_KEYS = [
  ...COMBOBOX_GRID_STATE_KEYS,
  ...SELECT_GRID_STATE_KEYS,
] as const;
export const COMBOBOX_GRID_ROW_KEYS = COMBOBOX_GRID_CELL_KEYS;
export const COMBOBOX_ITEM_KEYS = COMBOBOX_GRID_ROW_KEYS;
export const COMBOBOX_LIST_KEYS = COMBOBOX_ITEM_KEYS;
export const COMBOBOX_OPTION_KEYS = COMBOBOX_LIST_KEYS;
export const COMBOBOX_POPOVER_KEYS = COMBOBOX_OPTION_KEYS;
export const SELECT_KEYS = [
  ...COMBOBOX_POPOVER_KEYS,
  ...COMBOBOX_KEYS,
] as const;
export const SELECT_ITEM_KEYS = COMBOBOX_POPOVER_KEYS;
export const SELECT_LIST_KEYS = SELECT_ITEM_KEYS;
export const SELECT_OPTION_KEYS = SELECT_LIST_KEYS;
export const SELECT_POPOVER_KEYS = SELECT_OPTION_KEYS;
