import { As, Props } from "ariakit-utils/types";
import { DialogDisclosureOptions } from "../dialog/dialog-disclosure";
import { ComboboxState } from "./combobox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox disclosure button.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxDisclosure({ state });
 * <Combobox state={state} />
 * <Role {...props} />
 * <ComboboxPopover state={state}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */
export declare const useComboboxDisclosure: import("ariakit-utils/types").Hook<ComboboxDisclosureOptions<"button">>;
/**
 * A component that renders a combobox disclosure button that toggles the
 * combobox popover visibility when clicked.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxDisclosure state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */
export declare const ComboboxDisclosure: import("ariakit-utils/types").Component<ComboboxDisclosureOptions<"button">>;
export declare type ComboboxDisclosureOptions<T extends As = "button"> = Omit<DialogDisclosureOptions<T>, "state"> & {
    /**
     * Object returned by the `useComboboxState` hook.
     */
    state: ComboboxState;
};
export declare type ComboboxDisclosureProps<T extends As = "button"> = Props<ComboboxDisclosureOptions<T>>;
