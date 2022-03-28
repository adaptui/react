import { KeyboardEvent, MouseEvent, SelectHTMLAttributes } from "react";
import { As, BooleanOrCallback, Props } from "ariakit-utils/types";
import { CompositeTypeaheadOptions } from "../composite/composite-typeahead";
import { PopoverDisclosureOptions } from "../popover/popover-disclosure";
import { SelectState } from "./select-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select button.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelect({ state });
 * <Role {...props} />
 * ```
 */
export declare const useSelect: import("ariakit-utils/types").Hook<SelectOptions<"button">>;
/**
 * A component that renders a select button.
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
export declare const Select: import("ariakit-utils/types").Component<SelectOptions<"button">>;
export declare type SelectOptions<T extends As = "button"> = Omit<PopoverDisclosureOptions<T>, "state" | "toggleOnClick"> & Pick<SelectHTMLAttributes<HTMLSelectElement>, "name" | "form" | "required"> & Omit<CompositeTypeaheadOptions<T>, "state"> & {
    /**
     * Object returned by the `useSelectState` hook.
     */
    state: SelectState;
    /**
     * Determines whether the select list will be shown when the user presses
     * arrow keys while the select element is focused.
     * @default true
     */
    showOnKeyDown?: BooleanOrCallback<KeyboardEvent<HTMLElement>>;
    /**
     * Determines whether pressing arrow keys will move the active item even
     * when the select list is hidden.
     * @default false
     */
    moveOnKeyDown?: BooleanOrCallback<KeyboardEvent<HTMLElement>>;
    /**
     * Determines whether `state.toggle()` will be called on click. By default,
     * the select list will be shown on press (on mouse down and on key down).
     * If this prop is set to `true`, the select list will be shown on click
     * instead.
     * @default false
     */
    toggleOnClick?: BooleanOrCallback<MouseEvent<HTMLElement>>;
    /**
     * Determines whether pressing space, enter or mouse down will toggle the
     * select list. This will be ignored if `toggleOnClick` is set to `true`.
     * @default true
     */
    toggleOnPress?: BooleanOrCallback<MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>>;
};
export declare type SelectProps<T extends As = "button"> = Props<SelectOptions<T>>;
