'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var collection_collectionItem = require('../collection/collection-item.js');
var __utils = require('../__utils-02ec402c.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that displays an error message. The
 * `children` will be automatically set to the error message set on the state.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { email: "" } });
 * const props = useFormError({ state, name: state.names.email });
 *
 * state.useValidate(() => {
 *   if (!state.values.email) {
 *     state.setError(state.names.email, "Email is required!");
 *   }
 * });
 *
 * <Form state={state}>
 *   <FormLabel name={state.names.email}>Email</FormLabel>
 *   <FormInput name={state.names.email} />
 *   <Role {...props} />
 * </Form>
 * ```
 */
const useFormError = system.createHook(_ref => {
  var _state, _state2;

  let {
    state,
    name: nameProp,
    getItem: getItemProp,
    ...props
  } = _ref;
  const name = "" + nameProp;
  state = store.useStore(state || __utils.FormContext, [react.useCallback(s => s.getError(name), [name]), react.useCallback(s => s.getFieldTouched(name), [name])]);
  const ref = react.useRef(null);
  const id = hooks.useId(props.id);
  const getItem = react.useCallback(item => {
    const nextItem = { ...item,
      id,
      name,
      type: "error"
    };

    if (getItemProp) {
      return getItemProp(nextItem);
    }

    return nextItem;
  }, [id, name, getItemProp]);
  const shouldShowError = ((_state = state) == null ? void 0 : _state.getError(name)) != null && state.getFieldTouched(name);
  const children = shouldShowError ? (_state2 = state) == null ? void 0 : _state2.getError(name) : undefined;
  props = {
    id,
    role: "alert",
    children,
    ...props,
    ref: hooks.useForkRef(ref, props.ref)
  };
  props = collection_collectionItem.useCollectionItem({
    state,
    ...props,
    getItem
  });
  return props;
});
/**
 * A component that renders an element that displays an error message. The
 * `children` will be automatically set to the error message set on the state.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { email: "" } });
 *
 * form.useValidate(() => {
 *   if (!form.values.email) {
 *     form.setError(form.names.email, "Email is required!");
 *   }
 * });
 *
 * <Form state={form}>
 *   <FormLabel name={form.names.email}>Email</FormLabel>
 *   <FormInput name={form.names.email} />
 *   <FormError name={form.names.email} />
 * </Form>
 * ```
 */

const FormError = store.createMemoComponent(props => {
  const htmlProps = useFormError(props);
  return system.createElement("div", htmlProps);
});

exports.FormError = FormError;
exports.useFormError = useFormError;
