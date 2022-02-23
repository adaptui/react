import { As, Props } from "ariakit-utils/types";
import { CompositeOptions } from "../composite/composite";
import { RadioState } from "./radio-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a radio group element.
 * @see https://ariakit.org/components/radio
 * @example
 * ```jsx
 * const state = useRadioState();
 * const props = useRadioGroup({ state });
 * <Role {...props}>
 *   <Radio value="Apple" />
 *   <Radio value="Orange" />
 * </Role>
 * ```
 */
export declare const useRadioGroup: import("ariakit-utils/types").Hook<RadioGroupOptions<"div">>;
/**
 * A component that renders a radio group element.
 * @see https://ariakit.org/components/radio
 * @example
 * ```jsx
 * const radio = useRadioState();
 * <RadioGroup state={radio}>
 *   <Radio value="Apple" />
 *   <Radio value="Orange" />
 * </RadioGroup>
 * ```
 */
export declare const RadioGroup: import("ariakit-utils/types").Component<RadioGroupOptions<"div">>;
export declare type RadioGroupOptions<T extends As = "div"> = Omit<CompositeOptions<T>, "state"> & {
    /**
     * Object returned by the `useRadioState` hook.
     */
    state: RadioState;
};
export declare type RadioGroupProps<T extends As = "div"> = Props<RadioGroupOptions<T>>;
