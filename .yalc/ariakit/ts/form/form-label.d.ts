import { As, Props } from "ariakit-utils/types";
import { CollectionItemOptions } from "../collection/collection-item";
import { StringLike } from "./__utils";
import { FormState } from "./form-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label for a form field. If the field is not a
 * native input, select or textarea element, the hook will return props to
 * render a `span` element. Instead of relying on the `htmlFor` prop, it'll rely
 * on the `aria-labelledby` attribute on the form field. Clicking on the label
 * will move focus to the field even if it's not a native input.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { email: "" } });
 * const props = useFormLabel({ state, name: state.names.email });
 * <Form state={state}>
 *   <Role {...props}>Email</Role>
 *   <FormInput name={state.names.email} />
 * </Form>
 * ```
 */
export declare const useFormLabel: import("ariakit-utils/types").Hook<FormLabelOptions<"label">>;
/**
 * A component that renders a label for a form field. If the field is not a
 * native input, select or textarea element, the component will render a `span`
 * element. Instead of relying on the `htmlFor` prop, it'll rely on the
 * `aria-labelledby` attribute on the form field. Clicking on the label will
 * move focus to the field even if it's not a native input.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { email: "" } });
 * <Form state={form}>
 *   <FormLabel name={form.names.email}>Email</Role>
 *   <FormInput name={form.names.email} />
 * </Form>
 * ```
 */
export declare const FormLabel: import("ariakit-utils/types").Component<FormLabelOptions<"label">>;
export declare type FormLabelOptions<T extends As = "label"> = Omit<CollectionItemOptions<T>, "state"> & {
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
export declare type FormLabelProps<T extends As = "label"> = Props<FormLabelOptions<T>>;
