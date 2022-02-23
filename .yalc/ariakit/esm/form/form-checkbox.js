import { useCallback } from 'react';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { F as FormContext } from '../__utils-6eda8bb9.js';
import { useFormField } from './form-field.js';
import { useCheckboxState } from '../checkbox/checkbox-state.js';
import { useCheckbox } from '../checkbox/checkbox.js';

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
const useFormCheckbox = createHook(_ref => {
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
  state = useStore(state || FormContext, ["setValue", useCallback(s => s.getValue(name), [name])]);
  const setValue = useCallback(value => {
    var _state;

    return (_state = state) == null ? void 0 : _state.setValue(name, value);
  }, [(_state2 = state) == null ? void 0 : _state2.setValue, name]);
  const checkboxState = useCheckboxState({
    value: (_state3 = state) == null ? void 0 : _state3.getValue(name),
    setValue
  });
  props = useCheckbox({
    state: checkboxState,
    value,
    checked,
    ...props
  });
  props = useFormField({
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

const FormCheckbox = createMemoComponent(props => {
  const htmlProps = useFormCheckbox(props);
  return createElement("input", htmlProps);
});

export { FormCheckbox, useFormCheckbox };
