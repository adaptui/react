import { SetState } from "ariakit-utils/types";
import { CompositeState, CompositeStateProps } from "../composite/composite-state";
/**
 * Provides state for the `Radio` components.
 * @example
 * ```jsx
 * const radio = useRadioState();
 * <RadioGroup state={radio}>
 *   <Radio value="Apple" />
 *   <Radio value="Orange" />
 * </RadioGroup>
 * ```
 */
export declare function useRadioState({ focusLoop, ...props }?: RadioStateProps): RadioState;
export declare type RadioState = CompositeState & {
    /**
     * The current value of the radio group.
     */
    value: string | number | null;
    /**
     * Sets the `value` state.
     */
    setValue: SetState<RadioState["value"]>;
};
export declare type RadioStateProps = CompositeStateProps & Partial<Pick<RadioState, "value">> & {
    /**
     * The initial value of the radio group.
     */
    defaultValue?: RadioState["value"];
    /**
     * Function that will be called when setting the radio `value` state.
     * @example
     * function RadioGroup({ value, onChange }) {
     *   const radio = useRadioState({ value, setValue: onChange });
     * }
     */
    setValue?: (value: RadioState["value"]) => void;
};
