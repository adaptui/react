// Automatically generated
export const USE_DRAWER_STATE_KEYS = [
  "baseId",
  "visible",
  "defaultVisible",
  "onVisibleChange",
  "modal",
] as const;
export const DRAWER_STATE_KEYS = [
  "baseId",
  "unstable_idCountRef",
  "visible",
  "modal",
  "disclosureRef",
  "setBaseId",
  "show",
  "hide",
  "toggle",
  "setVisible",
  "setModal",
] as const;
export const DRAWER_KEYS = [...DRAWER_STATE_KEYS, "placement"] as const;
export const DRAWER_BACKDROP_KEYS = DRAWER_STATE_KEYS;
export const DRAWER_DISCLOSURE_KEYS = DRAWER_BACKDROP_KEYS;
