import { As, Props } from "ariakit-utils/types";
import { PopoverDismissOptions } from "../popover/popover-dismiss";
import { HovercardState } from "./hovercard-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that hides a hovercard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const state = useHovercardState();
 * const props = useHovercardDismiss({ state });
 * <Hovercard state={state}>
 *   <Role {...props} />
 * </Hovercard>
 * ```
 */
export declare const useHovercardDismiss: import("ariakit-utils/types").Hook<HovercardDismissOptions<"button">>;
/**
 * A component that renders a button that hides a hovercard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <Hovercard state={hovercard}>
 *   <HovercardDismiss />
 * </Hovercard>
 * ```
 */
export declare const HovercardDismiss: import("ariakit-utils/types").Component<HovercardDismissOptions<"button">>;
export declare type HovercardDismissOptions<T extends As = "button"> = Omit<PopoverDismissOptions<T>, "state"> & {
    /**
     * Object returned by the `useHovercardState` hook. If not provided, the
     * parent `Hovercard` component's context will be used.
     */
    state?: HovercardState;
};
export declare type HovercardDismissProps<T extends As = "button"> = Props<HovercardDismissOptions<T>>;
