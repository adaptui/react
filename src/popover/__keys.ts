// Automatically generated
export const POPOVER_STATE_KEYS = [
  "baseId",
  "unstable_idCountRef",
  "visible",
  "modal",
  "disclosureRef",
  "popperStyles",
  "arrowStyles",
  "placedSide",
  "placedAlign",
  "sideIndex",
  "alignIndex",
  "sideOffset",
  "alignOffset",
  "arrowOffset",
  "collisionTolerance",
  "anchor",
  "popper",
  "arrow",
  "setBaseId",
  "show",
  "hide",
  "toggle",
  "setVisible",
  "setModal",
  "setSideIndex",
  "setAlignIndex",
  "setSideOffset",
  "setAlignOffset",
  "setArrowOffset",
  "setCollisionTolerance",
  "setAnchor",
  "setPopper",
  "setArrow",
] as const;
export const USE_POPOVER_STATE_KEYS = [
  "baseId",
  "visible",
  "defaultVisible",
  "onVisibleChange",
  "modal",
  "sideIndex",
  "alignIndex",
  "sideOffset",
  "alignOffset",
  "arrowOffset",
  "collisionTolerance",
  "enableCollisionsDetection",
] as const;
export const ARROW_KEYS = POPOVER_STATE_KEYS;
export const ARROW_CONTENT_KEYS = ARROW_KEYS;
export const POPOVER_KEYS = ARROW_CONTENT_KEYS;
export const POPOVER_BACKDROP_KEYS = POPOVER_KEYS;
export const POPOVER_CONTENT_KEYS = POPOVER_BACKDROP_KEYS;
export const POPOVER_DISCLOSURE_KEYS = POPOVER_CONTENT_KEYS;
export const GET_PLACEMENT_DATA_KEYS = [
  ...POPOVER_DISCLOSURE_KEYS,
  "anchorRect",
  "popperSize",
  "arrowSize",
  "side",
  "align",
  "shouldAvoidCollisions",
  "collisionBoundariesRect",
] as const;
export const GET_ARROW_STYLES_KEYS = [
  ...POPOVER_DISCLOSURE_KEYS,
  "popperSize",
  "arrowSize",
  "side",
  "align",
] as const;