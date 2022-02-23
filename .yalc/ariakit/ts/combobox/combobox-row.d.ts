import { As, Props } from "ariakit-utils/types";
import { CompositeRowOptions } from "../composite/composite-row";
import { ComboboxState } from "./combobox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox row.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxRow({ state });
 * <ComboboxPopover state={state}>
 *   <Role {...props}>
 *     <ComboboxItem value="Item 1" />
 *     <ComboboxItem value="Item 2" />
 *     <ComboboxItem value="Item 3" />
 *   </Role>
 * </ComboboxPopover>
 * ```
 */
export declare const useComboboxRow: import("ariakit-utils/types").Hook<ComboboxRowOptions<"div">>;
/**
 * A component that renders a combobox row.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxRow>
 *     <ComboboxItem value="Item 1.1" />
 *     <ComboboxItem value="Item 1.2" />
 *     <ComboboxItem value="Item 1.3" />
 *   </ComboboxRow>
 *   <ComboboxRow>
 *     <ComboboxItem value="Item 2.1" />
 *     <ComboboxItem value="Item 2.2" />
 *     <ComboboxItem value="Item 2.3" />
 *   </ComboboxRow>
 * </ComboboxPopover>
 * ```
 */
export declare const ComboboxRow: import("ariakit-utils/types").Component<ComboboxRowOptions<"div">>;
export declare type ComboboxRowOptions<T extends As = "div"> = Omit<CompositeRowOptions<T>, "state"> & {
    /**
     * Object returned by the `useComboboxState` hook. If not provided, the parent
     * `ComboboxList` or `ComboboxPopover` components' context will be used.
     */
    state?: ComboboxState;
};
export declare type ComboboxRowProps<T extends As = "div"> = Props<ComboboxRowOptions<T>>;
