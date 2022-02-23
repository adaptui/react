import { PopoverState, PopoverStateProps } from "../popover/popover-state";
/**
 * Provides state for the `Tooltip` components.
 * @example
 * ```jsx
 * const tooltip = useTooltipState();
 * <TooltipAnchor state={tooltip}>Anchor</TooltipAnchor>
 * <Tooltip state={tooltip}>Tooltip</Tooltip>
 * ```
 */
export declare function useTooltipState({ placement, timeout, gutter, ...props }?: TooltipStateProps): TooltipState;
export declare type TooltipState = PopoverState & {
    /**
     * The amount in milliseconds to wait before showing the tooltip. When there's
     * already a visible tooltip in the page, this value will be ignored and other
     * tooltips will be shown immediately.
     * @default 0
     */
    timeout: number;
};
export declare type TooltipStateProps = PopoverStateProps & Partial<Pick<TooltipState, "timeout">>;
