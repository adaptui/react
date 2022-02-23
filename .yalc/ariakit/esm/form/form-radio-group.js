import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useFormGroup } from './form-group.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a radio group in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { color: "red" } });
 * const props = useFormRadioGroup({ state });
 * <Form state={state}>
 *   <Role {...props}>
 *     <FormGroupLabel>Favorite color</FormGroupLabel>
 *     <FormRadio name={state.names.color} value="red" />
 *     <FormRadio name={state.names.color} value="blue" />
 *     <FormRadio name={state.names.color} value="green" />
 *   </Role>
 * </Form>
 * ```
 */

const useFormRadioGroup = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = {
    role: "radiogroup",
    ...props
  };
  props = useFormGroup(props);
  return props;
});
/**
 * A component that renders a radio group in a form.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { color: "red" } });
 * <Form state={form}>
 *   <FormRadioGroup>
 *     <FormGroupLabel>Favorite color</FormGroupLabel>
 *     <FormRadio name={form.names.color} value="red" />
 *     <FormRadio name={form.names.color} value="blue" />
 *     <FormRadio name={form.names.color} value="green" />
 *   </FormRadioGroup>
 * </Form>
 * ```
 */

const FormRadioGroup = createComponent(props => {
  const htmlProps = useFormRadioGroup(props);
  return createElement("div", htmlProps);
});

export { FormRadioGroup, useFormRadioGroup };
