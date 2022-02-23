import { As, Props } from "ariakit-utils/types";
import { CompositeSeparatorOptions } from "../composite/composite-separator";
import { ComboboxState } from "./combobox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a separator element for combobox items.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxSeparator({ state });
 * <ComboboxPopover state={state}>
 *   <ComboboxItem value="Item 1" />
 *   <Role {...props} />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */
export declare const useComboboxSeparator: import("ariakit-utils/types").Hook<ComboboxSeparatorOptions<"hr">>;
/**
 * A component that renders a separator element for combobox items
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxSeparator />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */
export declare const ComboboxSeparator: import("ariakit-utils/types").Component<ComboboxSeparatorOptions<"hr">>;
export declare type ComboboxSeparatorOptions<T extends As = "hr"> = Omit<CompositeSeparatorOptions<T>, "state"> & {
    /**
     * Object returned by the `useComboboxState` hook. If not provided, the parent
     * `ComboboxList` or `ComboboxPopover` components' context will be used.
     */
    state?: ComboboxState;
};
export declare type ComboboxSeparatorProps<T extends As = "hr"> = Props<ComboboxSeparatorOptions<T>>;
