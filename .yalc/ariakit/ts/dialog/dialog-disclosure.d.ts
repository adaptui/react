import { As, Props } from "ariakit-utils/types";
import { DisclosureOptions } from "../disclosure/disclosure";
import { DialogState } from "./dialog-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that shows/hides a dialog.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const state = useDialogState();
 * const props = useDialogDisclosure({ state });
 * <Role {...props}>Disclosure</Role>
 * <Dialog state={state}>Content</Dialog>
 * ```
 */
export declare const useDialogDisclosure: import("ariakit-utils/types").Hook<DialogDisclosureOptions<"button">>;
/**
 * A component that renders a button that shows/hides a dialog.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <DialogDisclosure state={dialog}>Disclosure</DialogDisclosure>
 * <Dialog state={dialog}>Content</Dialog>
 * ```
 */
export declare const DialogDisclosure: import("ariakit-utils/types").Component<DialogDisclosureOptions<"button">>;
export declare type DialogDisclosureOptions<T extends As = "button"> = Omit<DisclosureOptions<T>, "state"> & {
    /**
     * Object returned by the `useDialogState` hook.
     */
    state: DialogState;
};
export declare type DialogDisclosureProps<T extends As = "button"> = Props<DialogDisclosureOptions<T>>;
