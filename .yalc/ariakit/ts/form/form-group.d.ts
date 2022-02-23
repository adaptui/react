import { As, Props } from "ariakit-utils/types";
import { GroupOptions } from "../group";
import { FormState } from "./form-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a form group.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState();
 * const props = useFormGroup({ state });
 * <Form state={state}>
 *   <Role {...props}>
 *     <FormGroupLabel>Label</FormGroupLabel>
 *   </Role>
 * </Form>
 * ```
 */
export declare const useFormGroup: import("ariakit-utils/types").Hook<FormGroupOptions<"div">>;
/**
 * A component that renders a form group.
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
export declare const FormGroup: import("ariakit-utils/types").Component<FormGroupOptions<"div">>;
export declare type FormGroupOptions<T extends As = "div"> = GroupOptions<T> & {
    /**
     * Object returned by the `useFormState` hook. If not provided, the parent
     * `Form` component's context will be used.
     */
    state?: FormState;
};
export declare type FormGroupProps<T extends As = "div"> = Props<FormGroupOptions<T>>;
