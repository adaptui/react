import { As, Props } from "ariakit-utils/types";
import { PopoverOptions } from "../popover/popover";
import { ComboboxListOptions } from "./combobox-list";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox popover.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxPopover({ state });
 * <Role {...props}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </Role>
 * ```
 */
export declare const useComboboxPopover: import("ariakit-utils/types").Hook<ComboboxPopoverOptions<"div">>;
/**
 * A component that renders a combobox popover. The `role` prop is set to
 * `listbox` by default, but can be overriden by any other valid combobox popup
 * role (`listbox`, `menu`, `tree`, `grid` or `dialog`). The `aria-labelledby`
 * prop is set to the combobox input element's `id` by default.
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
export declare const ComboboxPopover: import("ariakit-utils/types").Component<ComboboxPopoverOptions<"div">>;
export declare type ComboboxPopoverOptions<T extends As = "div"> = ComboboxListOptions<T> & Omit<PopoverOptions<T>, "state">;
export declare type ComboboxPopoverProps<T extends As = "div"> = Props<ComboboxPopoverOptions<T>>;
