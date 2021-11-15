import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { Portal } from "reakit";

import {
  DisclosureContentHTMLProps,
  DisclosureContentOptions,
  useDisclosureContent,
} from "../disclosure/DisclosureContent";

import { DIALOG_BACKDROP_KEYS } from "./__keys";
import { DialogStateReturn } from "./DialogState";
import { DialogBackdropContext } from "./helpers";

export type DialogBackdropOptions = DisclosureContentOptions &
  Pick<Partial<DialogStateReturn>, "modal">;

export type DialogBackdropHTMLProps = DisclosureContentHTMLProps;

export type DialogBackdropProps = DialogBackdropOptions &
  DialogBackdropHTMLProps;

export const useDialogBackdrop = createHook<
  DialogBackdropOptions,
  DialogBackdropHTMLProps
>({
  name: "DialogBackdrop",
  compose: useDisclosureContent,
  keys: DIALOG_BACKDROP_KEYS,

  useOptions({ modal = true, ...options }) {
    return { modal, ...options };
  },

  useProps(options, { wrapElement: htmlWrapElement, ...htmlProps }) {
    const wrapElement = React.useCallback(
      (element: React.ReactNode) => {
        if (options.modal) {
          element = (
            <Portal>
              <DialogBackdropContext.Provider value={options.baseId}>
                {element}
              </DialogBackdropContext.Provider>
            </Portal>
          );
        }
        if (htmlWrapElement) {
          return htmlWrapElement(element);
        }
        return element;
      },
      [options.modal, options.baseId, htmlWrapElement],
    );

    return {
      id: undefined,
      "data-dialog-ref": options.baseId,
      wrapElement,
      ...htmlProps,
    };
  },
});

export const DialogBackdrop = createComponent({
  as: "div",
  memo: true,
  useHook: useDialogBackdrop,
});
