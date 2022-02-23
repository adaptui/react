import { MutableRefObject, RefObject } from "react";
import { VirtualElement } from "@popperjs/core";
import { SetState } from "ariakit-utils/types";
import { DialogState, DialogStateProps } from "../dialog/dialog-state";
declare type Placement = "auto-start" | "auto" | "auto-end" | "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-end" | "bottom" | "bottom-start" | "left-end" | "left" | "left-start";
declare type AnchorRect = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};
/**
 * Provides state for the `Popover` components.
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <PopoverDisclosure state={popover}>Disclosure</PopoverDisclosure>
 * <Popover state={popover}>Popover</Popover>
 * ```
 */
export declare function usePopoverState({ placement, fixed, padding, arrowPadding, flip, gutter, shift, preventOverflow, sameWidth, renderCallback, ...props }?: PopoverStateProps): PopoverState;
export declare type PopoverStateRenderCallbackProps = Pick<PopoverState, "fixed" | "flip" | "mounted" | "padding" | "arrowPadding" | "placement" | "preventOverflow" | "sameWidth" | "gutter" | "shift"> & {
    /**
     * The popover element.
     */
    popover: HTMLElement;
    /**
     * The anchor element.
     */
    anchor: VirtualElement;
    /**
     * The arrow element.
     */
    arrow?: HTMLElement | null;
    /**
     * A method that updates the `currentPlacement` state.
     */
    setPlacement: SetState<Placement>;
    /**
     * The default render callback that will be called when the `renderCallback`
     * prop is not provided.
     */
    defaultRenderCallback: () => () => void;
};
export declare type PopoverState = DialogState & {
    /**
     * The coordinates that will be used to position the popover. When defined,
     * this will override the `anchorRef` prop.
     */
    anchorRect: AnchorRect | null;
    /**
     * Sets the `anchorRect` state.
     */
    setAnchorRect: SetState<PopoverState["anchorRect"]>;
    /**
     * The anchor element.
     */
    anchorRef: MutableRefObject<HTMLElement | null>;
    /**
     * The popover element that will render the placement attributes.
     */
    popoverRef: RefObject<HTMLElement>;
    /**
     * The arrow element.
     */
    arrowRef: RefObject<HTMLElement>;
    /**
     * The current temporary placement state of the popover. This may be different
     * from the the `placement` state if the popover has needed to update its
     * position on the fly.
     */
    currentPlacement: Placement;
    /**
     * The placement of the popover.
     * @default "bottom"
     */
    placement: Placement;
    /**
     * Whether the popover has `position: fixed` or not.
     * @default false
     */
    fixed: boolean;
    /**
     * The minimum padding between the popover and the viewport edge.
     * @default 8
     */
    padding: number;
    /**
     * The minimum padding between the arrow and the popover corner.
     * @default 4
     */
    arrowPadding: number;
    /**
     * Whether the popover should flip to the opposite side of the viewport
     * when it overflows.
     * @default true
     */
    flip: boolean;
    /**
     * The distance between the popover and the anchor element. By default, it's 0
     * plus half of the arrow offset, if it exists.
     * @default 0
     */
    gutter?: number | string;
    /**
     * The skidding of the popover along the anchor element.
     * @default 0
     */
    shift: number | string;
    /**
     * Whether the popover should prevent overflowing its clipping container.
     * @default true
     */
    preventOverflow: boolean;
    /**
     * Whether the popover should have the same width as the anchor element.
     * @default false
     */
    sameWidth: boolean;
    /**
     * A function that can be used to recompute the popover styles. This is useful
     * when the popover contents change in a way that affects its position or
     * size.
     */
    render: () => void;
    /**
     * A function that will be called when the popover needs to calculate its
     * styles. It will override the internal behavior.
     */
    renderCallback?: (props: PopoverStateRenderCallbackProps) => void | (() => void);
};
export declare type PopoverStateProps = DialogStateProps & Partial<Pick<PopoverState, "anchorRect" | "placement" | "fixed" | "padding" | "arrowPadding" | "flip" | "gutter" | "shift" | "preventOverflow" | "sameWidth" | "renderCallback">> & {
    /**
     * The coordinates that will be used to position the popover. When defined,
     * this will override the `anchorRef` property.
     * @example
     * const popover = usePopoverState({
     *   defaultAnchorRect: { x: 10, y: 10, width: 100, height: 100 },
     * });
     */
    defaultAnchorRect?: PopoverState["anchorRect"];
    /**
     * Function that will be called when setting the popover `anchorRect` state.
     * @example
     * const [anchorRect, setAnchorRect] = useState(
     *   { x: 10, y: 10, width: 100, height: 100 }
     * );
     * usePopoverState({ anchorRect, setAnchorRect });
     */
    setAnchorRect?: (anchor: PopoverState["anchorRect"]) => void;
};
export {};
