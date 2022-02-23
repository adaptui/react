import { As, Options, Props } from "ariakit-utils/types";
import { CollectionState } from "./collection-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component. It receives the collection state through the `state` prop
 * and provides context for `CollectionItem` components.
 * @see https://ariakit.org/components/collection
 * @example
 * ```jsx
 * const collection = useCollectionState();
 * const props = useCollection({ state });
 * <Role {...props}>
 *   <CollectionItem>Item 1</CollectionItem>
 *   <CollectionItem>Item 2</CollectionItem>
 *   <CollectionItem>Item 3</CollectionItem>
 * </Role>
 * ```
 */
export declare const useCollection: import("ariakit-utils/types").Hook<CollectionOptions<"div">>;
/**
 * A component that renders a simple wrapper for collection items. It receives
 * the collection state through the `state` prop and provides context for
 * `CollectionItem` components.
 * @see https://ariakit.org/components/collection
 * @example
 * ```jsx
 * const collection = useCollectionState();
 * <Collection state={collection}>
 *   <CollectionItem>Item 1</CollectionItem>
 *   <CollectionItem>Item 2</CollectionItem>
 *   <CollectionItem>Item 3</CollectionItem>
 * </Collection>
 * ```
 */
export declare const Collection: import("ariakit-utils/types").Component<CollectionOptions<"div">>;
export declare type CollectionOptions<T extends As = "div"> = Options<T> & {
    /**
     * Object returned by the `useCollectionState` hook.
     */
    state: CollectionState;
};
export declare type CollectionProps<T extends As = "div"> = Props<CollectionOptions<T>>;
