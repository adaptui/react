import { As, Props } from "ariakit-utils/types";
import { DialogDismissOptions } from "../dialog/dialog-dismiss";
import { PopoverState } from "./popover-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that hides a popover.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const state = usePopoverState();
 * const props = usePopoverDismiss({ state });
 * <Popover state={state}>
 *   <Role {...props} />
 * </Popover>
 * ```
 */
export declare const usePopoverDismiss: import("ariakit-utils/types").Hook<PopoverDismissOptions<"button">>;
/**
 * A component that renders a button that hides a popover.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <Popover state={popover}>
 *   <PopoverDismiss />
 * </Popover>
 * ```
 */
export declare const PopoverDismiss: import("ariakit-utils/types").Component<PopoverDismissOptions<"button">>;
export declare type PopoverDismissOptions<T extends As = "button"> = Omit<DialogDismissOptions<T>, "state"> & {
    /**
     * Object returned by the `usePopoverState` hook. If not provided, the parent
     * `Popover` component's context will be used.
     */
    state?: PopoverState;
};
export declare type PopoverDismissProps<T extends As = "button"> = Props<PopoverDismissOptions<T>>;
