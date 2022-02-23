import { As, Options, Props } from "ariakit-utils/types";
import { ComboboxState } from "./combobox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a value element inside a combobox item. The value
 * will be split into span elements and returned as the children prop. The
 * portions of the value that correspond to the state value will have a
 * `data-user-value` attribute. The other portions will have a
 * `data-autocomplete-value` attribute.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState({ value: "p" });
 * const props = useComboboxItemValue({ state, value: "Apple" });
 * <Role {...props} />
 * // This will result in the following DOM:
 * <span>
 *   <span data-autocomplete-value>A</span>
 *   <span data-user-value>p</span>
 *   <span data-user-value>p</span>
 *   <span data-autocomplete-value>le</span>
 * </span>
 * ```
 */
export declare const useComboboxItemValue: import("ariakit-utils/types").Hook<ComboboxItemValueOptions<"span">>;
/**
 * A component that renders a value element inside a combobox item. The value
 * will be split into span elements. The portions of the value that correspond
 * to the state value will have a `data-user-value` attribute. The other
 * portions will have a `data-autocomplete-value` attribute.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState({ value: "p" });
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem value="Apple">
 *     <ComboboxItemValue />
 *   </ComboboxItem>
 * </ComboboxPopover>
 * // The Apple item will have a value element that looks like this:
 * <span>
 *   <span data-autocomplete-value>A</span>
 *   <span data-user-value>p</span>
 *   <span data-user-value>p</span>
 *   <span data-autocomplete-value>le</span>
 * </span>
 * ```
 */
export declare const ComboboxItemValue: import("ariakit-utils/types").Component<ComboboxItemValueOptions<"span">>;
export declare type ComboboxItemValueOptions<T extends As = "span"> = Options<T> & {
    /**
     * Object returned by the `useComboboxState` hook. If not provided, the parent
     * `ComboboxList` or `ComboboxPopover` components' context will be used.
     */
    state?: ComboboxState;
    /**
     * The current combobox item value. If not provided, the parent `ComboboxItem`
     * component's `value` prop will be used.
     */
    value?: string;
};
export declare type ComboboxItemValueProps<T extends As = "span"> = Props<ComboboxItemValueOptions<T>>;
