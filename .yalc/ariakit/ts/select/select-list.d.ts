import { KeyboardEvent } from "react";
import { As, BooleanOrCallback, Props } from "ariakit-utils/types";
import { CompositeOptions } from "../composite/composite";
import { CompositeTypeaheadOptions } from "../composite/composite-typeahead";
import { SelectState } from "./select-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select list.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectList({ state });
 * <Role {...props}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </Role>
 * ```
 */
export declare const useSelectList: import("ariakit-utils/types").Hook<SelectListOptions<"div">>;
/**
 * A component that renders a select list. The `role` prop is set to `listbox`
 * by default, but can be overriden by any other valid select popup role
 * (`listbox`, `menu`, `tree`, `grid` or `dialog`). The `aria-labelledby` prop
 * is set to the select input element's `id` by default.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectList state={select}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectList>
 * ```
 */
export declare const SelectList: import("ariakit-utils/types").Component<SelectListOptions<"div">>;
export declare type SelectListOptions<T extends As = "div"> = Omit<CompositeOptions<T>, "state"> & Omit<CompositeTypeaheadOptions<T>, "state"> & {
    /**
     * Object returned by the `useSelectState` hook.
     */
    state: SelectState;
    /**
     * Whether the select value should be reset to the value before the list got
     * shown when Escape is pressed. This has effect only when `selectOnMove` is
     * `true` on the select state.
     * @default true
     */
    resetOnEscape?: BooleanOrCallback<KeyboardEvent<HTMLElement>>;
    /**
     * Whether the select list should be hidden when the user presses Enter or
     * Space while the list is focused (that is, no item is selected).
     * @default true
     */
    hideOnEnter?: BooleanOrCallback<KeyboardEvent<HTMLElement>>;
};
export declare type SelectListProps<T extends As = "div"> = Props<SelectListOptions<T>>;
