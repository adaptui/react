import { As, Options, Props } from "ariakit-utils/types";
import { PopoverState } from "./popover-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow pointing to the popover position. It's
 * usually rendered inside the `PopoverDisclosure` component.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const state = usePopoverState();
 * const props = usePopoverDisclosureArrow({ state });
 * <PopoverDisclosure state={state}>
 *   Disclosure
 *   <Role {...props} />
 * </PopoverDisclosure>
 * ```
 */
export declare const usePopoverDisclosureArrow: import("ariakit-utils/types").Hook<PopoverDisclosureArrowOptions<"span">>;
/**
 * A component that renders an arrow pointing to the popover position. It's
 * usually rendered inside the `PopoverDisclosure` component.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <PopoverDisclosure state={popover}>
 *   Disclosure
 *   <PopoverDisclosureArrow />
 * </PopoverDisclosure>
 * <Popover state={popover}>Popover</Popover>
 * ```
 */
export declare const PopoverDisclosureArrow: import("ariakit-utils/types").Component<PopoverDisclosureArrowOptions<"span">>;
export declare type PopoverDisclosureArrowOptions<T extends As = "span"> = Options<T> & {
    /**
     * Object returned by the `usePopoverState` hook. If not provided, the
     * parent `PopoverDisclosure` component's context will be used.
     */
    state?: PopoverState;
};
export declare type PopoverDisclosureArrowProps<T extends As = "span"> = Props<PopoverDisclosureArrowOptions<T>>;
