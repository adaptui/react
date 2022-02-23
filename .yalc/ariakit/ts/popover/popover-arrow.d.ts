import { As, Options, Props } from "ariakit-utils/types";
import { PopoverState } from "./popover-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow inside a popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const state = usePopoverState();
 * const props = usePopoverArrow({ state });
 * <Popover state={state}>
 *   <Role {...props} />
 *   Popover
 * </Popover>
 * ```
 */
export declare const usePopoverArrow: import("ariakit-utils/types").Hook<PopoverArrowOptions<"div">>;
/**
 * A component that renders an arrow inside a `Popover` component.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <Popover state={popover}>
 *   <PopoverArrow />
 *   Popover
 * </Popover>
 * ```
 */
export declare const PopoverArrow: import("ariakit-utils/types").Component<PopoverArrowOptions<"div">>;
export declare type PopoverArrowOptions<T extends As = "div"> = Options<T> & {
    /**
     * Object returned by the `usePopoverState` hook. If not provided, the parent
     * `Popover` component's context will be used.
     */
    state?: PopoverState;
    /**
     * The size of the arrow.
     * @default 30
     */
    size?: number;
};
export declare type PopoverArrowProps<T extends As = "div"> = Props<PopoverArrowOptions<T>>;
