import { SetStateAction } from "react";
import { AnyObject, SetState } from "ariakit-utils/types";
import { CollectionState, CollectionStateProps } from "../collection/collection-state";
import { DeepMap, DeepPartial, Names, StringLike } from "./__utils";
declare type ErrorMessage = string | undefined | null;
declare type Callback = () => void | Promise<void>;
declare type Item = CollectionState["items"][number] & {
    type: "field" | "label" | "description" | "error" | "button";
    name: string;
    id?: string;
};
/**
 * Provides state for the `Form` component.
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { email: "" } });
 * <Form state={form}>
 *   <FormLabel name={form.names.email}>Email</FormLabel>
 *   <FormInput name={form.names.email} />
 *   <FormError name={form.names.email} />
 *   <FormSubmit>Submit</FormSubmit>
 * </Form>
 * ```
 */
export declare function useFormState<V = AnyObject>(props?: FormStateProps<V>): FormState<V>;
export declare type FormState<V = AnyObject> = CollectionState<Item> & {
    /**
     * Form values.
     */
    values: V;
    /**
     * Sets the `values` state.
     * @example
     * const form = useFormState({ defaultValues: { name: "John" } });
     * // Inside an effect or event callback.
     * form.setValues({ name: "Jane" });
     * form.setValues((prevValues) => ({ ...prevValues, name: "John" }));
     */
    setValues: SetState<FormState<V>["values"]>;
    /**
     * Retrieves a field value.
     * @example
     * const form = useFormState({ defaultValues: { firstName: "John" } });
     * form.getValue(form.names.firstName); // "John"
     */
    getValue: <T = any>(name: StringLike) => T;
    /**
     * Sets a field value.
     * @example
     * const form = useFormState({ defaultValues: { firstName: "John" } });
     * // Inside an effect or event callback.
     * form.setValue(form.names.firstName, "Jane");
     * form.setValue(form.names.firstName, (prevValue) => `${prevValue} Doe`);
     */
    setValue: <T>(name: StringLike, value: SetStateAction<T>) => void;
    /**
     * Pushes a value to an array field.
     * @example
     * const form = useFormState({ defaultValues: { tags: [] } });
     * // Inside an effect or event callback.
     * form.pushValue(form.names.tags, "tag");
     */
    pushValue: <T>(name: StringLike, value: T) => void;
    /**
     * Removes a value from an array field.
     * @example
     * const form = useFormState({ defaultValues: { tags: ["tag"] } });
     * // Inside an effect or event callback.
     * form.removeValue(form.names.tags, 0);
     */
    removeValue: (name: StringLike, index: number) => void;
    /**
     * Form errors.
     */
    errors: DeepPartial<DeepMap<V, ErrorMessage>>;
    /**
     * Sets the `errors` state.
     * @example
     * const form = useFormState({ defaultValues: { name: "" } });
     * // Inside an effect or event callback.
     * form.setErrors({ name: "Name is required" });
     */
    setErrors: SetState<FormState<V>["errors"]>;
    /**
     * Retrieves a field error.
     * @example
     * const form = useFormState({ defaultValues: { email: "" } });
     * form.getError(form.names.email); // undefined
     */
    getError: (name: StringLike) => ErrorMessage;
    /**
     * Sets a field error.
     * @example
     * const form = useFormState({ defaultValues: { email: "" } });
     * form.useValidate(() => {
     *   if (!form.getValue(form.names.email)) {
     *     form.setError(form.names.email, "Email is required");
     *   }
     * });
     */
    setError: (name: StringLike, error: SetStateAction<ErrorMessage>) => void;
    /**
     * The touched state of the form.
     */
    touched: DeepPartial<DeepMap<V, boolean>>;
    /**
     * Sets the `touched` state.
     * @example
     * const form = useFormState({ defaultValues: { name: "" } });
     * // Inside an effect or event callback.
     * form.setTouched({ name: true });
     */
    setTouched: SetState<FormState<V>["touched"]>;
    /**
     * Retrieves a field touched state.
     * @example
     * const form = useFormState({ defaultValues: { email: "" } });
     * form.getFieldTouched(form.names.email); // false
     */
    getFieldTouched: (name: StringLike) => boolean;
    /**
     * Sets a field touched state.
     * @example
     * const form = useFormState({ defaultValues: { email: "" } });
     * // Inside an effect or event callback.
     * form.setFieldTouched(form.names.email, true);
     * form.setFieldTouched(form.names.email, (prevTouched) => !prevTouched);
     */
    setFieldTouched: (name: StringLike, value: SetStateAction<boolean>) => void;
    /**
     * An object containing the names of the form fields.
     * @example
     * const form = useFormState({
     *   defaultValues: { name: { first: "", last: "" } },
     * });
     * form.names.name; // "name"
     * form.names.name.first; // "name.first"
     * form.names.name.last; // "name.last"
     */
    names: Names<V>;
    /**
     * Whether the form is valid.
     * @example
     * const form = useFormState({ defaultValues: { name: "" } });
     * form.valid; // true
     * // Inside an effect or event callback.
     * form.setError(form.names.name, "Name is required");
     * // On the next render.
     * form.valid; // false
     */
    valid: boolean;
    /**
     * Whether the form is validating.
     * @example
     * const form = useFormState({ defaultValues: { name: "" } });
     * form.validating; // false
     * // Inside an effect or event callback.
     * form.validate();
     * // On the next render.
     * form.validating; // true
     * // On the next render.
     * form.validating; // false
     */
    validating: boolean;
    /**
     * Validates the form by running all validation callbacks passed to
     * `form.useValidate`.
     * @example
     * const form = useFormState({ defaultValues: { name: "" } });
     * // Inside an effect or event callback.
     * if (await form.validate()) {
     *   // Form is valid.
     * }
     */
    validate: () => Promise<boolean>;
    /**
     * Custom hook that accepts a callback that will be used to validate the form
     * when `form.validate` is called.
     * @example
     * const form = useFormState({ defaultValues: { name: "" } });
     * form.useValidate(async () => {
     *   const errors = await api.validate(form.values);
     *   if (errors) {
     *     form.setErrors(errors);
     *   }
     * });
     */
    useValidate: (callback: Callback) => void;
    /**
     * Whether the form is submitting.
     * @example
     * const form = useFormState({ defaultValues: { name: "" } });
     * form.submitting; // false
     * // Inside an effect or event callback.
     * form.submit();
     * // On the next render.
     * form.submitting; // true
     * // On the next render.
     * form.submitting; // false
     */
    submitting: boolean;
    /**
     * The number of times `form.submit` has been called with a successful
     * response.
     */
    submitSucceed: number;
    /**
     * The number of times `form.submit` has been called with an error response.
     */
    submitFailed: number;
    /**
     * Submits the form by running all submit callbacks passed to
     * `form.useSubmit`. This also triggers validation.
     * @example
     * const form = useFormState({ defaultValues: { name: "" } });
     * // Inside an effect or event callback.
     * if (await form.submit()) {
     *   // Form is submitted.
     * }
     */
    submit: () => Promise<boolean>;
    /**
     * Custom hook that accepts a callback that will be used to submit the form
     * when `form.submit` is called.
     * @example
     * const form = useFormState({ defaultValues: { name: "" } });
     * form.useSubmit(async () => {
     *   try {
     *     await api.submit(form.values);
     *   } catch (errors) {
     *     form.setErrors(errors);
     *   }
     * });
     */
    useSubmit: (callback: Callback) => void;
    /**
     * Resets the form to its default values.
     */
    reset: () => void;
};
export declare type FormStateProps<V = AnyObject> = CollectionStateProps<Item> & Partial<Pick<FormState<V>, "values" | "errors" | "touched">> & {
    /**
     * The default values of the form.
     */
    defaultValues?: V;
    /**
     * The default errors of the form.
     */
    defaultErrors?: FormState<V>["errors"];
    /**
     * The default touched state of the form.
     */
    defaultTouched?: FormState<V>["touched"];
    /**
     * Function that will be called when setting the form `values` state.
     * @example
     * // Uncontrolled example
     * useFormState({ setValues: (values) => console.log(values) });
     * @example
     * // Controlled example
     * const [values, setValues] = useState({});
     * useFormState({ values, setValues });
     * @example
     * // Externally controlled example
     * function MyForm({ values, onChange }) {
     *   const form = useFormState({ values, setValues: onChange });
     * }
     */
    setValues?: (values: FormState<V>["values"]) => void;
    /**
     * Function that will be called when setting the form `errors` state.
     * @example
     * useFormState({ setErrors: (errors) => console.log(errors) });
     */
    setErrors?: (errors: FormState<V>["errors"]) => void;
    /**
     * Function that will be called when setting the form `touched` state.
     * @example
     * useFormState({ setTouched: (touched) => console.log(touched) });
     */
    setTouched?: (touched: FormState<V>["touched"]) => void;
};
export {};
