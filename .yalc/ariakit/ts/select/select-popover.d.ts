import { As, Props } from "ariakit-utils/types";
import { PopoverOptions } from "../popover/popover";
import { SelectListOptions } from "./select-list";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select popover.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectPopover({ state });
 * <Role {...props}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </Role>
 * ```
 */
export declare const useSelectPopover: import("ariakit-utils/types").Hook<SelectPopoverOptions<"div">>;
/**
 * A component that renders a select popover. The `role` prop is set to
 * `listbox` by default, but can be overriden by any other valid select popup
 * role (`listbox`, `menu`, `tree`, `grid` or `dialog`).
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
export declare const SelectPopover: import("ariakit-utils/types").Component<SelectPopoverOptions<"div">>;
export declare type SelectPopoverOptions<T extends As = "div"> = SelectListOptions<T> & Omit<PopoverOptions<T>, "state">;
export declare type SelectPopoverProps<T extends As = "div"> = Props<SelectPopoverOptions<T>>;
