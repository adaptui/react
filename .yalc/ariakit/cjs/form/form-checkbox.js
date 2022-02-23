'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-02ec402c.js');
var form_formField = require('./form-field.js');
var checkbox_checkboxState = require('../checkbox/checkbox-state.js');
var checkbox_checkbox = require('../checkbox/checkbox.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a checkbox as a form field.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { acceptTerms: false } });
 * const props = useFormCheckbox({ state, name: state.names.acceptTerms });
 * <Form state={state}>
 *   <label>
 *     <Role {...props} />
 *     Accept terms
 *   </label>
 * </Form>
 * ```
 */
const useFormCheckbox = system.createHook(_ref => {
  var _state2, _state3;

  let {
    state,
    name: nameProp,
    value,
    checked,
    defaultChecked,
    ...props
  } = _ref;
  const name = "" + nameProp;
  state = store.useStore(state || __utils.FormContext, ["setValue", react.useCallback(s => s.getValue(name), [name])]);
  const setValue = react.useCallback(value => {
    var _state;

    return (_state = state) == null ? void 0 : _state.setValue(name, value);
  }, [(_state2 = state) == null ? void 0 : _state2.setValue, name]);
  const checkboxState = checkbox_checkboxState.useCheckboxState({
    value: (_state3 = state) == null ? void 0 : _state3.getValue(name),
    setValue
  });
  props = checkbox_checkbox.useCheckbox({
    state: checkboxState,
    value,
    checked,
    ...props
  });
  props = form_formField.useFormField({
    state,
    name,
    "aria-labelledby": undefined,
    ...props
  });
  return props;
});
/**
 * A component that renders a checkbox as a form field.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { acceptTerms: false } });
 * <Form state={form}>
 *   <label>
 *     <FormCheckbox name={form.names.acceptTerms} />
 *     Accept terms
 *   </label>
 * </Form>
 * ```
 */

const FormCheckbox = store.createMemoComponent(props => {
  const htmlProps = useFormCheckbox(props);
  return system.createElement("input", htmlProps);
});

exports.FormCheckbox = FormCheckbox;
exports.useFormCheckbox = useFormCheckbox;
