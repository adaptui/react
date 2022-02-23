import { As, Options, Props } from "ariakit-utils/types";
import { PopoverState } from "./popover-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that will serve as the popover's
 * anchor. The popover will be positioned relative to this element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const state = usePopoverState();
 * const props = usePopoverAnchor({ state });
 * <Role {...props}>Anchor</Role>
 * <Popover state={state}>Popover</Popover>
 * ```
 */
export declare const usePopoverAnchor: import("ariakit-utils/types").Hook<PopoverAnchorOptions<"div">>;
/**
 * A component that renders an element that will serve as the popover's anchor.
 * The popover will be positioned relative to this element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <PopoverAnchor state={popover}>Anchor</PopoverAnchor>
 * <Popover state={popover}>Popover</Popover>
 * ```
 */
export declare const PopoverAnchor: import("ariakit-utils/types").Component<PopoverAnchorOptions<"div">>;
export declare type PopoverAnchorOptions<T extends As = "div"> = Options<T> & {
    /**
     * Object returned by the `usePopoverState` hook.
     */
    state: PopoverState;
};
export declare type PopoverAnchorProps<T extends As = "div"> = Props<PopoverAnchorOptions<T>>;
