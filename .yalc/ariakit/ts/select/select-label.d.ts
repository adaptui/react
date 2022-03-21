import { As, Options, Props } from "ariakit-utils/types";
import { SelectState } from "./select-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label for the `Select` component. Since it's
 * not a native select element, we can't use the native label element. The
 * `SelectLabel` component will move focus and click on the `Select` component
 * when the user clicks on the label.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectLabel({ state });
 * <Role {...props}>Favorite fruit</Role>
 * <Select state={state} />
 * ```
 */
export declare const useSelectLabel: import("ariakit-utils/types").Hook<SelectLabelOptions<"div">>;
/**
 * A component that renders a label for the `Select` component. Since it's not a
 * native select element, we can't use the native label element. The
 * `SelectLabel` component will move focus and click on the `Select` component
 * when the user clicks on the label.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState({ defaultValue: "Apple" });
 * <SelectLabel state={select}>Favorite fruit</SelectLabel>
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectPopover>
 * ```
 */
export declare const SelectLabel: import("ariakit-utils/types").Component<SelectLabelOptions<"div">>;
export declare type SelectLabelOptions<T extends As = "div"> = Options<T> & {
    /**
     * Object returned by the `useSelectState` hook. If not provided, the parent
     * `Select` component's context will be used.
     */
    state: SelectState;
};
export declare type SelectLabelProps<T extends As = "label"> = Props<SelectLabelOptions<T>>;
