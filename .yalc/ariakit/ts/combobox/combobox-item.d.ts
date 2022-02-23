import { MouseEvent } from "react";
import { As, BooleanOrCallback, Props } from "ariakit-utils/types";
import { CompositeHoverOptions } from "../composite/composite-hover";
import { CompositeItemOptions } from "../composite/composite-item";
import { ComboboxState } from "./combobox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox item.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxItem({ state, value: "value" });
 * <Role {...props} />
 * ```
 */
export declare const useComboboxItem: import("ariakit-utils/types").Hook<ComboboxItemOptions<"div">>;
/**
 * A component that renders a combobox item inside a combobox list or popover.
 * The `role` prop will be automatically set based on the `ComboboxList` or
 * `ComboboxPopover` own `role` prop. For example, if the `ComboboxPopover`
 * component's `role` prop is set to `listbox` (default), the `ComboboxItem`
 * `role` will be set to `option`. By default, the `value` prop will be rendered
 * as the children, but this can be overriden.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */
export declare const ComboboxItem: import("ariakit-utils/types").Component<ComboboxItemOptions<"div">>;
export declare type ComboboxItemOptions<T extends As = "div"> = Omit<CompositeItemOptions<T>, "state"> & Omit<CompositeHoverOptions<T>, "state" | "focusOnHover"> & {
    /**
     * Object returned by the `useComboboxState` hook. If not provided, the
     * parent `ComboboxList` or `ComboboxPopover` components' context will be
     * used.
     */
    state?: ComboboxState;
    /**
     * The value of the item. This will be rendered as the children by default.
     * If `setValueOnClick` is set to `true`, this will be the value of the
     * combobox input when the user clicks on this item. If
     * `combobox.autoComplete` is `both` or `inline`, this will be the value of
     * the combobox input when the combobox loses focus.
     */
    value?: string;
    /**
     * Whether to hide the combobox when this item is clicked.
     * @default true
     */
    hideOnClick?: BooleanOrCallback<MouseEvent<HTMLElement>>;
    /**
     * Whether to set the combobox value with this item's value when this item is
     * clicked.
     * @default true
     */
    setValueOnClick?: boolean;
    /**
     * Whether to focus the combobox item on hover.
     * @default false
     */
    focusOnHover?: CompositeHoverOptions["focusOnHover"];
};
export declare type ComboboxItemProps<T extends As = "div"> = Props<ComboboxItemOptions<T>>;
