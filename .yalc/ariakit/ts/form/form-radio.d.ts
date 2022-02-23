import { As, Props } from "ariakit-utils/types";
import { RadioOptions } from "../radio/radio";
import { FormFieldOptions } from "./form-field";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a radio button in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { char: "a" } });
 * const a = useFormRadio({ state, name: state.names.char, value: "a" });
 * const b = useFormRadio({ state, name: state.names.char, value: "b" });
 * const c = useFormRadio({ state, name: state.names.char, value: "c" });
 * <Form state={state}>
 *   <FormRadioGroup>
 *     <FormGroupLabel>Favorite character</FormGroupLabel>
 *     <Role {...a} />
 *     <Role {...b} />
 *     <Role {...c} />
 *   </FormRadioGroup>
 * </Form>
 * ```
 */
export declare const useFormRadio: import("ariakit-utils/types").Hook<FormRadioOptions<"input">>;
/**
 * A component that renders a radio button in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { char: "a" } });
 * <Form state={form}>
 *   <FormRadioGroup>
 *     <FormGroupLabel>Favorite character</FormGroupLabel>
 *     <FormRadio name={form.names.char} value="a" />
 *     <FormRadio name={form.names.char} value="b" />
 *     <FormRadio name={form.names.char} value="c" />
 *   </FormRadioGroup>
 * </Form>
 * ```
 */
export declare const FormRadio: import("ariakit-utils/types").Component<FormRadioOptions<"input">>;
export declare type FormRadioOptions<T extends As = "input"> = FormFieldOptions<T> & Omit<RadioOptions<T>, "state">;
export declare type FormRadioProps<T extends As = "input"> = Props<FormRadioOptions<T>>;
