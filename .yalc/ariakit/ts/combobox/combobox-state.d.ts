import { SetState } from "ariakit-utils/types";
import { CompositeState, CompositeStateProps } from "../composite/composite-state";
import { PopoverState, PopoverStateProps } from "../popover/popover-state";
declare type Item = CompositeState["items"][number] & {
    value?: string;
};
/**
 * Provides state for the `Combobox` components.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem>Item 1</ComboboxItem>
 *   <ComboboxItem>Item 2</ComboboxItem>
 *   <ComboboxItem>Item 3</ComboboxItem>
 * </ComboboxPopover>
 * ```
 */
export declare function useComboboxState({ limit, defaultActiveId, includesBaseElement, orientation, focusLoop, focusWrap, placement, virtualFocus, ...props }?: ComboboxStateProps): ComboboxState;
export declare type ComboboxState = CompositeState<Item> & PopoverState & {
    /**
     * The input value.
     */
    value: string;
    /**
     * Sets the `value` state.
     * @example
     * const combobox = useComboboxState();
     * combobox.setValue("new value");
     */
    setValue: SetState<ComboboxState["value"]>;
    /**
     * The value of the current active item when `moveType` is `keyboard`. This
     * is not updated when `moveType` is `mouse`.
     */
    activeValue?: string;
    /**
     * The list of values that will be used to populate the `matches` state,
     * which can be used to render the combobox items.
     * @default []
     */
    list: string[];
    /**
     * Sets the `list` state.
     */
    setList: SetState<ComboboxState["list"]>;
    /**
     * Maximum number of `matches`. If it's set to `false`, there will be no
     * limit.
     * @default false
     */
    limit: number | false;
    /**
     * Result of filtering `list` based on `value`.
     * @default []
     * @example
     * const combobox = useComboboxState({ defaultList: ["Red", "Green"] });
     * combobox.matches; // ["Red", "Green"]
     * combobox.setValue("g");
     * // On next render
     * combobox.matches; // ["Green"]
     */
    matches: string[];
};
export declare type ComboboxStateProps = CompositeStateProps<Item> & PopoverStateProps & Partial<Pick<ComboboxState, "value" | "list" | "limit">> & {
    /**
     * Default value of the combobox input.
     */
    defaultValue?: ComboboxState["value"];
    /**
     * The list of values that will be used to populate the `matches` state,
     * which can be used to render the combobox items. See `list` for more
     * information.
     * @example
     * ```jsx
     * const combobox = useComboboxState({ defaultList: ["Red", "Green"] });
     * <Combobox state={combobox} />
     * <ComboboxPopover state={combobox}>
     *   {combobox.matches.map((value) => (
     *     <ComboboxItem key={value} value={value} />
     *   ))}
     * </ComboboxPopover>
     * ```
     */
    defaultList?: ComboboxState["list"];
    /**
     * Function that will be called when setting the combobox `value` state.
     * @example
     * // Uncontrolled example
     * useComboboxState({ setValue: (value) => console.log(value) });
     * @example
     * // Controlled example
     * const [value, setValue] = useState("");
     * useComboboxState({ value, setValue });
     * @example
     * // Externally controlled example
     * function MyCombobox({ value, onChange }) {
     *   const combobox = useComboboxState({ value, setValue: onChange });
     * }
     */
    setValue?: (value: ComboboxState["value"]) => void;
    /**
     * Function that will be called when setting the combobox `list` state.
     * @example
     * const [list, setList] = useState([]);
     * useComboboxState({ list, setList });
     */
    setList?: (list: ComboboxState["list"]) => void;
};
export {};
