'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-02ec402c.js');
var form_formField = require('./form-field.js');
var focusable_focusable = require('../focusable/focusable.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a form input. Unline `useFormField`, this hook
 * returns the `value` and `onChange` props that can be passed to a native
 * input, select or textarea elements.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { email: "" } });
 * const props = useFormInput({ state, name: state.names.email });
 * <Form state={state}>
 *   <FormLabel name={state.names.email}>Email</FormLabel>
 *   <Role as="input" {...props} />
 * </Form>
 * ```
 */
const useFormInput = system.createHook(_ref => {
  var _state2, _state3;

  let {
    state,
    name: nameProp,
    ...props
  } = _ref;
  const name = "" + nameProp;
  state = store.useStore(state || __utils.FormContext, ["setValue", react.useCallback(s => s.getValue(name), [name])]);
  const onChangeProp = hooks.useEventCallback(props.onChange);
  const onChange = react.useCallback(event => {
    var _state;

    onChangeProp(event);
    if (event.defaultPrevented) return;
    (_state = state) == null ? void 0 : _state.setValue(name, event.target.value);
  }, [onChangeProp, (_state2 = state) == null ? void 0 : _state2.setValue, name]);
  const value = (_state3 = state) == null ? void 0 : _state3.getValue(name);
  props = {
    value,
    ...props,
    onChange
  };
  props = focusable_focusable.useFocusable(props);
  props = form_formField.useFormField({
    state,
    name,
    ...props
  });
  return props;
});
/**
 * A component that renders a form input. Unline `FormField`, this component
 * passes the `value` and `onChange` props down to the underlying element that
 * can be a native input, select or textarea elements.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { email: "" } });
 * <Form state={form}>
 *   <FormLabel name={form.names.email}>Email</FormLabel>
 *   <FormInput name={form.names.email} />
 * </Form>
 * ```
 */

const FormInput = store.createMemoComponent(props => {
  const htmlProps = useFormInput(props);
  return system.createElement("input", htmlProps);
});

exports.FormInput = FormInput;
exports.useFormInput = useFormInput;
