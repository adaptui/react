import { As, Options, Props } from "ariakit-utils/types";
import { CompositeState } from "./composite-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an input as a composite item. This should be used
 * in conjunction with the `CompositeItem` component, the `useCompositeItem`
 * hook, or any other component/hook that uses `CompositeItem` underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeInput({ state });
 * <Composite state={state}>
 *   <CompositeItem {...props} />
 * </Composite>
 * ```
 */
export declare const useCompositeInput: import("ariakit-utils/types").Hook<CompositeInputOptions<"input">>;
/**
 * A component that renders an input as a composite item. This should be used in
 * conjunction with the `CompositeItem` component or a component that uses
 * `CompositeItem` underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeItem as={CompositeInput} />
 * </Composite>
 * ```
 */
export declare const CompositeInput: import("ariakit-utils/types").Component<CompositeInputOptions<"input">>;
export declare type CompositeInputOptions<T extends As = "input"> = Options<T> & {
    /**
     * Object returned by the `useCompositeState` hook. If not provided, the
     * parent `Composite` component's context will be used.
     */
    state?: CompositeState;
};
export declare type CompositeInputProps<T extends As = "input"> = Props<CompositeInputOptions<T>>;
