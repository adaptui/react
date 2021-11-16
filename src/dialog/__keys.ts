// Automatically generated
export const USE_DIALOG_STATE_KEYS = [
  "baseId",
  "visible",
  "defaultVisible",
  "onVisibleChange",
  "modal",
] as const;
export const DIALOG_STATE_KEYS = [
  "baseId",
  "unstable_idCountRef",
  "visible",
  "setBaseId",
  "show",
  "hide",
  "toggle",
  "setVisible",
  "modal",
  "disclosureRef",
  "setModal",
] as const;
export const DIALOG_KEYS = [
  ...DIALOG_STATE_KEYS,
  "hideOnEsc",
  "hideOnClickOutside",
  "preventBodyScroll",
  "unstable_initialFocusRef",
  "unstable_finalFocusRef",
  "unstable_orphan",
  "unstable_autoFocusOnShow",
  "unstable_autoFocusOnHide",
] as const;
export const DIALOG_BACKDROP_KEYS = [
  ...DIALOG_STATE_KEYS,
  "preventBodyScroll",
] as const;
export const DIALOG_DISCLOSURE_KEYS = DIALOG_STATE_KEYS;