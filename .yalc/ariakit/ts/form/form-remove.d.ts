import { As, Props } from "ariakit-utils/types";
import { ButtonOptions } from "../button";
import { StringLike } from "./__utils";
import { FormState } from "./form-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that will remove an item from an array
 * field in the form when clicked.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({
 *   defaultValues: {
 *     languages: ["JavaScript", "PHP"],
 *   },
 * });
 * const props = useFormRemove({
 *   state,
 *   name: state.names.languages,
 *   index: 0,
 * });
 * <Form state={state}>
 *   {state.values.languages.map((_, i) => (
 *     <FormInput key={i} name={state.names.languages[i]} />
 *   ))}
 *   <Role {...props}>Remove first language</Role>
 * </Form>
 * ```
 */
export declare const useFormRemove: import("ariakit-utils/types").Hook<FormRemoveOptions<"button">>;
/**
 * A component that renders a button that will remove an item from an array
 * field in the form when clicked.
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
 *     <div key={i}>
 *       <FormInput name={form.names.languages[i]} />
 *       <FormRemove name={form.names.languages} index={i} />
 *     </div>
 *   ))}
 * </Form>
 * ```
 */
export declare const FormRemove: import("ariakit-utils/types").Component<FormRemoveOptions<"button">>;
export declare type FormRemoveOptions<T extends As = "button"> = ButtonOptions<T> & {
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
     * Index of the item to remove.
     */
    index: number;
    /**
     * Whether the focus should be moved to the next or previous field when the
     * button is clicked.
     * @default true
     */
    autoFocusOnClick?: boolean;
};
export declare type FormRemoveProps<T extends As = "button"> = Props<FormRemoveOptions<T>>;
