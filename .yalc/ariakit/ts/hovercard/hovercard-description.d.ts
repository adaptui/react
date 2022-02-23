import { As, Props } from "ariakit-utils/types";
import { PopoverDescriptionOptions } from "../popover/popover-description";
import { HovercardState } from "./hovercard-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a description element for a hovercard. This hook
 * must be used in a component that's wrapped with `Hovercard` so the
 * `aria-describedby` prop is properly set on the hovercard element.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * // This component must be wrapped with Hovercard
 * const props = useHovercardDescription();
 * <Role {...props}>Description</Role>
 * ```
 */
export declare const useHovercardDescription: import("ariakit-utils/types").Hook<HovercardDescriptionOptions<"p">>;
/**
 * A component that renders a description in a hovercard. This component must be
 * wrapped with `Hovercard` so the `aria-describedby` prop is properly set on
 * the hovercard element.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <Hovercard state={hovercard}>
 *   <HovercardDescription>Description</HovercardDescription>
 * </Hovercard>
 * ```
 */
export declare const HovercardDescription: import("ariakit-utils/types").Component<HovercardDescriptionOptions<"p">>;
export declare type HovercardDescriptionOptions<T extends As = "p"> = Omit<PopoverDescriptionOptions<T>, "state"> & {
    /**
     * Object returned by the `useHovercardState` hook. If not provided, the
     * parent `Hovercard` component's context will be used.
     */
    state?: HovercardState;
};
export declare type HovercardDescriptionProps<T extends As = "p"> = Props<HovercardDescriptionOptions<T>>;
