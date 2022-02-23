import { As, Options, Props } from "ariakit-utils/types";
import { FormState } from "./form-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a form element.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState();
 * const props = useForm({ state, as: "form" });
 * <Role {...props} />
 * ```
 */
export declare const useForm: import("ariakit-utils/types").Hook<FormOptions<"form">>;
/**
 * A component that renders a form element.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { username: "johndoe" } });
 * <Form state={form}>
 *   <FormLabel name={form.names.username}>Username</FormLabel>
 *   <FormInput name={form.names.username} />
 * </Form>
 * ```
 */
export declare const Form: import("ariakit-utils/types").Component<FormOptions<"form">>;
export declare type FormOptions<T extends As = "form"> = Options<T> & {
    /**
     * Object returned by the `useFormState` hook.
     */
    state: FormState;
    /**
     * Whether the form should trigger the validation callbacks when values
     * change.
     * @default true
     */
    validateOnChange?: boolean;
    /**
     * Whether the form should trigger the validation callbacks when form fields
     * are blurred.
     * @default true
     */
    validateOnBlur?: boolean;
    /**
     * Whether the form state should be reset when the form element gets
     * unmounted.
     * @default false
     */
    resetOnUnmount?: boolean;
    /**
     * Whether the form state should be reset when the form gets successfully
     * submitted.
     * @default true
     */
    resetOnSubmit?: boolean;
    /**
     * Whether the form should automatically focus the first invalid field when
     * the form gets submitted.
     * @default true
     */
    autoFocusOnSubmit?: boolean;
};
export declare type FormProps<T extends As = "form"> = Props<FormOptions<T>>;
