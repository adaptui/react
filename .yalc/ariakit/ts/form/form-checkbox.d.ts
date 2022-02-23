import { As, Props } from "ariakit-utils/types";
import { CheckboxOptions } from "../checkbox";
import { FormFieldOptions } from "./form-field";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a checkbox as a form field.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { acceptTerms: false } });
 * const props = useFormCheckbox({ state, name: state.names.acceptTerms });
 * <Form state={state}>
 *   <label>
 *     <Role {...props} />
 *     Accept terms
 *   </label>
 * </Form>
 * ```
 */
export declare const useFormCheckbox: import("ariakit-utils/types").Hook<FormCheckboxOptions<"input">>;
/**
 * A component that renders a checkbox as a form field.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { acceptTerms: false } });
 * <Form state={form}>
 *   <label>
 *     <FormCheckbox name={form.names.acceptTerms} />
 *     Accept terms
 *   </label>
 * </Form>
 * ```
 */
export declare const FormCheckbox: import("ariakit-utils/types").Component<FormCheckboxOptions<"input">>;
export declare type FormCheckboxOptions<T extends As = "input"> = FormFieldOptions<T> & Omit<CheckboxOptions<T>, "state">;
export declare type FormCheckboxProps<T extends As = "input"> = Props<FormCheckboxOptions<T>>;
