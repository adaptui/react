import { As, Props } from "ariakit-utils/types";
import { CollectionItemOptions } from "../collection/collection-item";
import { StringLike } from "./__utils";
import { FormState } from "./form-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that displays an error message. The
 * `children` will be automatically set to the error message set on the state.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { email: "" } });
 * const props = useFormError({ state, name: state.names.email });
 *
 * state.useValidate(() => {
 *   if (!state.values.email) {
 *     state.setError(state.names.email, "Email is required!");
 *   }
 * });
 *
 * <Form state={state}>
 *   <FormLabel name={state.names.email}>Email</FormLabel>
 *   <FormInput name={state.names.email} />
 *   <Role {...props} />
 * </Form>
 * ```
 */
export declare const useFormError: import("ariakit-utils/types").Hook<FormErrorOptions<"div">>;
/**
 * A component that renders an element that displays an error message. The
 * `children` will be automatically set to the error message set on the state.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { email: "" } });
 *
 * form.useValidate(() => {
 *   if (!form.values.email) {
 *     form.setError(form.names.email, "Email is required!");
 *   }
 * });
 *
 * <Form state={form}>
 *   <FormLabel name={form.names.email}>Email</FormLabel>
 *   <FormInput name={form.names.email} />
 *   <FormError name={form.names.email} />
 * </Form>
 * ```
 */
export declare const FormError: import("ariakit-utils/types").Component<FormErrorOptions<"div">>;
export declare type FormErrorOptions<T extends As = "div"> = Omit<CollectionItemOptions<T>, "state"> & {
    /**
     * Object returned by the `useFormState` hook. If not provided, the parent
     * `Form` component's context will be used.
     */
    state?: FormState;
    /**
     * Name of the field.
     */
    name: StringLike;
};
export declare type FormErrorProps<T extends As = "div"> = Props<FormErrorOptions<T>>;
