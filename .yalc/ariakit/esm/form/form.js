import { useRef, useEffect, useState, useCallback } from 'react';
import { isTextField } from 'ariakit-utils/dom';
import { useInitialValue, useUpdateEffect, useEventCallback, useTagName, useForkRef } from 'ariakit-utils/hooks';
import { useStoreProvider } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { F as FormContext } from '../__utils-6eda8bb9.js';

function isField(element, items) {
  return items.some(item => item.type === "field" && item.ref.current === element);
}

function getFirstInvalidField(items) {
  return items.find(item => {
    var _item$ref$current;

    return item.type === "field" && ((_item$ref$current = item.ref.current) == null ? void 0 : _item$ref$current.getAttribute("aria-invalid")) === "true";
  });
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a form element.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState();
 * const props = useForm({ state, as: "form" });
 * <Role {...props} />
 * ```
 */


const useForm = createHook(_ref => {
  let {
    state,
    validateOnChange = true,
    validateOnBlur = true,
    resetOnUnmount = false,
    resetOnSubmit = true,
    autoFocusOnSubmit = true,
    ...props
  } = _ref;
  const ref = useRef(null);
  const defaultValues = useInitialValue(state.values);
  useEffect(() => resetOnUnmount ? state.reset : undefined, [resetOnUnmount, state.reset]);
  useUpdateEffect(() => {
    if (!validateOnChange) return;
    if (state.values === defaultValues) return;
    state.validate();
  }, [validateOnChange, state.values, defaultValues, state.validate]);
  useEffect(() => {
    if (!resetOnSubmit) return;
    if (!state.submitSucceed) return;
    state.reset();
  }, [resetOnSubmit, state.submitSucceed, state.reset]);
  const [shouldFocusOnSubmit, setShouldFocusOnSubmit] = useState(false);
  useEffect(() => {
    if (!shouldFocusOnSubmit) return;
    if (!state.submitFailed) return;
    const field = getFirstInvalidField(state.items);
    const element = field == null ? void 0 : field.ref.current;
    if (!element) return;
    setShouldFocusOnSubmit(false);
    element.focus();

    if (isTextField(element)) {
      element.select();
    }
  }, [autoFocusOnSubmit, state.submitFailed, state.items]);
  const onSubmitProp = useEventCallback(props.onSubmit);
  const onSubmit = useCallback(event => {
    onSubmitProp(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    state.submit();
    if (!autoFocusOnSubmit) return;
    setShouldFocusOnSubmit(true);
  }, [onSubmitProp, state.submit, autoFocusOnSubmit]);
  const onBlurProp = useEventCallback(props.onBlur);
  const onBlur = useCallback(event => {
    onBlurProp(event);
    if (event.defaultPrevented) return;
    if (!validateOnBlur) return;
    if (!isField(event.target, state.items)) return;
    state.validate();
  }, [onBlurProp, validateOnBlur, state.items, state.validate]);
  const onResetProp = useEventCallback(props.onReset);
  const onReset = useCallback(event => {
    onResetProp(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    state.reset();
  }, [onResetProp, state.reset]);
  const tagName = useTagName(ref, props.as || "form");
  props = {
    role: tagName !== "form" ? "form" : undefined,
    noValidate: true,
    ...props,
    ref: useForkRef(ref, props.ref),
    onSubmit,
    onBlur,
    onReset
  };
  props = useStoreProvider({
    state,
    ...props
  }, FormContext);
  return props;
});
/**
 * A component that renders a form element.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { username: "johndoe" } });
 * <Form state={form}>
 *   <FormLabel name={form.names.username}>Username</FormLabel>
 *   <FormInput name={form.names.username} />
 * </Form>
 * ```
 */

const Form = createComponent(props => {
  const htmlProps = useForm(props);
  return createElement("form", htmlProps);
});

export { Form, useForm };
