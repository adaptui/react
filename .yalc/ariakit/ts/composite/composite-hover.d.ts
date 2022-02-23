import { MouseEvent as ReactMouseEvent } from "react";
import { As, BooleanOrCallback, Options, Props } from "ariakit-utils/types";
import { CompositeState } from "./composite-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element in a composite widget that receives
 * focus on mouse move and loses focus to the composite base element on mouse
 * leave. This should be combined with the `CompositeItem` component, the
 * `useCompositeItem` hook or any component/hook that uses them underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeHover({ state });
 * <CompositeItem state={state} {...props}>Item</CompositeItem>
 * ```
 */
export declare const useCompositeHover: import("ariakit-utils/types").Hook<CompositeHoverOptions<"div">>;
/**
 * A component that renders an element in a composite widget that receives focus
 * on mouse move and loses focus to the composite base element on mouse leave.
 * This should be combined with the `CompositeItem` component, the
 * `useCompositeItem` hook or any component/hook that uses them underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeHover as={CompositeItem}>Item</CompositeHover>
 * </Composite>
 * ```
 */
export declare const CompositeHover: import("ariakit-utils/types").Component<CompositeHoverOptions<"div">>;
export declare type CompositeHoverOptions<T extends As = "div"> = Options<T> & {
    /**
     * Object returned by the `useCompositeState` hook. If not provided, the
     * parent `Composite` component's context will be used.
     */
    state?: CompositeState;
    /**
     * Whether to focus the composite item on hover.
     * @default true
     */
    focusOnHover?: BooleanOrCallback<ReactMouseEvent<HTMLElement>>;
};
export declare type CompositeHoverProps<T extends As = "div"> = Props<CompositeHoverOptions<T>>;
