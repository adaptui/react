import { As, Props } from "ariakit-utils/types";
import { PopoverAnchorOptions } from "../popover/popover-anchor";
import { TooltipState } from "./tooltip-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that will be labelled or described by
 * a `Tooltip` component. This component will also be used as the reference to
 * position the tooltip on the screen.
 * @see https://ariakit.org/components/tooltip
 * @example
 * ```jsx
 * const state = useToolTipState();
 * const props = useTooltipAnchor({ state });
 * <Role {...props}>Anchor</Role>
 * <Tooltip state={state}>Tooltip</Tooltip>
 * ```
 */
export declare const useTooltipAnchor: import("ariakit-utils/types").Hook<TooltipAnchorOptions<"div">>;
/**
 * A component that renders an element that will be labelled or described by
 * a `Tooltip` component. This component will also be used as the reference to
 * position the tooltip on the screen.
 * @see https://ariakit.org/components/tooltip
 * @example
 * ```jsx
 * const tooltip = useTooltipState();
 * <TooltipAnchor state={tooltip}>Anchor</TooltipAnchor>
 * <Tooltip state={tooltip}>Tooltip</Tooltip>
 * ```
 */
export declare const TooltipAnchor: import("ariakit-utils/types").Component<TooltipAnchorOptions<"div">>;
export declare type TooltipAnchorOptions<T extends As = "div"> = Omit<PopoverAnchorOptions<T>, "state"> & {
    /**
     * Object returned by the `useTooltipState` hook.
     */
    state: TooltipState;
    /**
     * Determines wether the tooltip anchor is described or labelled by the
     * tooltip. If `true`, the tooltip id will be set as the `aria-describedby`
     * attribute on the anchor element, and not as the `aria-labelledby`
     * attribute.
     * @default false
     * @example
     * ```jsx
     * const tooltip = useTooltipState();
     * <TooltipAnchor state={tooltip} described>
     *   This is an element with a visible label.
     * </TooltipAnchor>
     * <Tooltip state={tooltip}>Description</Tooltip>
     * ```
     */
    described?: boolean;
};
export declare type TooltipAnchorProps<T extends As = "div"> = Props<TooltipAnchorOptions<T>>;
