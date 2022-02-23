import { As, Props } from "ariakit-utils/types";
import { CompositeGroupOptions } from "../composite/composite-group";
import { ComboboxState } from "./combobox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox group.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxGroup({ state });
 * <Combobox state={state} />
 * <ComboboxPopover state={state}>
 *   <Role {...props}>
 *     <ComboboxGroupLabel>Label</ComboboxGroupLabel>
 *     <ComboboxItem value="Item 1" />
 *     <ComboboxItem value="Item 2" />
 *   </Role>
 * </ComboboxPopover>
 * ```
 */
export declare const useComboboxGroup: import("ariakit-utils/types").Hook<ComboboxGroupOptions<"div">>;
/**
 * A component that renders a combobox group.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={state} />
 * <ComboboxPopover state={state}>
 *   <ComboboxGroup>
 *     <ComboboxGroupLabel>Label</ComboboxGroupLabel>
 *     <ComboboxItem value="Item 1" />
 *     <ComboboxItem value="Item 2" />
 *   </ComboboxGroup>
 * </ComboboxPopover>
 * ```
 */
export declare const ComboboxGroup: import("ariakit-utils/types").Component<ComboboxGroupOptions<"div">>;
export declare type ComboboxGroupOptions<T extends As = "div"> = Omit<CompositeGroupOptions<T>, "state"> & {
    /**
     * Object returned by the `useComboboxState` hook. If not provided, the parent
     * `ComboboxList` or `ComboboxPopover` components' context will be used.
     */
    state?: ComboboxState;
};
export declare type ComboboxGroupProps<T extends As = "div"> = Props<ComboboxGroupOptions<T>>;
