// Automatically generated
export const USE_TOOLTIP_STATE_KEYS = [
  "baseId",
  "visible",
  "side",
  "align",
  "sideOffset",
  "alignOffset",
  "arrowOffset",
  "collisionTolerance",
  "defaultVisible",
  "onVisibleChange",
  "enableCollisionsDetection",
  "unstable_timeout",
] as const;
export const TOOLTIP_STATE_KEYS = [
  "baseId",
  "visible",
  "side",
  "align",
  "sideOffset",
  "alignOffset",
  "arrowOffset",
  "collisionTolerance",
  "unstable_idCountRef",
  "disclosureRef",
  "popperStyles",
  "arrowStyles",
  "placedSide",
  "placedAlign",
  "anchor",
  "popper",
  "arrow",
  "setBaseId",
  "show",
  "hide",
  "toggle",
  "setVisible",
  "setSide",
  "setAlign",
  "setSideOffset",
  "setAlignOffset",
  "setArrowOffset",
  "setCollisionTolerance",
  "setAnchor",
  "setPopper",
  "setArrow",
  "unstable_timeout",
  "unstable_setTimeout",
] as const;
export const TOOLTIP_KEYS = [...TOOLTIP_STATE_KEYS, "unstable_portal"] as const;
export const TOOLTIP_ANCHOR_KEYS = TOOLTIP_STATE_KEYS;
export const TOOLTIP_ARROW_KEYS = TOOLTIP_ANCHOR_KEYS;
export const TOOLTIP_ARROW_CONTENT_KEYS = TOOLTIP_ARROW_KEYS;
export const TOOLTIP_CONTENT_KEYS = TOOLTIP_ARROW_CONTENT_KEYS;
export const TOOLTIP_REFERENCE_KEYS = TOOLTIP_CONTENT_KEYS;
export const TOOLTIP_TRIGGER_KEYS = TOOLTIP_REFERENCE_KEYS;
