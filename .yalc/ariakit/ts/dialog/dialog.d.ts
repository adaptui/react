import { ComponentPropsWithRef, ElementType, KeyboardEvent as ReactKeyboardEvent, RefObject, SyntheticEvent } from "react";
import { As, BooleanOrCallback, Props } from "ariakit-utils/types";
import { DisclosureContentOptions, DisclosureContentProps } from "../disclosure/disclosure-content";
import { FocusableOptions } from "../focusable/focusable";
import { PortalOptions } from "../portal/portal";
import { DialogState } from "./dialog-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const state = useDialogState();
 * const props = useDialog({ state });
 * <Role {...props}>Dialog</Role>
 * ```
 */
export declare const useDialog: import("ariakit-utils/types").Hook<DialogOptions<"div">>;
/**
 * A component that renders a dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <DialogDisclosure state={dialog}>Disclosure</DialogDisclosure>
 * <Dialog state={dialog}>Dialog</Dialog>
 * ```
 */
export declare const Dialog: import("ariakit-utils/types").Component<DialogOptions<"div">>;
export declare type DialogOptions<T extends As = "div"> = FocusableOptions<T> & PortalOptions<T> & Omit<DisclosureContentOptions<T>, "state"> & {
    /**
     * Object returned by the `useDialogState` hook.
     */
    state: DialogState;
    /**
     * Determines whether the dialog is modal. Modal dialogs have distinct
     * states and behaviors:
     *   - The `portal`, `backdrop` and `preventBodyScroll` props are set to
     *     `true`. They can still be manually set to `false`.
     *   - A visually hidden dismiss button will be rendered if the
     *     `DialogDismiss` component hasn't been used. This allows screen reader
     *     users to close the dialog.
     *   - The focus will be trapped within the dialog.
     *   - When the dialog is visible, the elements outside of the dialog will
     *     be hidden to assistive technology users using the `aria-hidden`
     *     attribute.
     *   - When using the `Heading` or `DialogHeading` components within the
     *     dialog, their level will be reset so they start with `h1`.
     * @default true
     */
    modal?: boolean;
    /**
     * Determines whether there will be a backdrop behind the dialog. On modal
     * dialogs, this is `true` by default. Besides a `boolean`, this prop can
     * also be a React component that will be rendered as the backdrop.
     * @example
     * ```jsx
     * <Dialog backdrop={StyledBackdrop} />
     * ```
     */
    backdrop?: boolean | ElementType<ComponentPropsWithRef<"div">>;
    /**
     * Props that will be passed to the backdrop element if `backdrop` is
     * `true`.
     */
    backdropProps?: Omit<DisclosureContentProps, "state">;
    /**
     * Determines whether the dialog will be hidden when the user presses the
     * Escape key.
     * @default true
     */
    hideOnEscape?: BooleanOrCallback<KeyboardEvent | ReactKeyboardEvent>;
    /**
     * Determines whether the dialog will be hidden when the user clicks or
     * focus on an element outside of the dialog.
     * @default true
     */
    hideOnInteractOutside?: BooleanOrCallback<Event | SyntheticEvent>;
    /**
     * Determines whether the body scrolling will be prevented when the dialog
     * is shown.
     */
    preventBodyScroll?: boolean;
    /**
     * Determines whether an element inside the dialog will receive focus when
     * the dialog is shown. By default, this is usually the first tabbable
     * element in the dialog or the dialog itself. The `initialFocusRef` prop
     * can be used to set a different element to receive focus.
     * @default true
     */
    autoFocusOnShow?: boolean;
    /**
     * Determines whether an element outside of the dialog will be focused when
     * the dialog is hidden if another element hasn't been focused in the action
     * of hiding the dialog (for example, by clicking or tabbing into another
     * tabbable element outside of the dialog). By default, this is usually the
     * disclosure element. The `finalFocusRef` prop can be used to define a
     * different element to be focused.
     * @default true
     */
    autoFocusOnHide?: boolean;
    /**
     * Determines which element will receive focus when the dialog is shown.
     * This has no effect if `autoFocusOnShow` is `false`. If not set, the first
     * tabbable element inside the dialog or the dialog itself will receive
     * focus.
     */
    initialFocusRef?: RefObject<HTMLElement>;
    /**
     * Determines which element will receive focus when the dialog is hidden if
     * another element hasn't been focused in the action of hiding the dialog
     * (for example, by clicking or tabbing into another tabbable element
     * outside of the dialog). This has no effect if `autoFocusOnHide` is
     * `false`. If not set, the disclosure element will be used.
     */
    finalFocusRef?: RefObject<HTMLElement>;
};
export declare type DialogProps<T extends As = "div"> = Props<DialogOptions<T>>;
