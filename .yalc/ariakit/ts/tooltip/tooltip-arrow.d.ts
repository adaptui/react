import { As, Props } from "ariakit-utils/types";
import { PopoverArrowOptions } from "../popover/popover-arrow";
import { TooltipState } from "./tooltip-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow inside a tooltip element.
 * @see https://ariakit.org/components/tooltip
 * @example
 * ```jsx
 * const state = useToolTipState();
 * const props = useTooltipArrow({ state });
 * <TooltipAnchor state={state}>Anchor</TooltipAnchor>
 * <Tooltip state={state}>
 *   <Role {...props} />
 *   Tooltip
 * </Tooltip>
 * ```
 */
export declare const useTooltipArrow: import("ariakit-utils/types").Hook<TooltipArrowOptions<"div">>;
/**
 * A component that renders an arrow inside a `Tooltip` component.
 * @see https://ariakit.org/components/tooltip
 * @example
 * ```jsx
 * const tooltip = useTooltipState();
 * <TooltipAnchor state={tooltip}>Anchor</TooltipAnchor>
 * <Tooltip state={tooltip}>
 *   <TooltipArrow />
 *   Tooltip
 * </Tooltip>
 * ```
 */
export declare const TooltipArrow: import("ariakit-utils/types").Component<TooltipArrowOptions<"div">>;
export declare type TooltipArrowOptions<T extends As = "div"> = Omit<PopoverArrowOptions<T>, "state"> & {
    /**
     * Object returned by the `useTooltipState` hook. If not provided, the parent
     * `Tooltip` component's context will be used.
     */
    state?: TooltipState;
};
export declare type TooltipArrowProps<T extends As = "div"> = Props<TooltipArrowOptions<T>>;
