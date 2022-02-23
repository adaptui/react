import { As, Options, Props } from "ariakit-utils/types";
import { CompositeState } from "./composite-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a container for interactive widgets inside
 * composite items. This should be used in conjunction with the `CompositeItem`
 * component, the `useCompositeItem` hook, or any other component/hook that uses
 * `CompositeItem` underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeContainer({ state });
 * <Composite state={state}>
 *   <CompositeItem {...props}>
 *     <input type="text" />
 *   </CompositeItem>
 * </Composite>
 * ```
 */
export declare const useCompositeContainer: import("ariakit-utils/types").Hook<CompositeContainerOptions<"div">>;
/**
 * A component that renders a container for interactive widgets inside composite
 * items. This should be used in conjunction with the `CompositeItem` component
 * or a component that uses `CompositeItem` underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeItem as={CompositeContainer}>
 *     <input type="text" />
 *   </CompositeItem>
 * </Composite>
 * ```
 */
export declare const CompositeContainer: import("ariakit-utils/types").Component<CompositeContainerOptions<"div">>;
export declare type CompositeContainerOptions<T extends As = "div"> = Options<T> & {
    /**
     * Object returned by the `useCompositeState` hook. If not provided, the
     * parent `Composite` component's context will be used.
     */
    state?: CompositeState;
};
export declare type CompositeContainerProps<T extends As = "div"> = Props<CompositeContainerOptions<T>>;
