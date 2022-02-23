'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var group_group = require('../group/group.js');

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
const useFormGroup = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = group_group.useGroup(props);
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

const FormGroup = system.createComponent(props => {
  const htmlProps = useFormGroup(props);
  return system.createElement("div", htmlProps);
});

exports.FormGroup = FormGroup;
exports.useFormGroup = useFormGroup;
