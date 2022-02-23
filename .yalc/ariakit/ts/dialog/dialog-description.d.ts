import { As, Options, Props } from "ariakit-utils/types";
import { DialogState } from "./dialog-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a description element for a dialog. This hook
 * must be used in a component that's wrapped with `Dialog` so the
 * `aria-describedby` prop is properly set on the dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * // This component must be wrapped with Dialog
 * const props = useDialogDescription();
 * <Role {...props}>Description</Role>
 * ```
 */
export declare const useDialogDescription: import("ariakit-utils/types").Hook<DialogDescriptionOptions<"p">>;
/**
 * A component that renders a description in a dialog. This component must be
 * wrapped with `Dialog` so the `aria-describedby` prop is properly set on the
 * dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <Dialog state={dialog}>
 *   <DialogDescription>Description</DialogDescription>
 * </Dialog>
 * ```
 */
export declare const DialogDescription: import("ariakit-utils/types").Component<DialogDescriptionOptions<"p">>;
export declare type DialogDescriptionOptions<T extends As = "p"> = Options<T> & {
    /**
     * Object returned by the `useDialogState` hook. If not provided, the parent
     * `Dialog` component's context will be used.
     */
    state?: DialogState;
};
export declare type DialogDescriptionProps<T extends As = "p"> = Props<DialogDescriptionOptions<T>>;
