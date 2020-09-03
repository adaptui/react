export const ACCORDION_STATE_KEYS = [
  "baseId",
  "unstable_idCountRef",
  "setBaseId",
  "items",
  "registerItem",
  "buttons",
  "registerButton",
  "panels",
  "registerPanel",
  "activeItems",
  "addActiveItem",
  "removeActiveItem",
  "allowMultiple",
  "allowToggle",
  "defaultActiveId",
  "manual",
  "loop",
  "next",
  "prev",
  "first",
  "last",
] as const;

export const ACCORDION_ITEM_KEYS = ACCORDION_STATE_KEYS;
export const ACCORDION_TRIGGER_KEYS = ACCORDION_STATE_KEYS;
export const ACCORDION_PANEL_KEYS = ACCORDION_STATE_KEYS;
