import { As, Props } from "ariakit-utils/types";
import { PopoverArrowOptions } from "../popover/popover-arrow";
import { HovercardState } from "./hovercard-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow element in a hovercard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const state = useHovercardState();
 * const props = useHovercardArrow({ state });
 * <Hovercard state={state}>
 *   <Role {...props} />
 *   Details
 * </Hovercard>
 * ```
 */
export declare const useHovercardArrow: import("ariakit-utils/types").Hook<HovercardArrowOptions<"div">>;
/**
 * A component that renders an arrow element in a hovercard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <HovercardAnchor state={hovercard}>@username</HovercardAnchor>
 * <Hovercard state={hovercard}>
 *   <HovercardArrow />
 *   Details
 * </Hovercard>
 * ```
 */
export declare const HovercardArrow: import("ariakit-utils/types").Component<HovercardArrowOptions<"div">>;
export declare type HovercardArrowOptions<T extends As = "div"> = Omit<PopoverArrowOptions<T>, "state"> & {
    /**
     * Object returned by the `useHovercardState` hook. If not provided, the
     * parent `Hovercard` component's context will be used.
     */
    state?: HovercardState;
};
export declare type HovercardArrowProps<T extends As = "div"> = Props<HovercardArrowOptions<T>>;
