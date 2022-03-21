'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-02ec402c.js');
var button_button = require('../button/button.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a reset buttom in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState();
 * const props = useFormReset({ state });
 * <Form state={state}>
 *   <Role {...props}>Reset</Role>
 * </Form>
 * ```
 */
const useFormReset = system.createHook(_ref => {
  var _state;

  let {
    state,
    ...props
  } = _ref;
  state = store.useStore(state || __utils.FormContext, ["submitting"]);
  props = {
    type: "reset",
    disabled: (_state = state) == null ? void 0 : _state.submitting,
    ...props
  };
  props = button_button.useButton(props);
  return props;
});
/**
 * A component that renders a reset buttom in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState();
 * <Form state={form}>
 *   <FormReset>Reset</FormReset>
 * </Form>
 * ```
 */

const FormReset = system.createComponent(props => {
  const htmlProps = useFormReset(props);
  return system.createElement("button", htmlProps);
});

exports.FormReset = FormReset;
exports.useFormReset = useFormReset;
