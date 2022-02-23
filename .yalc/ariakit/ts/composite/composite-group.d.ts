import { As, Props } from "ariakit-utils/types";
import { GroupOptions } from "../group";
import { CompositeState } from "./composite-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a composite group.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeGroup({ state });
 * <Composite state={state}>
 *   <Role {...props}>
 *     <CompositeGroupLabel>Label</CompositeGroupLabel>
 *     <CompositeItem>Item 1</CompositeItem>
 *     <CompositeItem>Item 2</CompositeItem>
 *   </Role>
 * </Composite>
 * ```
 */
export declare const useCompositeGroup: import("ariakit-utils/types").Hook<CompositeGroupOptions<"div">>;
/**
 * A component that renders a composite group.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeGroup>
 *     <CompositeGroupLabel>Label</CompositeGroupLabel>
 *     <CompositeItem>Item 1</CompositeItem>
 *     <CompositeItem>Item 2</CompositeItem>
 *   </CompositeGroup>
 * </Composite>
 * ```
 */
export declare const CompositeGroup: import("ariakit-utils/types").Component<CompositeGroupOptions<"div">>;
export declare type CompositeGroupOptions<T extends As = "div"> = GroupOptions<T> & {
    /**
     * Object returned by the `useCompositeState` hook. If not provided, the
     * parent `Composite` component's context will be used.
     */
    state?: CompositeState;
};
export declare type CompositeGroupProps<T extends As = "div"> = Props<CompositeGroupOptions<T>>;
