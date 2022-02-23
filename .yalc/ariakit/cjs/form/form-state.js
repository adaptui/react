'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var misc = require('ariakit-utils/misc');
var store = require('ariakit-utils/store');
var collection_collectionState = require('../collection/collection-state.js');
var __utils = require('../__utils-02ec402c.js');

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

  const collection = collection_collectionState.useCollectionState(props);
  const defaultValues = hooks.useInitialValue(props.defaultValues || {});
  const [values, setValues] = hooks.useControlledState(defaultValues, props.values, props.setValues);
  const defaultErrors = hooks.useInitialValue(props.defaultErrors || {});
  const [errors, setErrors] = hooks.useControlledState(defaultErrors, props.errors, props.setErrors);
  const defaultTouched = hooks.useInitialValue(props.defaultTouched || {});
  const [touched, setTouched] = hooks.useControlledState(defaultTouched, props.touched, props.setTouched);
  const [validating, setValidating] = react.useState(false);
  const [submitting, setSubmitting] = react.useState(false);
  const [submitSucceed, setSubmitSucceed] = react.useState(0);
  const [submitFailed, setSubmitFailed] = react.useState(0);
  const valid = react.useMemo(() => !__utils.hasMessages(errors), [errors]);
  const names = hooks.useLazyRef(__utils.createNames);
  const submitCallbacks = hooks.useLazyRef(() => new Set());
  const validateCallbacks = hooks.useLazyRef(() => new Set());
  const getValue = react.useCallback(name => __utils.get(values, name), [values]);
  const setValue = react.useCallback((name, value) => setValues(prevValues => {
    const prevValue = __utils.get(prevValues, name);
    const nextValue = misc.applyState(value, prevValue);
    if (nextValue === prevValue) return prevValues;
    return __utils.set(prevValues, name, nextValue);
  }), []);
  const pushValue = react.useCallback((name, value) => {
    setValues(prevValues => {
      const array = __utils.get(prevValues, name, []);
      return __utils.set(prevValues, name, [...array, value]);
    });
  }, []);
  const removeValue = react.useCallback((name, index) => {
    setValues(prevValues => {
      const array = __utils.get(prevValues, name, []);
      return __utils.set(prevValues, name, [...array.slice(0, index), null, ...array.slice(index + 1)]);
    });
  }, []);
  const getError = react.useCallback(name => __utils.get(errors, name), [errors]);
  const setError = react.useCallback((name, error) => setErrors(prevErrors => {
    const prevError = __utils.get(prevErrors, name);
    const nextError = misc.applyState(error, prevError);
    if (nextError === prevError) return prevErrors;
    return __utils.set(prevErrors, name, nextError);
  }), []);
  const getFieldTouched = react.useCallback(name => !!__utils.get(touched, name), [touched]);
  const setFieldTouched = react.useCallback((name, value) => setTouched(prevTouched => {
    const prevValue = __utils.get(prevTouched, name);
    const nextValue = misc.applyState(value, prevValue);
    if (nextValue === prevValue) return prevTouched;
    return __utils.set(prevTouched, name, nextValue);
  }), []);
  const useValidate = react.useCallback(callback => {
    hooks.useSafeLayoutEffect(() => {
      validateCallbacks.add(callback);
      return () => {
        validateCallbacks.delete(callback);
      };
    }, [callback]);
  }, []);
  const useSubmit = react.useCallback(callback => {
    hooks.useSafeLayoutEffect(() => {
      submitCallbacks.add(callback);
      return () => {
        submitCallbacks.delete(callback);
      };
    }, [callback]);
  }, []);
  const errorsRef = hooks.useLiveRef(errors);
  const validate = react.useCallback(async () => {
    setValidating(true);
    setErrors(defaultErrors);

    try {
      const callbacks = [...validateCallbacks];
      const results = callbacks.map(callback => callback());
      await Promise.all(results);
      return !__utils.hasMessages(errorsRef.current);
    } finally {
      setValidating(false);
    }
  }, [defaultErrors]);
  const valuesRef = hooks.useLiveRef(values);
  const submit = react.useCallback(async () => {
    setSubmitting(true);
    setTouched(__utils.setAll(valuesRef.current, true));

    try {
      if (await validate()) {
        const callbacks = [...submitCallbacks];
        const results = callbacks.map(callback => callback());
        await Promise.all(results);

        if (!__utils.hasMessages(errorsRef.current)) {
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
  const reset = react.useCallback(() => {
    setValues(defaultValues);
    setErrors(defaultErrors);
    setTouched(defaultTouched);
    setValidating(false);
    setSubmitting(false);
    setSubmitSucceed(0);
    setSubmitFailed(0);
  }, [defaultValues, defaultErrors, defaultTouched]);
  const state = react.useMemo(() => ({ ...collection,
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
  return store.useStorePublisher(state);
}

exports.useFormState = useFormState;
