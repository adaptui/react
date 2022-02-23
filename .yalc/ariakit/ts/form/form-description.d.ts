import { As, Props } from "ariakit-utils/types";
import { CollectionItemOptions } from "../collection/collection-item";
import { StringLike } from "./__utils";
import { FormState } from "./form-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a description element for a form field.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { password: "" } });
 * const props = useFormDescription({ state, name: state.names.password });
 * <Form state={state}>
 *   <FormLabel name={state.names.password}>Password</FormLabel>
 *   <FormInput name={state.names.password} type="password" />
 *   <Role {...props}>Password with at least 8 characters.</Role>
 * </Form>
 * ```
 */
export declare const useFormDescription: import("ariakit-utils/types").Hook<FormDescriptionOptions<"div">>;
/**
 * A component that renders a description element for a form field.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { password: "" } });
 * <Form state={form}>
 *   <FormLabel name={form.names.password}>Password</FormLabel>
 *   <FormInput name={form.names.password} type="password" />
 *   <FormDescription name={form.names.password}>
 *     Password with at least 8 characters.
 *   </FormDescription>
 * </Form>
 * ```
 */
export declare const FormDescription: import("ariakit-utils/types").Component<FormDescriptionOptions<"div">>;
export declare type FormDescriptionOptions<T extends As = "div"> = Omit<CollectionItemOptions<T>, "state"> & {
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
export declare type FormDescriptionProps<T extends As = "div"> = Props<FormDescriptionOptions<T>>;
