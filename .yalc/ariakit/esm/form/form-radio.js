import { useCallback } from 'react';
import { useEventCallback } from 'ariakit-utils/hooks';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useRadio } from '../radio/radio.js';
import { F as FormContext } from '../__utils-6eda8bb9.js';
import { useFormField } from './form-field.js';

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
const useFormRadio = createHook(_ref => {
  var _state2, _props$checked, _state3;

  let {
    state,
    name: nameProp,
    value,
    ...props
  } = _ref;
  const name = "" + nameProp;
  state = useStore(state || FormContext, ["setValue", useCallback(s => s.getValue(name), [name])]);
  const onChangeProp = useEventCallback(props.onChange);
  const onChange = useCallback(event => {
    var _state;

    onChangeProp(event);
    if (event.defaultPrevented) return;
    (_state = state) == null ? void 0 : _state.setValue(name, value);
  }, [onChangeProp, (_state2 = state) == null ? void 0 : _state2.setValue, name, value]);
  const checked = (_props$checked = props.checked) != null ? _props$checked : ((_state3 = state) == null ? void 0 : _state3.getValue(name)) === value;
  props = { ...props,
    checked,
    onChange
  };
  props = useRadio({
    value,
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

const FormRadio = createMemoComponent(props => {
  const htmlProps = useFormRadio(props);
  return createElement("input", htmlProps);
});

export { FormRadio, useFormRadio };
