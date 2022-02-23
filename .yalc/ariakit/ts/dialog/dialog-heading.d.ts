import { As, Props } from "ariakit-utils/types";
import { HeadingOptions } from "../heading";
import { DialogState } from "./dialog-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a heading element for a dialog. This hook must be
 * used in a component that's wrapped with `Dialog` so the `aria-labelledby`
 * prop is properly set on the dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * // This component must be wrapped with Dialog
 * const props = useDialogHeading();
 * <Role {...props}>Heading</Role>
 * ```
 */
export declare const useDialogHeading: import("ariakit-utils/types").Hook<DialogHeadingOptions<"h1">>;
/**
 * A component that renders a heading in a dialog. This component must be
 * wrapped with `Dialog` so the `aria-labelledby` prop is properly set on the
 * dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <Dialog state={dialog}>
 *   <DialogHeading>Heading</DialogHeading>
 * </Dialog>
 * ```
 */
export declare const DialogHeading: import("ariakit-utils/types").Component<DialogHeadingOptions<"h1">>;
export declare type DialogHeadingOptions<T extends As = "h1"> = HeadingOptions<T> & {
    /**
     * Object returned by the `useDialogState` hook. If not provided, the parent
     * `Dialog` component's context will be used.
     */
    state?: DialogState;
};
export declare type DialogHeadingProps<T extends As = "h1"> = Props<DialogHeadingOptions<T>>;
