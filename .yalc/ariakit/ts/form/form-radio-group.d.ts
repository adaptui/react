import { As, Props } from "ariakit-utils/types";
import { FormGroupOptions } from "./form-group";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a radio group in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { color: "red" } });
 * const props = useFormRadioGroup({ state });
 * <Form state={state}>
 *   <Role {...props}>
 *     <FormGroupLabel>Favorite color</FormGroupLabel>
 *     <FormRadio name={state.names.color} value="red" />
 *     <FormRadio name={state.names.color} value="blue" />
 *     <FormRadio name={state.names.color} value="green" />
 *   </Role>
 * </Form>
 * ```
 */
export declare const useFormRadioGroup: import("ariakit-utils/types").Hook<FormRadioGroupOptions<"div">>;
/**
 * A component that renders a radio group in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { color: "red" } });
 * <Form state={form}>
 *   <FormRadioGroup>
 *     <FormGroupLabel>Favorite color</FormGroupLabel>
 *     <FormRadio name={form.names.color} value="red" />
 *     <FormRadio name={form.names.color} value="blue" />
 *     <FormRadio name={form.names.color} value="green" />
 *   </FormRadioGroup>
 * </Form>
 * ```
 */
export declare const FormRadioGroup: import("ariakit-utils/types").Component<FormRadioGroupOptions<"div">>;
export declare type FormRadioGroupOptions<T extends As = "div"> = FormGroupOptions<T>;
export declare type FormRadioGroupProps<T extends As = "div"> = Props<FormRadioGroupOptions<T>>;
