import { ChangeEvent } from "react";
import { As, Props } from "ariakit-utils/types";
import { CommandOptions } from "../command/command";
import { CheckboxState } from "./checkbox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component. If the element is not a native checkbox, the hook will
 * return additional props to make sure it's accessible.
 * @see https://ariakit.org/components/checkbox
 * @example
 * ```jsx
 * const props = useCheckbox({ as: "div" });
 * <Role {...props}>Accessible checkbox</Role>
 * ```
 */
export declare const useCheckbox: import("ariakit-utils/types").Hook<CheckboxOptions<"input">>;
/**
 * A component that renders a native accessible checkbox. If another element is
 * passed to the `as` prop, this component will make sure the rendered element is
 * accessible.
 * @see https://ariakit.org/components/checkbox
 * @example
 * ```jsx
 * <Checkbox as="div">Accessible checkbox</Checkbox>
 * ```
 */
export declare const Checkbox: import("ariakit-utils/types").Component<CheckboxOptions<"input">>;
export declare type CheckboxOptions<T extends As = "input"> = CommandOptions<T> & {
    /**
     * Object returned by the `useCheckboxState` hook. If not provided, the
     * internal state will be used.
     */
    state?: CheckboxState;
    /**
     * The value of the checkbox. This is useful when the same checkbox state is
     * used for multiple `Checkbox` elements, in which case the value will be an
     * array of checked values.
     * @example
     * ```jsx
     * const checkbox = useCheckboxState({ defaultValue: ["Apple", "Orange"] });
     * <Checkbox state={checkbox} value="Apple" />
     * <Checkbox state={checkbox} value="Orange" />
     * <Checkbox state={checkbox} value="Watermelon" />
     * ```
     */
    value?: string | number;
    /**
     * The `checked` state of the checkbox. This will override the value inferred
     * from `state` prop, if provided.
     */
    checked?: "mixed" | boolean;
    /**
     * The default `checked` state of the checkbox.
     */
    defaultChecked?: "mixed" | boolean;
    /**
     * A function that is called when the checkbox's `checked` state changes.
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};
export declare type CheckboxProps<T extends As = "input"> = Props<CheckboxOptions<T>>;
