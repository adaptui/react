import { As, Props } from "ariakit-utils/types";
import { FocusableOptions } from "../focusable";
import { FormFieldOptions } from "./form-field";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a form input. Unline `useFormField`, this hook
 * returns the `value` and `onChange` props that can be passed to a native
 * input, select or textarea elements.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { email: "" } });
 * const props = useFormInput({ state, name: state.names.email });
 * <Form state={state}>
 *   <FormLabel name={state.names.email}>Email</FormLabel>
 *   <Role as="input" {...props} />
 * </Form>
 * ```
 */
export declare const useFormInput: import("ariakit-utils/types").Hook<FormInputOptions<"input">>;
/**
 * A component that renders a form input. Unline `FormField`, this component
 * passes the `value` and `onChange` props down to the underlying element that
 * can be a native input, select or textarea elements.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { email: "" } });
 * <Form state={form}>
 *   <FormLabel name={form.names.email}>Email</FormLabel>
 *   <FormInput name={form.names.email} />
 * </Form>
 * ```
 */
export declare const FormInput: import("ariakit-utils/types").Component<FormInputOptions<"input">>;
export declare type FormInputOptions<T extends As = "input"> = FocusableOptions<T> & FormFieldOptions<T>;
export declare type FormInputProps<T extends As = "input"> = Props<FormInputOptions<T>>;
