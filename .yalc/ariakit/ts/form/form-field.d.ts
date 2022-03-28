import { FocusEvent } from "react";
import { As, BooleanOrCallback, Props } from "ariakit-utils/types";
import { CollectionItemOptions } from "../collection/collection-item";
import { StringLike } from "./__utils";
import { FormState } from "./form-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a form field. Unlike `useFormInput`, this hook
 * doesn't automatically returns the `value` and `onChange` props. This is so we
 * can use it not only for native form elements but also for custom components
 * whose value is not controlled by the native `value` and `onChange` props.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { content: "" } });
 * const props = useFormField({ state, name: state.names.content });
 *
 * const setValue = useCallback((value) => {
 *   state.setValue(state.names.content, value);
 * }, [state.setValue, state.names.content]);
 *
 * <Form state={state}>
 *   <FormLabel name={state.names.content}>Content</FormLabel>
 *   <Role
 *     {...props}
 *     as={Editor}
 *     value={state.values.content}
 *     onChange={setValue}
 *   />
 * </Form>
 * ```
 */
export declare const useFormField: import("ariakit-utils/types").Hook<FormFieldOptions<"input">>;
/**
 * A component that renders a form field. Unlike `FormInput`, this component
 * doesn't automatically pass the `value` and `onChange` props down to the
 * underlying element. This is so we can use it not only for native form
 * elements but also for custom components whose value is not controlled by the
 * native `value` and `onChange` props.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { content: "" } });
 *
 * const setValue = useCallback((value) => {
 *   form.setValue(form.names.content, value);
 * }, [form.setValue, form.names.content]);
 *
 * <Form state={form}>
 *   <FormLabel name={form.names.content}>Content</FormLabel>
 *   <FormField
 *     {...props}
 *     as={Editor}
 *     value={form.values.content}
 *     onChange={setValue}
 *   />
 * </Form>
 * ```
 */
export declare const FormField: import("ariakit-utils/types").Component<FormFieldOptions<"input">>;
export declare type FormFieldOptions<T extends As = "input"> = Omit<CollectionItemOptions<T>, "state"> & {
    /**
     * Object returned by the `useFormState` hook. If not provided, the parent
     * `Form` component's context will be used.
     */
    state?: FormState;
    /**
     * Name of the field.
     */
    name: StringLike;
    /**
     * Whether the field should be marked touched on blur.
     * @default true
     */
    touchOnBlur?: BooleanOrCallback<FocusEvent>;
};
export declare type FormFieldProps<T extends As = "input"> = Props<FormFieldOptions<T>>;
