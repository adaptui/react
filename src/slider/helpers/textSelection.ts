import { runAfterTransition } from "@react-aria/utils";

// Safari on iOS starts selecting text on long press. The only way to avoid this, it seems,
// is to add user-select: none to the entire page. Adding it to the pressable element prevents
// that element from being selected, but nearby elements may still receive selection. We add
// user-select: none on touch start, and remove it again on touch end to prevent this.
// This must be implemented using global state to avoid race conditions between multiple elements.

// There are three possible states due to the delay before removing user-select: none after
// pointer up. The 'default' state always transitions to the 'disabled' state, which transitions
// to 'restoring'. The 'restoring' state can either transition back to 'disabled' or 'default'.
type State = "default" | "disabled" | "restoring";

let state: State = "default";
let savedUserSelect = "";

export function disableTextSelection() {
  if (state === "default") {
    savedUserSelect = document.documentElement.style.webkitUserSelect;
    document.documentElement.style.webkitUserSelect = "none";
  }

  state = "disabled";
}

export function restoreTextSelection() {
  // If the state is already default, there's nothing to do.
  // If it is restoring, then there's no need to queue a second restore.
  if (state !== "disabled") {
    return;
  }

  state = "restoring";

  // There appears to be a delay on iOS where selection still might occur
  // after pointer up, so wait a bit before removing user-select.
  setTimeout(() => {
    // Wait for any CSS transitions to complete so we don't recompute style
    // for the whole page in the middle of the animation and cause jank.
    runAfterTransition(() => {
      // Avoid race conditions
      if (state === "restoring") {
        if (document.documentElement.style.webkitUserSelect === "none") {
          document.documentElement.style.webkitUserSelect =
            savedUserSelect || "";
        }

        savedUserSelect = "";
        state = "default";
      }
    });
  }, 300);
}
