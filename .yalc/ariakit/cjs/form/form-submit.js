'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-02ec402c.js');
var button_button = require('../button/button.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a submit buttom in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState();
 * const props = useFormSubmit({ state });
 * <Form state={state}>
 *   <Role {...props}>Submit</Role>
 * </Form>
 * ```
 */
const useFormSubmit = system.createHook(_ref => {
  var _state;

  let {
    state,
    accessibleWhenDisabled = true,
    ...props
  } = _ref;
  state = store.useStore(state || __utils.FormContext, ["submitting"]);
  props = {
    type: "submit",
    disabled: (_state = state) == null ? void 0 : _state.submitting,
    ...props
  };
  props = button_button.useButton({ ...props,
    accessibleWhenDisabled
  });
  return props;
});
/**
 * A component that renders a submit buttom in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState();
 * <Form state={form}>
 *   <FormSubmit>Submit</FormSubmit>
 * </Form>
 * ```
 */

const FormSubmit = system.createComponent(props => {
  const htmlProps = useFormSubmit(props);
  return system.createElement("button", htmlProps);
});

exports.FormSubmit = FormSubmit;
exports.useFormSubmit = useFormSubmit;
