import { As, Props } from "ariakit-utils/types";
import { ButtonOptions } from "../button";
import { FormState } from "./form-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a submit buttom in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState();
 * const props = useFormSubmit({ state });
 * <Form state={state}>
 *   <Role {...props}>Submit</Role>
 * </Form>
 * ```
 */
export declare const useFormSubmit: import("ariakit-utils/types").Hook<FormSubmitOptions<"button">>;
/**
 * A component that renders a submit buttom in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState();
 * <Form state={form}>
 *   <FormSubmit>Submit</FormSubmit>
 * </Form>
 * ```
 */
export declare const FormSubmit: import("ariakit-utils/types").Component<FormSubmitOptions<"button">>;
export declare type FormSubmitOptions<T extends As = "button"> = ButtonOptions<T> & {
    /**
     * Object returned by the `useFormState` hook. If not provided, the parent
     * `Form` component's context will be used.
     */
    state?: FormState;
};
export declare type FormSubmitProps<T extends As = "button"> = Props<FormSubmitOptions<T>>;
