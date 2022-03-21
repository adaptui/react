import { RefObject } from "react";
import { SetState } from "ariakit-utils/types";
import { CompositeState, CompositeStateProps } from "../composite/composite-state";
import { PopoverState, PopoverStateProps } from "../popover/popover-state";
import { Item } from "./__utils";
declare type Value = string | string[];
declare type MutableValue<T extends Value = Value> = T extends string ? string : T;
/**
 * Provides state for the `Select` components.
 * @example
 * ```jsx
 * const select = useSelectState({ defaultValue: "Apple" });
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectPopover>
 * ```
 */
export declare function useSelectState<T extends Value = Value>({ virtualFocus, orientation, placement, setValueOnMove, defaultActiveId, includesBaseElement, ...props }?: SelectStateProps<T>): SelectState<T>;
export declare type SelectState<T extends Value = Value> = CompositeState<Item> & PopoverState & {
    /**
     * The select value.
     */
    value: MutableValue<T>;
    /**
     * Sets the `value` state.
     * @example
     * const select = useSelectState();
     * select.setValue("new value");
     */
    setValue: SetState<SelectState<T>["value"]>;
    /**
     * Whether the select value should be set when the active item changes by
     * moving (which usually happens when moving to an item using the keyboard).
     * @default false
     */
    setValueOnMove: boolean;
    /**
     * The select button element's ref.
     */
    selectRef: RefObject<HTMLElement>;
    /**
     * The select label element's ref.
     */
    labelRef: RefObject<HTMLElement>;
};
export declare type SelectStateProps<T extends Value = Value> = CompositeStateProps<Item> & PopoverStateProps & Partial<Pick<SelectState<T>, "value" | "setValueOnMove">> & {
    /**
     * Default value of the select.
     */
    defaultValue?: T;
    /**
     * Function that will be called when setting the select `value` state.
     * @example
     * // Uncontrolled example
     * useSelectState({ setValue: (value) => console.log(value) });
     * @example
     * // Controlled example
     * const [value, setValue] = useState("");
     * useSelectState({ value, setValue });
     * @example
     * // Externally controlled example
     * function MySelect({ value, onChange }) {
     *   const select = useSelectState({ value, setValue: onChange });
     * }
     */
    setValue?: (value: SelectState<T>["value"]) => void;
};
export {};
