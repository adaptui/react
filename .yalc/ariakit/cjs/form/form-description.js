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
 * Ariakit component to render a description element for a form field.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { password: "" } });
 * const props = useFormDescription({ state, name: state.names.password });
 * <Form state={state}>
 *   <FormLabel name={state.names.password}>Password</FormLabel>
 *   <FormInput name={state.names.password} type="password" />
 *   <Role {...props}>Password with at least 8 characters.</Role>
 * </Form>
 * ```
 */
const useFormDescription = system.createHook(_ref => {
  let {
    state,
    name: nameProp,
    getItem: getItemProp,
    ...props
  } = _ref;
  state = store.useStore(state || __utils.FormContext, []);
  const ref = react.useRef(null);
  const id = hooks.useId(props.id);
  const name = "" + nameProp;
  const getItem = react.useCallback(item => {
    const nextItem = { ...item,
      id,
      name,
      type: "description"
    };

    if (getItemProp) {
      return getItemProp(nextItem);
    }

    return nextItem;
  }, [id, name, getItemProp]);
  props = {
    id,
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
 * A component that renders a description element for a form field.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { password: "" } });
 * <Form state={form}>
 *   <FormLabel name={form.names.password}>Password</FormLabel>
 *   <FormInput name={form.names.password} type="password" />
 *   <FormDescription name={form.names.password}>
 *     Password with at least 8 characters.
 *   </FormDescription>
 * </Form>
 * ```
 */

const FormDescription = store.createMemoComponent(props => {
  const htmlProps = useFormDescription(props);
  return system.createElement("div", htmlProps);
});

exports.FormDescription = FormDescription;
exports.useFormDescription = useFormDescription;
