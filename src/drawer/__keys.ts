const DRAWER_STATE_KEYS = [
  "baseId",
  "unstable_idCountRef",
  "visible",
  "animated",
  "animating",
  "setBaseId",
  "show",
  "hide",
  "toggle",
  "setVisible",
  "setAnimated",
  "stopAnimation",
  "modal",
  "unstable_disclosureRef",
  "setModal",
] as const;

export const DRAWER_KEYS = [
  ...DRAWER_STATE_KEYS,
  "hideOnEsc",
  "hideOnClickOutside",
  "preventBodyScroll",
  "unstable_initialFocusRef",
  "unstable_finalFocusRef",
  "unstable_orphan",
  "unstable_autoFocusOnShow",
  "unstable_autoFocusOnHide",
] as const;
export const DRAWER_BACKDROP_KEYS = DRAWER_STATE_KEYS;
export const DRAWER_DISCLOSURE_KEYS = DRAWER_BACKDROP_KEYS;
