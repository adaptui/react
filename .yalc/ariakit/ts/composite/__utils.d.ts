import { RefObject } from "react";
import { CompositeState } from "./composite-state";
/**
 * Returns only enabled items.
 */
export declare function getEnabledItems(items: Item[], excludeId?: string): Item[];
/**
 * Finds the first enabled item.
 */
export declare function findFirstEnabledItem(items: Item[], excludeId?: string): Item | undefined;
/**
 * Fills rows with fewer items with empty items so they all have the same
 * length.
 */
export declare function normalizeRows(rows: Item[][], activeId?: string | null, focusShift?: boolean): Item[][];
/**
 * Finds the first enabled item by its id.
 */
export declare function findEnabledItemById(items: Item[], id?: string | null): Item | undefined;
/**
 * Gets the active id. If `passedId` is provided, it's going to take
 * precedence.
 */
export declare function getActiveId(items: Item[], activeId?: string | null, passedId?: string | null): string | null | undefined;
/**
 * Gets all items with the passed rowId.
 */
export declare function getItemsInRow(items: Item[], rowId?: string): Item[];
/**
 * Gets the opposite orientation.
 */
export declare function getOppositeOrientation(orientation: Orientation): "horizontal" | "vertical" | undefined;
/**
 * Creates a two-dimensional array with items grouped by their rowId's.
 */
export declare function groupItemsByRows(items: Item[]): Item[][];
/**
 * Moves all the items before the passed `id` to the end of the array. This is
 * useful when we want to loop through the items in the same row or column as
 * the first items will be placed after the last items.
 *
 * The null item that's inserted when `shouldInsertNullItem` is set to `true`
 * represents the composite container itself. When the active item is null, the
 * composite container has focus.
 */
export declare function flipItems(items: Item[], activeId: string, shouldInsertNullItem?: boolean): ({
    id: null;
    ref: {
        current: null;
    };
} | Item)[];
/**
 * Changes the order of the items list so they are ordered vertically. That is,
 * if the active item is the first item in the first row, the next item will be
 * the first item in the second row, which is what you would expect when moving
 * up/down.
 */
export declare function verticalizeItems(items: Item[]): Item[];
/**
 * Gets item id.
 */
export declare function getContextId(state?: Pick<CompositeState, "baseRef">, context?: ItemContext): string | undefined;
export declare function selectTextField(element: HTMLElement, collapseToEnd?: boolean): void;
export declare const CompositeContext: import("react").Context<CompositeState<Item> | undefined>;
declare type ItemContext = {
    baseRef?: RefObject<HTMLElement>;
    id?: string;
} | undefined;
export declare const CompositeRowContext: import("react").Context<ItemContext>;
export declare const CompositeItemContext: import("react").Context<ItemContext>;
export declare type Orientation = "horizontal" | "vertical" | "both";
export declare type Item = {
    id: string | null;
    ref: RefObject<HTMLElement>;
    rowId?: string;
    disabled?: boolean;
};
export {};
