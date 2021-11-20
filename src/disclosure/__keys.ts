// Automatically generated
export const DISCLOSURE_STATE_KEYS = [
  "baseId",
  "unstable_idCountRef",
  "visible",
  "setBaseId",
  "show",
  "hide",
  "toggle",
  "setVisible",
] as const;
export const USE_DISCLOSURE_STATE_KEYS = [
  "baseId",
  "visible",
  "defaultVisible",
  "onVisibleChange",
] as const;
export const DISCLOSURE_KEYS = DISCLOSURE_STATE_KEYS;
export const DISCLOSURE_CONTENT_KEYS = [
  ...DISCLOSURE_KEYS,
  "animation",
  "transition",
  "isHidden",
  "presenceRef",
  "transitionState",
  "onEnd",
  "contentWidth",
  "contentHeight",
] as const;
