import { ChangeEvent, MouseEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { As, BooleanOrCallback, Props } from "ariakit-utils/types";
import { CompositeOptions } from "../composite/composite";
import { PopoverAnchorOptions } from "../popover/popover-anchor";
import { ComboboxState } from "./combobox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox input.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useCombobox({ state });
 * <Role {...props} />
 * <ComboboxPopover state={state}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */
export declare const useCombobox: import("ariakit-utils/types").Hook<ComboboxOptions<"input">>;
/**
 * A component that renders a combobox input.
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
export declare const Combobox: import("ariakit-utils/types").Component<ComboboxOptions<"input">>;
export declare type ComboboxOptions<T extends As = "input"> = Omit<CompositeOptions<T>, "state"> & Omit<PopoverAnchorOptions<T>, "state"> & {
    /**
     * Object returned by the `useComboboxState` hook.
     */
    state: ComboboxState;
    /**
     * Determines whether the first item will be automatically selected when the
     * combobox input value changes. When it's set to `true`, the exact behavior
     * will depend on the value of `autoComplete` prop:
     *   - If `autoComplete` is `both` or `inline`, the first item is
     *     automatically focused when the popup opens, and the input value
     *     changes to reflect this. The inline completion string will be
     *     highlighted and will have a selected state.
     *   - If `autoComplete` is `list` or `none`, the first item is
     *     automatically focused when the popup opens, but the input value
     *     doesn't change.
     * @default false
     */
    autoSelect?: boolean;
    /**
     * Determines whether the items will be filtered based on `value` and
     * whether the input value will temporarily change based on the active item.
     * If `defaultList` or `list` are provided, this will be set to `list` by
     * default, otherwise it'll default to `none`.
     *   - `both`: the items will be filtered based on `value` and the input
     *     value will temporarily change based on the active item.
     *   - `list`: the items will be filtered based on `value` and the input
     *     value will NOT change based on the active item.
     *   - `inline`: the items are static, that is, they won't be filtered based
     *     on `value`, but the input value will temporarily change based on the
     *     active item.
     *   - `none`: the items are static and the input value will NOT change
     *     based on the active item.
     */
    autoComplete?: "both" | "inline" | "list" | "none";
    /**
     * Determines whether the combobox list/popover should be shown when the
     * input value is changed. This can be a boolean or a function that receives
     * a ChangeEvent and returns a boolean.
     * @default true
     * @example
     * ```jsx
     * <Combobox showOnChange={(event) => event.target.value.length > 1} />
     * ```
     */
    showOnChange?: BooleanOrCallback<ChangeEvent<HTMLInputElement>>;
    /**
     * Determines whether the combobox list/popover should be shown when the
     * input is clicked. This can be a boolean or a function that receives a
     * MouseEvent and returns a boolean.
     * @default true
     * @example
     * ```jsx
     * const combobox = useComboboxState();
     * <Combobox state={combobox} showOnMouseDown={combobox.value.length > 1} />
     * ```
     */
    showOnMouseDown?: BooleanOrCallback<MouseEvent<HTMLInputElement>>;
    /**
     * Determines whether the combobox list/popover should be shown when the
     * user presses the arrow up or down keys while focusing on the combobox
     * input element. This can be a boolean or a function that receives a
     * KeyboardEvent and returns a boolean.
     * @default true
     * @example
     * ```jsx
     * const combobox = useComboboxState();
     * <Combobox state={combobox} showOnKeyDown={combobox.value.length > 1} />
     * ```
     */
    showOnKeyDown?: BooleanOrCallback<ReactKeyboardEvent<HTMLInputElement>>;
};
export declare type ComboboxProps<T extends As = "input"> = Props<ComboboxOptions<T>>;
