import { useStore } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { F as FormContext } from '../__utils-6eda8bb9.js';
import { useButton } from '../button/button.js';

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
const useFormSubmit = createHook(_ref => {
  var _state;

  let {
    state,
    accessibleWhenDisabled = true,
    ...props
  } = _ref;
  state = useStore(state || FormContext, ["submitting"]);
  props = {
    type: "submit",
    disabled: (_state = state) == null ? void 0 : _state.submitting,
    ...props
  };
  props = useButton({ ...props,
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

const FormSubmit = createComponent(props => {
  const htmlProps = useFormSubmit(props);
  return createElement("button", htmlProps);
});

export { FormSubmit, useFormSubmit };
