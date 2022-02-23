import { As, Options, Props } from "ariakit-utils/types";
import { CompositeState } from "./composite-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to add typeahead functionality to composite components.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeTypeahead({ state });
 * <Composite state={state} {...props}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 * </Composite>
 * ```
 */
export declare const useCompositeTypeahead: import("ariakit-utils/types").Hook<CompositeTypeaheadOptions<"div">>;
/**
 * A component that adds typeahead functionality to composite components.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite} as={CompositeTypeahead}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 * </Composite>
 * ```
 */
export declare const CompositeTypeahead: import("ariakit-utils/types").Component<CompositeTypeaheadOptions<"div">>;
export declare type CompositeTypeaheadOptions<T extends As = "div"> = Options<T> & {
    /**
     * Object returned by the `useCompositeState` hook. If not provided, the
     * parent `Composite` component's context will be used.
     */
    state?: CompositeState;
    /**
     * Determines whether the typeahead behavior is enabled.
     * @default true
     */
    typeahead?: boolean;
};
export declare type CompositeTypeaheadProps<T extends As = "div"> = Props<CompositeTypeaheadOptions<T>>;
