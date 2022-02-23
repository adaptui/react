import { BivariantCallback, SetState } from "ariakit-utils/types";
import { Item } from "./__utils";
/**
 * Provides state for the `Collection` components.
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
export declare function useCollectionState<T extends Item = Item>(props?: CollectionStateProps<T>): CollectionState<T>;
export declare type CollectionState<T extends Item = Item> = {
    /**
     * Lists all the items with their `ref`s. This state is automatically updated
     * when an item is registered or unregistered with the `registerItem`
     * function. The order of the items is automatically defined by the order of
     * the elements in the DOM.
     * @example
     * const { items } = useCollectionState();
     * items.forEach((item) => {
     *   const { ref } = item;
     *   ...
     * });
     */
    items: T[];
    /**
     * Sets the `items` state.
     * @example
     * const { setItems } = useCollectionState();
     * useEffect(() => {
     *   const item = { ref: React.createRef() };
     *   setItems((prevItems) => [...prevItems, item]);
     * }, [setItems])
     */
    setItems: SetState<CollectionState<T>["items"]>;
    /**
     * Registers an item in the collection. This function returns a cleanup
     * function that unregisters the item.
     * @example
     * const ref = useRef();
     * const { registerItem } = useCollectionState();
     * useEffect(() => {
     *   const unregisterItem = registerItem({ ref });
     *   return unregisterItem;
     * }, [registerItem]);
     */
    registerItem: BivariantCallback<(item: T) => () => void>;
};
export declare type CollectionStateProps<T extends Item = Item> = Partial<Pick<CollectionState<T>, "items">> & {
    /**
     * Function that will be called when setting the collection `items` state.
     * @example
     * // Uncontrolled example
     * useCollectionState({ setItems: (items) => console.log(items) });
     * @example
     * // Controlled example
     * const [items, setItems] = useState([]);
     * useCollectionState({ items, setItems });
     * @example
     * // Externally controlled example
     * function Items({ items, onItemsChange }) {
     *   const collection = useCollectionState({
     *     items,
     *     setItems: onItemsChange,
     *   });
     * }
     */
    setItems?: (items: CollectionState<T>["items"]) => void;
};
