import { As, Props } from "ariakit-utils/types";
import { CompositeGroupLabelOptions } from "../composite/composite-group-label";
import { ComboboxState } from "./combobox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a combobox group. This hook should be
 * used in a component that's wrapped with `ComboboxGroup` so the
 * `aria-labelledby` is correctly set on the combobox group element.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * // This component should be wrapped with ComboboxGroup
 * const props = useComboboxGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */
export declare const useComboboxGroupLabel: import("ariakit-utils/types").Hook<ComboboxGroupLabelOptions<"div">>;
/**
 * A component that renders a label in a combobox group. This component should
 * be wrapped with `ComboboxGroup` so the `aria-labelledby` is correctly set on
 * the combobox group element.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxGroup>
 *     <ComboboxGroupLabel>Label</ComboboxGroupLabel>
 *     <ComboboxItem value="Item 1" />
 *     <ComboboxItem value="Item 2" />
 *   </ComboboxGroup>
 * </ComboboxPopover>
 * ```
 */
export declare const ComboboxGroupLabel: import("ariakit-utils/types").Component<ComboboxGroupLabelOptions<"div">>;
export declare type ComboboxGroupLabelOptions<T extends As = "div"> = Omit<CompositeGroupLabelOptions<T>, "state"> & {
    /**
     * Object returned by the `useComboboxState` hook. If not provided, the parent
     * `ComboboxList` or `ComboboxPopover` components' context will be used.
     */
    state?: ComboboxState;
};
export declare type ComboboxGroupLabelProps<T extends As = "div"> = Props<ComboboxGroupLabelOptions<T>>;
