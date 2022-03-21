'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dom = require('ariakit-utils/dom');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-02ec402c.js');

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


const useForm = system.createHook(_ref => {
  let {
    state,
    validateOnChange = true,
    validateOnBlur = true,
    resetOnUnmount = false,
    resetOnSubmit = true,
    autoFocusOnSubmit = true,
    ...props
  } = _ref;
  const ref = react.useRef(null);
  react.useEffect(() => resetOnUnmount ? state.reset : undefined, [resetOnUnmount, state.reset]);
  hooks.useUpdateEffect(() => {
    if (validateOnChange) {
      state.validate();
    }
  }, [state.values, validateOnChange, state.validate]);
  react.useEffect(() => {
    if (!resetOnSubmit) return;
    if (!state.submitSucceed) return;
    state.reset();
  }, [resetOnSubmit, state.submitSucceed, state.reset]);
  const [shouldFocusOnSubmit, setShouldFocusOnSubmit] = react.useState(false);
  react.useEffect(() => {
    if (!shouldFocusOnSubmit) return;
    if (!state.submitFailed) return;
    const field = getFirstInvalidField(state.items);
    const element = field == null ? void 0 : field.ref.current;
    if (!element) return;
    setShouldFocusOnSubmit(false);
    element.focus();

    if (dom.isTextField(element)) {
      element.select();
    }
  }, [autoFocusOnSubmit, state.submitFailed, state.items]);
  const onSubmitProp = hooks.useEventCallback(props.onSubmit);
  const onSubmit = react.useCallback(event => {
    onSubmitProp(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    state.submit();
    if (!autoFocusOnSubmit) return;
    setShouldFocusOnSubmit(true);
  }, [onSubmitProp, state.submit, autoFocusOnSubmit]);
  const onBlurProp = hooks.useEventCallback(props.onBlur);
  const onBlur = react.useCallback(event => {
    onBlurProp(event);
    if (event.defaultPrevented) return;
    if (!validateOnBlur) return;
    if (!isField(event.target, state.items)) return;
    state.validate();
  }, [onBlurProp, validateOnBlur, state.items, state.validate]);
  const onResetProp = hooks.useEventCallback(props.onReset);
  const onReset = react.useCallback(event => {
    onResetProp(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    state.reset();
  }, [onResetProp, state.reset]);
  const tagName = hooks.useTagName(ref, props.as || "form");
  props = {
    role: tagName !== "form" ? "form" : undefined,
    noValidate: true,
    ...props,
    ref: hooks.useForkRef(ref, props.ref),
    onSubmit,
    onBlur,
    onReset
  };
  props = store.useStoreProvider({
    state,
    ...props
  }, __utils.FormContext);
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

const Form = system.createComponent(props => {
  const htmlProps = useForm(props);
  return system.createElement("form", htmlProps);
});

exports.Form = Form;
exports.useForm = useForm;
