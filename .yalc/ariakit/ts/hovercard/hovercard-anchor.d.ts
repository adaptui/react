import { MouseEvent as ReactMouseEvent } from "react";
import { As, BooleanOrCallback, Props } from "ariakit-utils/types";
import { FocusableOptions } from "../focusable";
import { HovercardState } from "./hovercard-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an anchor element that will open a popover
 * (`Hovercard`) on hover.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const state = useHovercardState();
 * const props = useHovercardAnchor({ state });
 * <Role as="a" {...props}>@username</Role>
 * <Hovercard state={state}>Details</Hovercard>
 * ```
 */
export declare const useHovercardAnchor: import("ariakit-utils/types").Hook<HovercardAnchorOptions<"a">>;
/**
 * A component that renders an anchor element that will open a popover
 * (`Hovercard`) on hover.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <HovercardAnchor state={hovercard}>@username</HovercardAnchor>
 * <Hovercard state={hovercard}>Details</Hovercard>
 * ```
 */
export declare const HovercardAnchor: import("ariakit-utils/types").Component<HovercardAnchorOptions<"a">>;
export declare type HovercardAnchorOptions<T extends As = "a"> = FocusableOptions<T> & {
    /**
     * Object returned by the `useHovercardState` hook.
     */
    state: HovercardState;
    /**
     * Whether to show the hovercard on mouse move.
     * @default true
     */
    showOnHover?: BooleanOrCallback<ReactMouseEvent<HTMLElement>>;
};
export declare type HovercardAnchorProps<T extends As = "a"> = Props<HovercardAnchorOptions<T>>;
