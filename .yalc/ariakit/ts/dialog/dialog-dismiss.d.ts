import { As, Props } from "ariakit-utils/types";
import { ButtonOptions } from "../button";
import { DialogState } from "./dialog-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that hides a dialog.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const state = useDialogState();
 * const props = useDialogDismiss({ state });
 * <Dialog state={state}>
 *   <Role {...props} />
 * </Dialog>
 * ```
 */
export declare const useDialogDismiss: import("ariakit-utils/types").Hook<DialogDismissOptions<"button">>;
/**
 * A component that renders a button that hides a dialog.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <Dialog state={dialog}>
 *   <DialogDismiss />
 * </Dialog>
 * ```
 */
export declare const DialogDismiss: import("ariakit-utils/types").Component<DialogDismissOptions<"button">>;
export declare type DialogDismissOptions<T extends As = "button"> = ButtonOptions<T> & {
    /**
     * Object returned by the `useDialogState` hook.
     */
    state?: DialogState;
};
export declare type DialogDismissProps<T extends As = "button"> = Props<DialogDismissOptions<T>>;
