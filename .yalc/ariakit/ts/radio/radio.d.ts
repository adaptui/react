import { SyntheticEvent } from "react";
import { As, BivariantCallback, Props } from "ariakit-utils/types";
import { CompositeItemOptions } from "../composite/composite-item";
import { RadioState } from "./radio-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a radio button element.
 * @see https://ariakit.org/components/radio
 * @example
 * ```jsx
 * const state = useRadioState();
 * const props = useRadio({ state, value: "Apple" });
 * <RadioGroup state={state}>
 *   <Role as="input" {...props} />
 *   <Radio value="Orange" />
 * </RadioGroup>
 * ```
 */
export declare const useRadio: import("ariakit-utils/types").Hook<RadioOptions<"input">>;
/**
 * A component that renders a radio button element.
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
export declare const Radio: import("ariakit-utils/types").Component<RadioOptions<"input">>;
export declare type RadioOptions<T extends As = "input"> = Omit<CompositeItemOptions<T>, "state"> & {
    /**
     * Object returned by the `useRadioState` hook. If not provided, the parent
     * `RadioGroup` component's context will be used.
     */
    state?: RadioState;
    /**
     * The value of the radio button.
     */
    value: string | number;
    /**
     * Whether the radio button is checked.
     */
    checked?: boolean;
    /**
     * Callback function that is called when the radio button state changes.
     */
    onChange?: BivariantCallback<(event: SyntheticEvent<HTMLInputElement>) => void>;
};
export declare type RadioProps<T extends As = "input"> = Props<RadioOptions<T>>;
