import { KeyboardEvent } from "react";
import { As, BooleanOrCallback, Props } from "ariakit-utils/types";
import { CollectionItemOptions } from "../collection/collection-item";
import { CommandOptions } from "../command/command";
import { CompositeState } from "./composite-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a composite item.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeItem({ state });
 * <Role {...props}>Item 1</Role>
 * ```
 */
export declare const useCompositeItem: import("ariakit-utils/types").Hook<CompositeItemOptions<"button">>;
/**
 * A component that renders a composite item.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 *   <CompositeItem>Item 3</CompositeItem>
 * </Composite>
 * ```
 */
export declare const CompositeItem: import("ariakit-utils/types").Component<CompositeItemOptions<"button">>;
export declare type CompositeItemOptions<T extends As = "button"> = CommandOptions<T> & Omit<CollectionItemOptions<T>, "state"> & {
    /**
     * Object returned by the `useCompositeState` hook. If not provided, the
     * parent `Composite` component's context will be used.
     */
    state?: CompositeState;
    /**
     * The id that will be used to group items in the same row. This is
     * usually retrieved by the `CompositeRow` component through context so in
     * most cases you don't need to set it manually.
     */
    rowId?: string;
    /**
     * Whether the scroll behavior should be prevented when pressing arrow keys
     * on the first or the last items.
     * @default false
     */
    preventScrollOnKeyDown?: BooleanOrCallback<KeyboardEvent<HTMLElement>>;
};
export declare type CompositeItemProps<T extends As = "button"> = Props<CompositeItemOptions<T>>;
