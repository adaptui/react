import { As, Props } from "ariakit-utils/types";
import { DialogDisclosureOptions } from "../dialog/dialog-disclosure";
import { PopoverAnchorOptions } from "./popover-anchor";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that controls the visibility of the
 * popover when clicked.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const state = usePopoverState();
 * const props = usePopoverDisclosure({ state });
 * <Role {...props}>Disclosure</Role>
 * <Popover state={state}>Popover</Popover>
 * ```
 */
export declare const usePopoverDisclosure: import("ariakit-utils/types").Hook<PopoverDisclosureOptions<"button">>;
/**
 * A component that renders a button that controls the visibility of the popover
 * when clicked.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <PopoverDisclosure state={popover}>Disclosure</PopoverDisclosure>
 * <Popover state={popover}>Popover</Popover>
 * ```
 */
export declare const PopoverDisclosure: import("ariakit-utils/types").Component<PopoverDisclosureOptions<"button">>;
export declare type PopoverDisclosureOptions<T extends As = "button"> = Omit<DialogDisclosureOptions<T>, "state"> & PopoverAnchorOptions<T>;
export declare type PopoverDisclosureProps<T extends As = "button"> = Props<PopoverDisclosureOptions<T>>;
