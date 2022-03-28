import { RefObject } from "react";
import { SetState } from "ariakit-utils/types";
import { CollectionState, CollectionStateProps } from "../collection/collection-state";
import { Item, Orientation } from "./__utils";
/**
 * Provides state for the `Composite` component.
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
export declare function useCompositeState<T extends Item = Item>({ orientation, rtl, virtualFocus, focusLoop, focusWrap, focusShift, ...props }?: CompositeStateProps<T>): CompositeState<T>;
export declare type CompositeState<T extends Item = Item> = CollectionState<T> & {
    /**
     * The ref to the `Composite` element.
     */
    baseRef: RefObject<HTMLElement>;
    /**
     * If enabled, the composite element will act as an
     * [aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
     * container instead of [roving
     * tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
     * DOM focus will remain on the composite while its items receive virtual
     * focus.
     * @default false
     */
    virtualFocus: boolean;
    /**
     * Defines the orientation of the composite widget. If the composite has a
     * single row or column (one-dimensional), the `orientation` value determines
     * which arrow keys can be used to move focus:
     *   - `both`: all arrow keys work.
     *   - `horizontal`: only left and right arrow keys work.
     *   - `vertical`: only up and down arrow keys work.
     *
     * It doesn't have any effect on two-dimensional composites.
     * @default "both"
     */
    orientation: Orientation;
    /**
     * Determines how the `next` and `previous` functions will behave. If `rtl` is
     * set to `true`, they will be inverted. This only affects the composite
     * widget behavior. You still need to set `dir="rtl"` on HTML/CSS.
     * @default false
     */
    rtl: boolean;
    /**
     * On one-dimensional composites:
     *   - `true` loops from the last item to the first item and vice-versa.
     *   - `horizontal` loops only if `orientation` is `horizontal` or not set.
     *   - `vertical` loops only if `orientation` is `vertical` or not set.
     *   - If `activeId` is initially set to `null`, the composite element will be
     *     focused in between the last and first items.
     *
     * On two-dimensional composites:
     *   - `true` loops from the last row/column item to the first item in the
     *     same row/column and vice-versa. If it's the last item in the last row,
     *     it moves to the first item in the first row and vice-versa.
     *   - `horizontal` loops only from the last row item to the first item in the
     *     same row.
     *   - `vertical` loops only from the last column item to the first item in
     *     the column row.
     *   - If `activeId` is initially set to `null`, vertical loop will have no
     *     effect as moving down from the last row or up from the first row will
     *     focus the composite element.
     *   - If `focusWrap` matches the value of `focusLoop`, it'll wrap between the
     *     last item in the last row or column and the first item in the first row
     *     or column and vice-versa.
     * @default false
     */
    focusLoop: boolean | Orientation;
    /**
     * **Has effect only on two-dimensional composites**. If enabled, moving to
     * the next item from the last one in a row or column will focus the first
     * item in the next row or column and vice-versa.
     *   - `true` wraps between rows and columns.
     *   - `horizontal` wraps only between rows.
     *   - `vertical` wraps only between columns.
     *   - If `focusLoop` matches the value of `focusWrap`, it'll wrap between the last
     * item in the last row or column and the first item in the first row or
     * column and vice-versa.
     * @default false
     */
    focusWrap: boolean | Orientation;
    /**
     * **Has effect only on two-dimensional composites**. If enabled, moving up
     * or down when there's no next item or the next item is disabled will shift
     * to the item right before it.
     * @default false
     */
    focusShift: boolean;
    /**
     * The number of times the `move` function has been called.
     * @default 0
     * @example
     * const composite = useCompositeState();
     * composite.moves; // 0
     * composite.move(null);
     * // On the next render
     * composite.moves; // 1
     */
    moves: number;
    /**
     * Sets the `moves` state.
     */
    setMoves: SetState<CompositeState["moves"]>;
    /**
     * Indicates whether the `Composite` element should be included in the focus
     * order.
     * @default false
     */
    includesBaseElement: boolean;
    /**
     * The current focused item `id`.
     *   - `undefined` will automatically focus the first enabled composite item.
     *   - `null` will focus the base composite element and users will be able to
     *     navigate out of it using arrow keys.
     *   - If `activeId` is initially set to `null`, the base composite element
     *     itself will have focus and users will be able to navigate to it using
     *     arrow keys.
     */
    activeId?: Item["id"];
    /**
     * Sets the `activeId` state without moving focus.
     */
    setActiveId: SetState<CompositeState["activeId"]>;
    /**
     * Moves focus to a given item id.
     * @example
     * const composite = useCompositeState();
     * const onClick = () => {
     *   composite.move("item-2"); // focus item 2
     * };
     */
    move: (id?: Item["id"]) => void;
    /**
     * Returns the id of the next item.
     * @example
     * const composite = useCompositeState();
     * const onClick = () => {
     *   composite.move(composite.next()); // focus next item
     * };
     */
    next: (skip?: number) => Item["id"] | undefined;
    /**
     * Returns the id of the previous item.
     * @example
     * const composite = useCompositeState();
     * const onClick = () => {
     *   composite.move(composite.previous()); // focus previous item
     * };
     */
    previous: (skip?: number) => Item["id"] | undefined;
    /**
     * Returns the id of the item above.
     * @example
     * const composite = useCompositeState();
     * const onClick = () => {
     *   composite.move(composite.up()); // focus the item above
     * };
     */
    up: (skip?: number) => Item["id"] | undefined;
    /**
     * Returns the id of the item below.
     * @example
     * const composite = useCompositeState();
     * const onClick = () => {
     *   composite.move(composite.down()); // focus the item below
     * };
     */
    down: (skip?: number) => Item["id"] | undefined;
    /**
     * Returns the id of the first item.
     * @example
     * const composite = useCompositeState();
     * const onClick = () => {
     *   composite.move(composite.first()); // focus the first item
     * };
     */
    first: () => Item["id"] | undefined;
    /**
     * Returns the id of the last item.
     * @example
     * const composite = useCompositeState();
     * const onClick = () => {
     *   composite.move(composite.last()); // focus the last item
     * };
     */
    last: () => Item["id"] | undefined;
};
export declare type CompositeStateProps<T extends Item = Item> = CollectionStateProps<T> & Partial<Pick<CompositeState<T>, "virtualFocus" | "orientation" | "rtl" | "focusLoop" | "focusWrap" | "focusShift" | "moves" | "includesBaseElement" | "activeId">> & {
    /**
     * The composite item id that should be focused when the composite is
     * initialized.
     * @example
     * ```jsx
     * const composite = useCompositeState({ defaultActiveId: "item-2" });
     * <Composite state={composite}>
     *   <CompositeItem>Item 1</CompositeItem>
     *   <CompositeItem id="item-2">Item 2</CompositeItem>
     *   <CompositeItem>Item 3</CompositeItem>
     * </Composite>
     * ```
     */
    defaultActiveId?: CompositeState<T>["activeId"];
    /**
     * Function that will be called when setting the composite `moves` state.
     * @example
     * const [moves, setMoves] = useState(0);
     * useCompositeState({ moves, setMoves });
     */
    setMoves?: (moves: CompositeState<T>["moves"]) => void;
    /**
     * Function that will be called when setting the composite `activeId`.
     * @example
     * function MyComposite({ activeId, onActiveIdChange }) {
     *   const composite = useCompositeState({
     *     activeId,
     *     setActiveId: onActiveIdChange,
     *   });
     * }
     */
    setActiveId?: (activeId: CompositeState<T>["activeId"]) => void;
};
