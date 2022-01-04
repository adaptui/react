import * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { createHook } from "reakit-system";
import { Portal } from "reakit";

import {
  DisclosureContentHTMLProps,
  DisclosureContentOptions,
  useDisclosureContent,
} from "../disclosure/DisclosureContent";
import { createComponent } from "../system";

import { DIALOG_BACKDROP_KEYS } from "./__keys";
import { DialogStateReturn } from "./DialogState";
import { DialogBackdropContext } from "./helpers";

export type DialogBackdropOptions = DisclosureContentOptions &
  Pick<Partial<DialogStateReturn>, "modal"> & {
    /**
     * When enabled, user can't scroll on body when the dialog is visible.
     * This option doesn't work if the dialog isn't modal.
     */
    preventBodyScroll?: boolean;
  };

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

  useOptions({ modal = true, preventBodyScroll = modal, ...options }) {
    return { modal, preventBodyScroll: modal && preventBodyScroll, ...options };
  },

  useProps(options, htmlProps) {
    const { modal, baseId, preventBodyScroll } = options;
    const { wrapElement: htmlWrapElement, ...restHtmlProps } = htmlProps;
    const wrapElement = React.useCallback(
      (element: React.ReactNode) => {
        if (modal) {
          if (preventBodyScroll) {
            element = (
              <Portal>
                <DialogBackdropContext.Provider value={baseId}>
                  <RemoveScroll>{element}</RemoveScroll>
                </DialogBackdropContext.Provider>
              </Portal>
            );
          } else {
            element = (
              <Portal>
                <DialogBackdropContext.Provider value={baseId}>
                  {element}
                </DialogBackdropContext.Provider>
              </Portal>
            );
          }
        }

        if (htmlWrapElement) {
          return htmlWrapElement(element);
        }

        return element;
      },
      [modal, htmlWrapElement, preventBodyScroll, baseId],
    );

    return {
      id: undefined,
      "data-dialog-ref": baseId,
      wrapElement,
      ...restHtmlProps,
    };
  },
});

export const DialogBackdrop = createComponent({
  as: "div",
  memo: true,
  useHook: useDialogBackdrop,
});
