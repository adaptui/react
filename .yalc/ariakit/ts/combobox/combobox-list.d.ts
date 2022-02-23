import { As, Options, Props } from "ariakit-utils/types";
import { ComboboxState } from "./combobox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox list.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxList({ state });
 * <Role {...props}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </Role>
 * ```
 */
export declare const useComboboxList: import("ariakit-utils/types").Hook<ComboboxListOptions<"div">>;
/**
 * A component that renders a combobox list. The `role` prop is set to `listbox`
 * by default, but can be overriden by any other valid combobox popup role
 * (`listbox`, `menu`, `tree`, `grid` or `dialog`). The `aria-labelledby` prop
 * is set to the combobox input element's `id` by default.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxList state={combobox}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxList>
 * ```
 */
export declare const ComboboxList: import("ariakit-utils/types").Component<ComboboxListOptions<"div">>;
export declare type ComboboxListOptions<T extends As = "div"> = Options<T> & {
    /**
     * Object returned by the `useComboboxState` hook.
     */
    state: ComboboxState;
};
export declare type ComboboxListProps<T extends As = "div"> = Props<ComboboxListOptions<T>>;
