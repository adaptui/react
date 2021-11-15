import * as React from "react";
import { getDocument } from "reakit-utils/getDocument";
import { isButton } from "reakit-utils/isButton";

import { DialogOptions } from "../Dialog";

export function useDisclosureRef(
  dialogRef: React.RefObject<HTMLElement>,
  options: DialogOptions,
) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (options.visible && !options.isPresent) {
      // We get the last focused element before the dialog opens, so we can move
      // focus back to it when the dialog closes.
      const onFocus = (event: FocusEvent) => {
        const target = event.target as HTMLElement;

        if ("focus" in target) {
          ref.current = target;

          if (options.disclosureRef) {
            options.disclosureRef.current = target;
          }
        }
      };

      const document = getDocument(dialogRef.current);
      document.addEventListener("focusin", onFocus);

      return () => document.removeEventListener("focusin", onFocus);
    }
  }, [options.visible, options.isPresent, options.disclosureRef, dialogRef]);

  React.useEffect(() => {
    if (!options.visible && options.isPresent) {
      // Safari and Firefox on MacOS don't focus on buttons on mouse down.
      // Instead, they focus on the closest focusable parent (ultimately, the
      // body element). This works around that by preventing that behavior and
      // forcing focus on the disclosure button. Otherwise, we wouldn't be able
      // to close the dialog by clicking again on the disclosure.
      const onMouseDown = (event: MouseEvent) => {
        const element = event.currentTarget as HTMLElement;

        if (!isButton(element)) return;

        event.preventDefault();
        element.focus();
      };

      const disclosure = options.disclosureRef?.current || ref.current;
      disclosure?.addEventListener("mousedown", onMouseDown);

      return () => disclosure?.removeEventListener("mousedown", onMouseDown);
    }
  }, [options.visible, options.isPresent, options.disclosureRef]);

  return options.disclosureRef || ref;
}
