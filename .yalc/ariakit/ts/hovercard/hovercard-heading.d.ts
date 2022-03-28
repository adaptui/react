import { As, Props } from "ariakit-utils/types";
import { PopoverHeadingOptions } from "../popover/popover-heading";
import { HovercardState } from "./hovercard-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a heading element for a hovercard. This hook must
 * be used in a component that's wrapped with `Hovercard` so the
 * `aria-labelledby` prop is properly set on the hovercard element.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * // This component must be wrapped with Hovercard
 * const props = useHovercardHeading();
 * <Role {...props}>Heading</Role>
 * ```
 */
export declare const useHovercardHeading: import("ariakit-utils/types").Hook<HovercardHeadingOptions<"h1">>;
/**
 * A component that renders a heading in a hovercard. This component must be
 * wrapped with `Hovercard` so the `aria-labelledby` prop is properly set on the
 * hovercard element.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <Hovercard state={hovercard}>
 *   <HovercardHeading>Heading</HovercardHeading>
 * </Hovercard>
 * ```
 */
export declare const HovercardHeading: import("ariakit-utils/types").Component<HovercardHeadingOptions<"h1">>;
export declare type HovercardHeadingOptions<T extends As = "h1"> = Omit<PopoverHeadingOptions<T>, "state"> & {
    /**
     * Object returned by the `useHovercardState` hook. If not provided, the
     * parent `Hovercard` component's context will be used.
     */
    state?: HovercardState;
};
export declare type HovercardHeadingProps<T extends As = "h1"> = Props<HovercardHeadingOptions<T>>;