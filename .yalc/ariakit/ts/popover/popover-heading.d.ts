import { As, Props } from "ariakit-utils/types";
import { DialogHeadingOptions } from "../dialog/dialog-heading";
import { PopoverState } from "./popover-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a heading element for a popover. This hook must
 * be used in a component that's wrapped with `Popover` so the `aria-labelledby`
 * prop is properly set on the popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * // This component must be wrapped with Popover
 * const props = usePopoverHeading();
 * <Role {...props}>Heading</Role>
 * ```
 */
export declare const usePopoverHeading: import("ariakit-utils/types").Hook<PopoverHeadingOptions<"h1">>;
/**
 * A component that renders a heading in a popover. This component must be
 * wrapped with `Popover` so the `aria-labelledby` prop is properly set on the
 * popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <Popover state={popover}>
 *   <PopoverHeading>Heading</PopoverHeading>
 * </Popover>
 * ```
 */
export declare const PopoverHeading: import("ariakit-utils/types").Component<PopoverHeadingOptions<"h1">>;
export declare type PopoverHeadingOptions<T extends As = "h1"> = Omit<DialogHeadingOptions<T>, "state"> & {
    /**
     * Object returned by the `usePopoverState` hook. If not provided, the parent
     * `Popover` component's context will be used.
     */
    state?: PopoverState;
};
export declare type PopoverHeadingProps<T extends As = "h1"> = Props<PopoverHeadingOptions<T>>;
