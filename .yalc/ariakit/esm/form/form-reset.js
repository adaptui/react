import { useStore } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { F as FormContext } from '../__utils-6eda8bb9.js';
import { useButton } from '../button/button.js';

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
const useFormReset = createHook(_ref => {
  var _state;

  let {
    state,
    ...props
  } = _ref;
  state = useStore(state || FormContext, ["submitting"]);
  props = {
    type: "reset",
    disabled: (_state = state) == null ? void 0 : _state.submitting,
    ...props
  };
  props = useButton(props);
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

const FormReset = createComponent(props => {
  const htmlProps = useFormReset(props);
  return createElement("button", htmlProps);
});

export { FormReset, useFormReset };
