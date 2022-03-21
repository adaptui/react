import { As, Props } from "ariakit-utils/types";
import { ButtonOptions } from "../button";
import { FormState } from "./form-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a reset buttom in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState();
 * const props = useFormReset({ state });
 * <Form state={state}>
 *   <Role {...props}>Reset</Role>
 * </Form>
 * ```
 */
export declare const useFormReset: import("ariakit-utils/types").Hook<FormResetOptions<"button">>;
/**
 * A component that renders a reset buttom in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState();
 * <Form state={form}>
 *   <FormReset>Reset</FormReset>
 * </Form>
 * ```
 */
export declare const FormReset: import("ariakit-utils/types").Component<FormResetOptions<"button">>;
export declare type FormResetOptions<T extends As = "button"> = ButtonOptions<T> & {
    /**
     * Object returned by the `useFormState` hook. If not provided, the parent
     * `Form` component's context will be used.
     */
    state?: FormState;
};
export declare type FormResetProps<T extends As = "button"> = Props<FormResetOptions<T>>;
