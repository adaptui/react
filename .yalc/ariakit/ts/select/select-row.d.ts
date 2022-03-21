import { As, Props } from "ariakit-utils/types";
import { CompositeRowOptions } from "../composite/composite-row";
import { SelectState } from "./select-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select row.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectRow({ state });
 * <SelectPopover state={state}>
 *   <Role {...props}>
 *     <SelectItem value="Apple" />
 *     <SelectItem value="Orange" />
 *   </Role>
 * </SelectPopover>
 * ```
 */
export declare const useSelectRow: import("ariakit-utils/types").Hook<SelectRowOptions<"div">>;
/**
 * A component that renders a select row.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectRow>
 *     <SelectItem value="Apple" />
 *     <SelectItem value="Orange" />
 *   </SelectRow>
 *   <SelectRow>
 *     <SelectItem value="Banana" />
 *     <SelectItem value="Grape" />
 *   </SelectRow>
 * </SelectPopover>
 * ```
 */
export declare const SelectRow: import("ariakit-utils/types").Component<SelectRowOptions<"div">>;
export declare type SelectRowOptions<T extends As = "div"> = Omit<CompositeRowOptions<T>, "state"> & {
    /**
     * Object returned by the `useSelectState` hook. If not provided, the parent
     * `SelectList` or `SelectPopover` components' context will be used.
     */
    state?: SelectState;
};
export declare type SelectRowProps<T extends As = "div"> = Props<SelectRowOptions<T>>;
