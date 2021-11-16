import * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { createComponent, createHook, useCreateElement } from "reakit-system";
import { Portal } from "reakit";
import { useForkRef, useLiveRef } from "reakit-utils";
import { useWarning, warning } from "reakit-warning";

import {
  DisclosureContentHTMLProps,
  DisclosureContentOptions,
  useDisclosureContent,
} from "../disclosure";

import { DIALOG_KEYS } from "./__keys";
import { DialogStateReturn } from "./DialogState";
import {
  DialogBackdropContext,
  useDisableHoverOutside,
  useDisclosureRef,
  useFocusOnBlur,
  useFocusOnChildUnmount,
  useFocusOnHide,
  useFocusOnShow,
  useFocusTrap,
  useHideOnClickOutside,
  useNestedDialogs,
} from "./helpers";

export type DialogOptions = DisclosureContentOptions &
  Pick<Partial<DialogStateReturn>, "modal" | "hide" | "disclosureRef"> &
  Pick<DialogStateReturn, "baseId"> & {
    /**
     * When enabled, user can hide the dialog by pressing `Escape`.
     */
    hideOnEsc?: boolean;

    /**
     * When enabled, user can hide the dialog by clicking outside it.
     */
    hideOnClickOutside?: boolean;

    /**
     * When enabled, user can't scroll on body when the dialog is visible.
     * This option doesn't work if the dialog isn't modal.
     */
    preventBodyScroll?: boolean;

    /**
     * The element that will be focused when the dialog shows.
     * When not set, the first tabbable element within the dialog will be used.
     */
    unstable_initialFocusRef?: React.RefObject<HTMLElement>;

    /**
     * The element that will be focused when the dialog hides.
     * When not set, the disclosure component will be used.
     */
    unstable_finalFocusRef?: React.RefObject<HTMLElement>;

    /**
     * Whether or not the dialog should be a child of its parent.
     * Opening a nested orphan dialog will close its parent dialog if
     * `hideOnClickOutside` is set to `true` on the parent.
     * It will be set to `false` if `modal` is `false`.
     */
    unstable_orphan?: boolean;

    /**
     * Whether or not to move focus when the dialog shows.
     * @private
     */
    unstable_autoFocusOnShow?: boolean;

    /**
     * Whether or not to move focus when the dialog hides.
     * @private
     */
    unstable_autoFocusOnHide?: boolean;
  };

export type DialogHTMLProps = DisclosureContentHTMLProps;

export type DialogProps = DialogOptions & DialogHTMLProps;

export const useDialog = createHook<DialogOptions, DialogHTMLProps>({
  name: "Dialog",
  compose: useDisclosureContent,
  keys: DIALOG_KEYS,

  useOptions(options) {
    const {
      modal = true,
      hideOnEsc = true,
      hideOnClickOutside = true,
      preventBodyScroll = modal,
      unstable_autoFocusOnShow = true,
      unstable_autoFocusOnHide = true,
      unstable_orphan,
      ...restOptions
    } = options;

    return {
      modal,
      hideOnEsc,
      hideOnClickOutside,
      preventBodyScroll: modal && preventBodyScroll,
      unstable_autoFocusOnShow,
      unstable_autoFocusOnHide,
      unstable_orphan: modal && unstable_orphan,
      ...restOptions,
    };
  },

  useProps(options, htmlProps) {
    const {
      preventBodyScroll,
      baseId,
      hideOnEsc,
      hide,
      modal: optionsModal,
    } = options;
    const {
      ref: htmlRef,
      onKeyDown: htmlOnKeyDown,
      onBlur: htmlOnBlur,
      wrapElement: htmlWrapElement,
      tabIndex,
      ...restHtmlProps
    } = htmlProps;
    const dialog = React.useRef<HTMLElement>(null);
    const backdrop = React.useContext(DialogBackdropContext);
    const hasBackdrop = backdrop && backdrop === baseId;
    const disclosure = useDisclosureRef(dialog, options);
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);
    const onBlurRef = useLiveRef(htmlOnBlur);
    const focusOnBlur = useFocusOnBlur(dialog, options);
    const { dialogs, visibleModals, wrap } = useNestedDialogs(dialog, options);
    // VoiceOver/Safari accepts only one `aria-modal` container, so if there
    // are visible child modals, then we don't want to set aria-modal on the
    // parent modal (this component).
    const modal = optionsModal && !visibleModals.length ? true : undefined;

    useFocusTrap(dialog, visibleModals, options);
    useFocusOnChildUnmount(dialog, options);
    useFocusOnShow(dialog, dialogs, options);
    useFocusOnHide(dialog, disclosure, options);
    useHideOnClickOutside(dialog, disclosure, dialogs, options);
    useDisableHoverOutside(dialog, dialogs, options);

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        onKeyDownRef.current?.(event);

        if (event.defaultPrevented) return;
        if (event.key !== "Escape") return;
        if (!hideOnEsc) return;
        if (!hide) {
          warning(
            true,
            "`hideOnEsc` prop is truthy, but `hide` prop wasn't provided.",
            dialog.current,
          );
          return;
        }
        event.stopPropagation();

        hide();
      },
      [onKeyDownRef, hideOnEsc, hide],
    );

    const onBlur = React.useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        onBlurRef.current?.(event);

        focusOnBlur(event);
      },
      [focusOnBlur, onBlurRef],
    );

    const wrapElement = React.useCallback(
      (element: React.ReactNode) => {
        element = wrap(element);

        if (optionsModal && !hasBackdrop) {
          if (preventBodyScroll) {
            element = (
              <Portal>
                <RemoveScroll>{element}</RemoveScroll>
              </Portal>
            );
          } else {
            element = <Portal>{element}</Portal>;
          }
        }

        if (htmlWrapElement) {
          element = htmlWrapElement(element);
        }

        // return (
        //   // Prevents Menu > Dialog > Menu to behave as a sub menu
        //   <MenuContext.Provider value={null}>{element}</MenuContext.Provider>
        // );
        return element;
      },
      [wrap, optionsModal, hasBackdrop, htmlWrapElement, preventBodyScroll],
    );

    return {
      ref: useForkRef(dialog, htmlRef),
      role: "dialog",
      tabIndex: tabIndex ?? -1,
      "aria-modal": modal,
      "data-dialog": true,
      onKeyDown,
      onBlur,
      wrapElement,
      ...restHtmlProps,
    };
  },
});

export const Dialog = createComponent({
  as: "div",
  useHook: useDialog,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
    );
    return useCreateElement(type, props, children);
  },
});
