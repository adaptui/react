import { As, Props } from "ariakit-utils/types";
import { ButtonOptions } from "../button";
import { ComboboxState } from "./combobox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox cancel button that clears the combobox
 * input when clicked.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxCancel({ state });
 * <Combobox state={state} />
 * <Role {...props} />
 * ```
 */
export declare const useComboboxCancel: import("ariakit-utils/types").Hook<ComboboxCancelOptions<"button">>;
/**
 * A component that renders a combobox cancel button that clears the combobox
 * input when clicked.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxCancel state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */
export declare const ComboboxCancel: import("ariakit-utils/types").Component<ComboboxCancelOptions<"button">>;
export declare type ComboboxCancelOptions<T extends As = "button"> = ButtonOptions<T> & {
    /**
     * Object returned by the `useComboboxState` hook.
     */
    state: ComboboxState;
};
export declare type ComboboxClearProps<T extends As = "button"> = Props<ComboboxCancelOptions<T>>;
