import { As, BooleanOrCallback, Props } from "ariakit-utils/types";
import { PopoverOptions } from "../popover/popover";
import { HovercardState } from "./hovercard-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a hovercard element, which is a popover that's
 * usually made visible by hovering the mouse cursor over an anchor element
 * (`HovercardAnchor`).
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const state = useHovercardState();
 * const props = useHovercard({ state });
 * <HovercardAnchor state={state}>@username</HovercardAnchor>
 * <Role {...props}>Details</Role>
 * ```
 */
export declare const useHovercard: import("ariakit-utils/types").Hook<HovercardOptions<"div">>;
/**
 * A component that renders a hovercard element, which is a popover that's
 * usually made visible by hovering the mouse cursor over an anchor element
 * (`HovercardAnchor`).
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <HovercardAnchor state={hovercard}>@username</HovercardAnchor>
 * <Hovercard state={hovercard}>Details</Hovercard>
 * ```
 */
export declare const Hovercard: import("ariakit-utils/types").Component<HovercardOptions<"div">>;
export declare type HovercardOptions<T extends As = "div"> = Omit<PopoverOptions<T>, "state"> & {
    /**
     * Object returned by the `useHovercardState` hook.
     */
    state: HovercardState;
    /**
     * Determines whether the popover will be hidden when the user presses the
     * Control key. This has been proposed as an alternative to the Escape key,
     * which may introduce some issues, especially when popovers are used within
     * dialogs that also hide on Escape. See
     * https://github.com/w3c/aria-practices/issues/1506
     * @default false
     */
    hideOnControl?: BooleanOrCallback<KeyboardEvent>;
    /**
     * Whether to hide the popover when the mouse cursor leaves any hovercard
     * element, including the hovercard popover itself, but also the anchor
     * element.
     * @default true
     */
    hideOnHoverOutside?: BooleanOrCallback<MouseEvent>;
    /**
     * Whether to disable the pointer events outside of the hovercard while
     * the mouse is moving toward the hovercard. This is necessary because these
     * events may trigger focus on other elements and close the hovercard while
     * the user is moving the mouse toward it.
     * @default true
     */
    disablePointerEventsOnApproach?: BooleanOrCallback<MouseEvent>;
};
export declare type HovercardProps<T extends As = "div"> = Props<HovercardOptions<T>>;
