import { As, Props } from "ariakit-utils/types";
import { PopoverOptions } from "../popover/popover";
import { CompositeOverflowState } from "./composite-overflow-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a popover that will contain the overflow items in a
 * composite collection.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeOverflowState();
 * const props = useCompositeOverflow({ state });
 * <Role {...props}>
 *   <CompositeItem>Item 3</CompositeItem>
 *   <CompositeItem>Item 4</CompositeItem>
 * </Role>
 * ```
 */
export declare const useCompositeOverflow: import("ariakit-utils/types").Hook<CompositeOverflowOptions<"div">>;
/**
 * A component that renders a popover that will contain the overflow items in a
 * composite collection.
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
export declare const CompositeOverflow: import("ariakit-utils/types").Component<CompositeOverflowOptions<"div">>;
export declare type CompositeOverflowOptions<T extends As = "div"> = Omit<PopoverOptions<T>, "state"> & {
    /**
     * Object returned by the `useCompositeOverflowState` hook.
     */
    state: CompositeOverflowState;
};
export declare type CompositeOverflowProps<T extends As = "div"> = Props<CompositeOverflowOptions<T>>;
