import { MouseEvent } from "react";
import { As, Props } from "ariakit-utils/types";
import { BooleanOrCallback } from "ariakit-utils/types";
import { CompositeHoverOptions } from "../composite/composite-hover";
import { CompositeItemOptions } from "../composite/composite-item";
import { SelectState } from "./select-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select item.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectItem({ state, value: "Apple" });
 * <Role {...props} />
 * ```
 */
export declare const useSelectItem: import("ariakit-utils/types").Hook<SelectItemOptions<"div">>;
/**
 * A component that renders a select item inside a select list or select
 * popover. The `role` prop will be automatically set based on the `SelectList`
 * or `SelectPopover` own `role` prop. For example, if the `SelectPopover`
 * component's `role` prop is set to `listbox` (default), the `SelectItem`
 * `role` will be set to `option`. By default, the `value` prop will be rendered
 * as the children, but this can be overriden.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectPopover>
 * ```
 */
export declare const SelectItem: import("ariakit-utils/types").Component<SelectItemOptions<"div">>;
export declare type SelectItemOptions<T extends As = "div"> = Omit<CompositeItemOptions<T>, "state" | "preventScrollOnKeyDown"> & Omit<CompositeHoverOptions<T>, "state"> & {
    /**
     * Object returned by the `useSelectState` hook. If not provided, the
     * parent `SelectList` or `SelectPopover` components' context will be
     * used.
     */
    state?: SelectState;
    /**
     * The value of the item. This will be rendered as the children by default.
     *   - If `setValueOnClick` is set to `true` on this component, the
     *     `select.value` state will be set to this value when the user clicks
     *     on it.
     *   - If `select.setValueOnMove` is set to `true` on the select state, the
     *     `select.value` state will be set to this value when the user moves to
     *     it (which is usually the case when moving through the items using the
     *     keyboard).
     * @example
     * ```jsx
     * <SelectItem value="Apple" />
     * ```
     */
    value?: string;
    /**
     * Whether to hide the select when this item is clicked. By default, it's
     * `true` when the `value` prop is also provided.
     */
    hideOnClick?: BooleanOrCallback<MouseEvent<HTMLElement>>;
    /**
     * Whether to set the select value with this item's value, if any, when this
     * item is clicked. By default, it's `true` when the `value` prop is also
     * provided.
     */
    setValueOnClick?: BooleanOrCallback<MouseEvent<HTMLElement>>;
    /**
     * Whether the scroll behavior should be prevented when pressing arrow keys
     * on the first or the last items.
     * @default true
     */
    preventScrollOnKeyDown?: CompositeItemOptions["preventScrollOnKeyDown"];
};
export declare type SelectItemProps<T extends As = "div"> = Props<SelectItemOptions<T>>;
