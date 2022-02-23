import { As, Props } from "ariakit-utils/types";
import { PopoverDisclosureOptions } from "../popover/popover-disclosure";
import { CompositeItemOptions } from "./composite-item";
import { CompositeOverflowState } from "./composite-overflow-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a disclosure button for the `CompositeOverflow`
 * component. This hook should be used in a component that's wrapped with
 * a composite component.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * // This component should be wrapped with Composite
 * const props = useCompositeOverflowDisclosure();
 * <Role {...props}>+2 items</Role>
 * ```
 */
export declare const useCompositeOverflowDisclosure: import("ariakit-utils/types").Hook<CompositeOverflowDisclosureOptions<"button">>;
/**
 * A component that renders a disclosure button for the `CompositeOverflow`
 * component. This component should be wrapped with a composite component.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * const overflow = useCompositeOverflowState();
 * <Composite state={composite}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 *   <CompositeOverflowDisclosure state={overflow}>
 *     +2 items
 *   </CompositeOverflowDisclosure>
 *   <CompositeOverflow state={overflow}>
 *     <CompositeItem>Item 3</CompositeItem>
 *     <CompositeItem>Item 4</CompositeItem>
 *   </CompositeOverflow>
 * </Composite>
 * ```
 */
export declare const CompositeOverflowDisclosure: import("ariakit-utils/types").Component<CompositeOverflowDisclosureOptions<"button">>;
export declare type CompositeOverflowDisclosureOptions<T extends As = "button"> = Omit<PopoverDisclosureOptions<T>, "state"> & Omit<CompositeItemOptions<T>, "state"> & {
    /**
     * Object returned by the `useCompositeOverflowState` hook.
     */
    state: CompositeOverflowState;
};
export declare type CompositeOverflowDisclosureProps<T extends As = "button"> = Props<CompositeOverflowDisclosureOptions<T>>;
