import { As, Props } from "ariakit-utils/types";
import { ButtonOptions } from "../button";
import { CollectionItemOptions } from "../collection/collection-item";
import { StringLike } from "./__utils";
import { FormState } from "./form-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that will push items to an array field
 * in the form when clicked.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({
 *   defaultValues: {
 *     languages: ["JavaScript", "PHP"],
 *   },
 * });
 * const props = useFormPush({
 *   state,
 *   name: state.names.languages,
 *   value: "",
 * });
 * <Form state={state}>
 *   {state.values.languages.map((_, i) => (
 *     <FormInput key={i} name={state.names.languages[i]} />
 *   ))}
 *   <Role {...props}>Add new language</Role>
 * </Form>
 * ```
 */
export declare const useFormPush: import("ariakit-utils/types").Hook<FormPushOptions<"button">>;
/**
 * A component that renders a button that will push items to an array value in
 * the form state when clicked.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({
 *   defaultValues: {
 *     languages: ["JavaScript", "PHP"],
 *   },
 * });
 * <Form state={form}>
 *   {form.values.languages.map((_, i) => (
 *     <FormInput key={i} name={form.names.languages[i]} />
 *   ))}
 *   <FormPush name={form.names.languages} value="">
 *     Add new language
 *   </FormPush>
 * </Form>
 * ```
 */
export declare const FormPush: import("ariakit-utils/types").Component<FormPushOptions<"button">>;
export declare type FormPushOptions<T extends As = "button"> = ButtonOptions<T> & Omit<CollectionItemOptions<T>, "state"> & {
    /**
     * Object returned by the `useFormState` hook. If not provided, the parent
     * `Form` component's context will be used.
     */
    state?: FormState;
    /**
     * Name of the array field.
     */
    name: StringLike;
    /**
     * Value that will be initially set to the item when it is pushed.
     */
    value: unknown;
    /**
     * Whether the newly added input should be automatically focused when the
     * button is clicked.
     * @default true
     */
    autoFocusOnClick?: boolean;
};
export declare type FormPushProps<T extends As = "button"> = Props<FormPushOptions<T>>;
