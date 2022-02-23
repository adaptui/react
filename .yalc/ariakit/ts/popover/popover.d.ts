import { HTMLAttributes } from "react";
import { As, Props } from "ariakit-utils/types";
import { DialogOptions } from "../dialog/dialog";
import { PopoverState } from "./popover-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const state = usePopoverState();
 * const props = usePopover({ state });
 * <Role {...props}>Popover</Role>
 * ```
 */
export declare const usePopover: import("ariakit-utils/types").Hook<PopoverOptions<"div">>;
/**
 * A component that renders a popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <PopoverDisclosure state={popover}>Disclosure</PopoverDisclosure>
 * <Popover state={popover}>Popover</Popover>
 * ```
 */
export declare const Popover: import("ariakit-utils/types").Component<PopoverOptions<"div">>;
export declare type PopoverOptions<T extends As = "div"> = Omit<DialogOptions<T>, "state"> & {
    /**
     * Object returned by the `usePopoverState` hook.
     */
    state: PopoverState;
    /**
     * Props that will be passed to the popover wrapper element. This element will
     * be used to position the popover.
     */
    wrapperProps?: HTMLAttributes<HTMLDivElement>;
};
export declare type PopoverProps<T extends As = "div"> = Props<PopoverOptions<T>>;
