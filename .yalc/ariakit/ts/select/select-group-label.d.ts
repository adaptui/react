import { As, Props } from "ariakit-utils/types";
import { CompositeGroupLabelOptions } from "../composite/composite-group-label";
import { SelectState } from "./select-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a select group. This hook must be used
 * in a component that's wrapped with `SelectGroup` so the `aria-labelledby`
 * prop is properly set on the select group element.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * // This component must be wrapped with SelectGroup
 * const props = useSelectGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */
export declare const useSelectGroupLabel: import("ariakit-utils/types").Hook<SelectGroupLabelOptions<"div">>;
/**
 * A component that renders a label in a select group. This component must be
 * wrapped with `SelectGroup` so the `aria-labelledby` prop is properly set
 * on the select group element.
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
 *   <SelectGroup>
 *     <SelectGroupLabel>Meat</SelectGroupLabel>
 *     <SelectItem value="Beef" />
 *     <SelectItem value="Chicken" />
 *   </SelectGroup>
 * </SelectPopover>
 * ```
 */
export declare const SelectGroupLabel: import("ariakit-utils/types").Component<SelectGroupLabelOptions<"div">>;
export declare type SelectGroupLabelOptions<T extends As = "div"> = Omit<CompositeGroupLabelOptions<T>, "state"> & {
    /**
     * Object returned by the `useSelectState` hook. If not provided, the parent
     * `SelectList` or `SelectPopover` components' context will be used.
     */
    state?: SelectState;
};
export declare type SelectGroupLabelProps<T extends As = "div"> = Props<SelectGroupLabelOptions<T>>;
