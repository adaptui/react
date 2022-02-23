import { useRef, useCallback } from 'react';
import { useId, useForkRef } from 'ariakit-utils/hooks';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCollectionItem } from '../collection/collection-item.js';
import { F as FormContext } from '../__utils-6eda8bb9.js';

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
const useFormDescription = createHook(_ref => {
  let {
    state,
    name: nameProp,
    getItem: getItemProp,
    ...props
  } = _ref;
  state = useStore(state || FormContext, []);
  const ref = useRef(null);
  const id = useId(props.id);
  const name = "" + nameProp;
  const getItem = useCallback(item => {
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
    ref: useForkRef(ref, props.ref)
  };
  props = useCollectionItem({
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

const FormDescription = createMemoComponent(props => {
  const htmlProps = useFormDescription(props);
  return createElement("div", htmlProps);
});

export { FormDescription, useFormDescription };
