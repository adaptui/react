import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useGroupLabel } from '../group/group-label.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a form group. This hook must be used
 * in a component that's wrapped with `FormGroup` so the `aria-labelledby` prop
 * is properly set on the form group element.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * // This component must be wrapped with FormGroup
 * const props = useFormGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */
const useFormGroupLabel = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = useGroupLabel(props);
  return props;
});
/**
 * A component that renders a label in a form group. This component must be
 * wrapped with `FormGroup` so the `aria-labelledby` prop is properly set on the
 * form group element.
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

const FormGroupLabel = createComponent(props => {
  const htmlProps = useFormGroupLabel(props);
  return createElement("div", htmlProps);
});

export { FormGroupLabel, useFormGroupLabel };
