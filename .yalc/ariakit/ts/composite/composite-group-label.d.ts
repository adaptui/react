import { As, Props } from "ariakit-utils/types";
import { GroupLabelOptions } from "../group";
import { CompositeState } from "./composite-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a composite group. This hook must be
 * used in a component that's wrapped with `CompositeGroup` so the
 * `aria-labelledby` prop is properly set on the composite group element.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * // This component must be wrapped with CompositeGroup
 * const props = useCompositeGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */
export declare const useCompositeGroupLabel: import("ariakit-utils/types").Hook<CompositeGroupLabelOptions<"div">>;
/**
 * A component that renders a label in a composite group. This component must be
 * wrapped with `CompositeGroup` so the `aria-labelledby` prop is properly set
 * on the composite group element.
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
export declare const CompositeGroupLabel: import("ariakit-utils/types").Component<CompositeGroupLabelOptions<"div">>;
export declare type CompositeGroupLabelOptions<T extends As = "div"> = GroupLabelOptions<T> & {
    /**
     * Object returned by the `useCompositeState` hook. If not provided, the
     * parent `Composite` component's context will be used.
     */
    state?: CompositeState;
};
export declare type CompositeGroupLabelProps<T extends As = "div"> = Props<CompositeGroupLabelOptions<T>>;
