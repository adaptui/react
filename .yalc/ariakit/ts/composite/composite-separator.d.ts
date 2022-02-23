import { As, Props } from "ariakit-utils/types";
import { SeparatorOptions } from "../separator/separator";
import { CompositeState } from "./composite-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a separator for composite items.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeSeparator({ state });
 * <Composite state={state}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <Role {...props} />
 *   <CompositeItem>Item 2</CompositeItem>
 * </Composite>
 * ```
 */
export declare const useCompositeSeparator: import("ariakit-utils/types").Hook<CompositeSeparatorOptions<"hr">>;
/**
 * A component that renders a separator for composite items.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeSeparator />
 *   <CompositeItem>Item 2</CompositeItem>
 * </Composite>
 * ```
 */
export declare const CompositeSeparator: import("ariakit-utils/types").Component<CompositeSeparatorOptions<"hr">>;
export declare type CompositeSeparatorOptions<T extends As = "hr"> = SeparatorOptions<T> & {
    /**
     * Object returned by the `useCompositeState` hook. If not provided, the
     * parent `Composite` component's context will be used.
     */
    state?: CompositeState;
};
export declare type CompositeSeparatorProps<T extends As = "hr"> = Props<CompositeSeparatorOptions<T>>;
