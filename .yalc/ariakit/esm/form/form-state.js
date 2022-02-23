import { useState, useMemo, useCallback } from 'react';
import { useInitialValue, useControlledState, useLazyRef, useSafeLayoutEffect, useLiveRef } from 'ariakit-utils/hooks';
import { applyState } from 'ariakit-utils/misc';
import { useStorePublisher } from 'ariakit-utils/store';
import { useCollectionState } from '../collection/collection-state.js';
import { h as hasMessages, c as createNames, g as get, s as set, a as setAll } from '../__utils-6eda8bb9.js';

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
function useFormState(props) {
  if (props === void 0) {
    props = {};
  }

  const collection = useCollectionState(props);
  const defaultValues = useInitialValue(props.defaultValues || {});
  const [values, setValues] = useControlledState(defaultValues, props.values, props.setValues);
  const defaultErrors = useInitialValue(props.defaultErrors || {});
  const [errors, setErrors] = useControlledState(defaultErrors, props.errors, props.setErrors);
  const defaultTouched = useInitialValue(props.defaultTouched || {});
  const [touched, setTouched] = useControlledState(defaultTouched, props.touched, props.setTouched);
  const [validating, setValidating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSucceed, setSubmitSucceed] = useState(0);
  const [submitFailed, setSubmitFailed] = useState(0);
  const valid = useMemo(() => !hasMessages(errors), [errors]);
  const names = useLazyRef(createNames);
  const submitCallbacks = useLazyRef(() => new Set());
  const validateCallbacks = useLazyRef(() => new Set());
  const getValue = useCallback(name => get(values, name), [values]);
  const setValue = useCallback((name, value) => setValues(prevValues => {
    const prevValue = get(prevValues, name);
    const nextValue = applyState(value, prevValue);
    if (nextValue === prevValue) return prevValues;
    return set(prevValues, name, nextValue);
  }), []);
  const pushValue = useCallback((name, value) => {
    setValues(prevValues => {
      const array = get(prevValues, name, []);
      return set(prevValues, name, [...array, value]);
    });
  }, []);
  const removeValue = useCallback((name, index) => {
    setValues(prevValues => {
      const array = get(prevValues, name, []);
      return set(prevValues, name, [...array.slice(0, index), null, ...array.slice(index + 1)]);
    });
  }, []);
  const getError = useCallback(name => get(errors, name), [errors]);
  const setError = useCallback((name, error) => setErrors(prevErrors => {
    const prevError = get(prevErrors, name);
    const nextError = applyState(error, prevError);
    if (nextError === prevError) return prevErrors;
    return set(prevErrors, name, nextError);
  }), []);
  const getFieldTouched = useCallback(name => !!get(touched, name), [touched]);
  const setFieldTouched = useCallback((name, value) => setTouched(prevTouched => {
    const prevValue = get(prevTouched, name);
    const nextValue = applyState(value, prevValue);
    if (nextValue === prevValue) return prevTouched;
    return set(prevTouched, name, nextValue);
  }), []);
  const useValidate = useCallback(callback => {
    useSafeLayoutEffect(() => {
      validateCallbacks.add(callback);
      return () => {
        validateCallbacks.delete(callback);
      };
    }, [callback]);
  }, []);
  const useSubmit = useCallback(callback => {
    useSafeLayoutEffect(() => {
      submitCallbacks.add(callback);
      return () => {
        submitCallbacks.delete(callback);
      };
    }, [callback]);
  }, []);
  const errorsRef = useLiveRef(errors);
  const validate = useCallback(async () => {
    setValidating(true);
    setErrors(defaultErrors);

    try {
      const callbacks = [...validateCallbacks];
      const results = callbacks.map(callback => callback());
      await Promise.all(results);
      return !hasMessages(errorsRef.current);
    } finally {
      setValidating(false);
    }
  }, [defaultErrors]);
  const valuesRef = useLiveRef(values);
  const submit = useCallback(async () => {
    setSubmitting(true);
    setTouched(setAll(valuesRef.current, true));

    try {
      if (await validate()) {
        const callbacks = [...submitCallbacks];
        const results = callbacks.map(callback => callback());
        await Promise.all(results);

        if (!hasMessages(errorsRef.current)) {
          setSubmitSucceed(value => value + 1);
          return true;
        }
      }

      setSubmitFailed(value => value + 1);
      return false;
    } catch (error) {
      setSubmitFailed(value => value + 1);
      throw error;
    } finally {
      setSubmitting(false);
    }
  }, [validate]);
  const reset = useCallback(() => {
    setValues(defaultValues);
    setErrors(defaultErrors);
    setTouched(defaultTouched);
    setValidating(false);
    setSubmitting(false);
    setSubmitSucceed(0);
    setSubmitFailed(0);
  }, [defaultValues, defaultErrors, defaultTouched]);
  const state = useMemo(() => ({ ...collection,
    values,
    setValues,
    errors,
    setErrors,
    touched,
    setTouched,
    validating,
    submitting,
    submitSucceed,
    submitFailed,
    valid,
    names,
    getValue,
    setValue,
    pushValue,
    removeValue,
    getError,
    setError,
    getFieldTouched,
    setFieldTouched,
    useValidate,
    useSubmit,
    validate,
    submit,
    reset
  }), [collection, values, setValues, errors, setErrors, touched, setTouched, validating, submitting, submitSucceed, submitFailed, valid, names, getValue, setValue, pushValue, removeValue, getError, setError, getFieldTouched, setFieldTouched, useValidate, useSubmit, validate, submit, reset]);
  return useStorePublisher(state);
}

export { useFormState };
