import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useGroup } from '../group/group.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a form group.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState();
 * const props = useFormGroup({ state });
 * <Form state={state}>
 *   <Role {...props}>
 *     <FormGroupLabel>Label</FormGroupLabel>
 *   </Role>
 * </Form>
 * ```
 */
const useFormGroup = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = useGroup(props);
  return props;
});
/**
 * A component that renders a form group.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({
 *   defaultValues: {
 *     username: "",
 *     email: "",
 *   },
 * });
 * <Form state={form}>
 *   <FormGroup>
 *     <FormGroupLabel>Account</FormGroupLabel>
 *     <FormLabel name={form.names.username}>Username</FormLabel>
 *     <FormInput name={form.names.username} />
 *     <FormLabel name={form.names.email}>Email</FormLabel>
 *     <FormInput name={form.names.email} />
 *   </FormGroup>
 * </Form>
 * ```
 */

const FormGroup = createComponent(props => {
  const htmlProps = useFormGroup(props);
  return createElement("div", htmlProps);
});

export { FormGroup, useFormGroup };
