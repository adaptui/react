import { As, Props } from "ariakit-utils/types";
import { CompositeGroupOptions } from "../composite/composite-group";
import { SelectState } from "./select-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select group.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectGroup({ state });
 * <Select state={state} />
 * <SelectPopover state={state}>
 *   <Role {...props}>
 *     <SelectGroupLabel>Fruits</SelectGroupLabel>
 *     <SelectItem value="Apple" />
 *     <SelectItem value="Orange" />
 *   </Role>
 * </SelectPopover>
 * ```
 */
export declare const useSelectGroup: import("ariakit-utils/types").Hook<SelectGroupOptions<"div">>;
/**
 * A component that renders a select group.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectGroup>
 *     <SelectGroupLabel>Fruits</SelectGroupLabel>
 *     <SelectItem value="Apple" />
 *     <SelectItem value="Orange" />
 *   </SelectGroup>
 * </SelectPopover>
 * ```
 */
export declare const SelectGroup: import("ariakit-utils/types").Component<SelectGroupOptions<"div">>;
export declare type SelectGroupOptions<T extends As = "div"> = Omit<CompositeGroupOptions<T>, "state"> & {
    /**
     * Object returned by the `useSelectState` hook. If not provided, the parent
     * `SelectList` or `SelectPopover` components' context will be used.
     */
    state?: SelectState;
};
export declare type SelectGroupProps<T extends As = "div"> = Props<SelectGroupOptions<T>>;
