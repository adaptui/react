import { useCallback, useRef, useMemo } from 'react';
import { getDocument } from 'ariakit-utils/dom';
import { useId, useEventCallback, useBooleanEventCallback, useTagName, useForkRef } from 'ariakit-utils/hooks';
import { cx } from 'ariakit-utils/misc';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCollectionItem } from '../collection/collection-item.js';
import { F as FormContext } from '../__utils-6eda8bb9.js';

function getNamedElement(ref, name) {
  const element = ref.current;
  if (!element) return null;

  if (element.name !== name) {
    if (element.form) {
      return element.form.elements.namedItem(name);
    } else {
      const document = getDocument(element);
      return document.getElementsByName(name)[0];
    }
  }

  return element;
}

function acceptsNameAttribute(tagName) {
  return tagName === "input" || tagName === "button" || tagName === "textarea" || tagName === "fieldset" || tagName === "select";
}

function findItem(items, name, type) {
  return items == null ? void 0 : items.find(item => item.type === type && item.name === name);
}

function useItem(state, name, type) {
  return useMemo(() => findItem(state == null ? void 0 : state.items, name, type), [state == null ? void 0 : state.items, name, type]);
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a form field. Unlike `useFormInput`, this hook
 * doesn't automatically returns the `value` and `onChange` props. This is so we
 * can use it not only for native form elements but also for custom components
 * whose value is not controlled by the native `value` and `onChange` props.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { content: "" } });
 * const props = useFormField({ state, name: state.names.content });
 *
 * const setValue = useCallback((value) => {
 *   state.setValue(state.names.content, value);
 * }, [state.setValue, state.names.content]);
 *
 * <Form state={state}>
 *   <FormLabel name={state.names.content}>Content</FormLabel>
 *   <Role
 *     {...props}
 *     as={Editor}
 *     value={state.values.content}
 *     onChange={setValue}
 *   />
 * </Form>
 * ```
 */


const useFormField = createHook(_ref => {
  var _state, _state4, _state5;

  let {
    state,
    name: nameProp,
    getItem: getItemProp,
    touchOnBlur = true,
    ...props
  } = _ref;
  const name = "" + nameProp;
  state = useStore(state || FormContext, ["setFieldTouched", "useValidate", "setError", useCallback(s => s.getError(name), [name]), useCallback(s => s.getFieldTouched(name), [name]), useCallback(s => findItem(s.items, name, "label"), [name]), useCallback(s => findItem(s.items, name, "error"), [name]), useCallback(s => findItem(s.items, name, "description"), [name])]);
  const ref = useRef(null);
  const id = useId(props.id);
  (_state = state) == null ? void 0 : _state.useValidate(() => {
    const element = getNamedElement(ref, name);
    if (!element) return;

    if ("validity" in element && !element.validity.valid) {
      var _state2;

      (_state2 = state) == null ? void 0 : _state2.setError(name, element.validationMessage);
    }
  });
  const getItem = useCallback(item => {
    const nextItem = { ...item,
      id,
      name,
      type: "field"
    };

    if (getItemProp) {
      return getItemProp(nextItem);
    }

    return nextItem;
  }, [id, name, getItemProp]);
  const onBlurProp = useEventCallback(props.onBlur);
  const touchOnBlurProp = useBooleanEventCallback(touchOnBlur);
  const onBlur = useCallback(event => {
    var _state3;

    onBlurProp(event);
    if (event.defaultPrevented) return;
    if (!touchOnBlurProp(event)) return;
    (_state3 = state) == null ? void 0 : _state3.setFieldTouched(name, true);
  }, [onBlurProp, touchOnBlurProp, (_state4 = state) == null ? void 0 : _state4.setFieldTouched, name]);
  const tagName = useTagName(ref, props.as || "input");
  const label = useItem(state, name, "label");
  const error = useItem(state, name, "error");
  const description = useItem(state, name, "description");
  const describedBy = cx(error == null ? void 0 : error.id, description == null ? void 0 : description.id, props["aria-describedby"]);
  const invalid = !!((_state5 = state) != null && _state5.getError(name)) && state.getFieldTouched(name);
  props = {
    id,
    "aria-labelledby": label == null ? void 0 : label.id,
    "aria-invalid": invalid ? true : undefined,
    ...props,
    "aria-describedby": describedBy || undefined,
    // @ts-expect-error
    name: acceptsNameAttribute(tagName) ? name : undefined,
    ref: useForkRef(ref, props.ref),
    onBlur
  };
  props = useCollectionItem({
    state,
    ...props,
    getItem
  });
  return props;
});
/**
 * A component that renders a form field. Unlike `FormInput`, this component
 * doesn't automatically pass the `value` and `onChange` props down to the
 * underlying element. This is so we can use it not only for native form
 * elements but also for custom components whose value is not controlled by the
 * native `value` and `onChange` props.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { content: "" } });
 *
 * const setValue = useCallback((value) => {
 *   form.setValue(form.names.content, value);
 * }, [form.setValue, form.names.content]);
 *
 * <Form state={form}>
 *   <FormLabel name={form.names.content}>Content</FormLabel>
 *   <FormField
 *     {...props}
 *     as={Editor}
 *     value={form.values.content}
 *     onChange={setValue}
 *   />
 * </Form>
 * ```
 */

const FormField = createMemoComponent(props => {
  const htmlProps = useFormField(props);
  return createElement("input", htmlProps);
});

export { FormField, useFormField };
