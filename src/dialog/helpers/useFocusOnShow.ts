import * as React from "react";
import {
  ensureFocus,
  getFirstTabbableIn,
  hasFocusWithin,
  useUpdateEffect,
} from "reakit-utils";
import { warning } from "reakit-warning";

import { DialogOptions } from "../Dialog";

export function useFocusOnShow(
  dialogRef: React.RefObject<HTMLElement>,
  nestedDialogs: Array<React.RefObject<HTMLElement>>,
  options: DialogOptions,
) {
  const initialFocusRef = options.unstable_initialFocusRef;
  const shouldFocus = options.visible && options.unstable_autoFocusOnShow;

  useUpdateEffect(() => {
    const dialog = dialogRef.current;

    warning(
      !!shouldFocus && !dialog,
      "[reakit/Dialog]",
      "Can't set initial focus on dialog because `ref` wasn't passed to the dialog element.",
    );

    if (!shouldFocus) return;
    if (!dialog) return;
    if (!options.present) return;

    // If there're nested open dialogs, let them handle focus
    if (nestedDialogs.some(child => child.current && !child.current.hidden)) {
      return;
    }

    if (initialFocusRef?.current) {
      initialFocusRef.current.focus({ preventScroll: true });
    } else {
      const tabbable = getFirstTabbableIn(dialog, true);
      const isActive = () => hasFocusWithin(dialog);
      if (tabbable) {
        ensureFocus(tabbable, { preventScroll: true, isActive });
      } else {
        ensureFocus(dialog, { preventScroll: true, isActive });
        warning(
          dialog.tabIndex === undefined || dialog.tabIndex < 0,
          "It's recommended to have at least one tabbable element inside dialog. The dialog element has been automatically focused.",
          "If this is the intended behavior, pass `tabIndex={0}` to the dialog element to disable this warning.",
          dialog,
        );
      }
    }
  }, [dialogRef, shouldFocus, options.present, nestedDialogs, initialFocusRef]);
}