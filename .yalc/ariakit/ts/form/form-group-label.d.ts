import { As, Props } from "ariakit-utils/types";
import { GroupLabelOptions } from "../group";
import { FormState } from "./form-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a form group. This hook must be used
 * in a component that's wrapped with `FormGroup` so the `aria-labelledby` prop
 * is properly set on the form group element.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * // This component must be wrapped with FormGroup
 * const props = useFormGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */
export declare const useFormGroupLabel: import("ariakit-utils/types").Hook<FormGroupLabelOptions<"div">>;
/**
 * A component that renders a label in a form group. This component must be
 * wrapped with `FormGroup` so the `aria-labelledby` prop is properly set on the
 * form group element.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({
 *   defaultValues: {
 *     username: "",
 *     email: "",
 *   },
 * });
 * <Form state={form}>
 *   <FormGroup>
 *     <FormGroupLabel>Account</FormGroupLabel>
 *     <FormLabel name={form.names.username}>Username</FormLabel>
 *     <FormInput name={form.names.username} />
 *     <FormLabel name={form.names.email}>Email</FormLabel>
 *     <FormInput name={form.names.email} />
 *   </FormGroup>
 * </Form>
 * ```
 */
export declare const FormGroupLabel: import("ariakit-utils/types").Component<FormGroupLabelOptions<"div">>;
export declare type FormGroupLabelOptions<T extends As = "div"> = GroupLabelOptions<T> & {
    /**
     * Object returned by the `useFormState` hook. If not provided, the parent
     * `Form` component's context will be used.
     */
    state?: FormState;
};
export declare type FormGroupLabelProps<T extends As = "div"> = Props<FormGroupLabelOptions<T>>;
