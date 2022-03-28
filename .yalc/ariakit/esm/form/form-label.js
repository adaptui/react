import { useCallback, useRef } from 'react';
import { getFirstTabbableIn } from 'ariakit-utils/focus';
import { useId, useTagName, useEventCallback, useForkRef } from 'ariakit-utils/hooks';
import { queueMicrotask } from 'ariakit-utils/misc';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCollectionItem } from '../collection/collection-item.js';
import { F as FormContext } from '../__utils-6eda8bb9.js';

function findField(items, name) {
  return items == null ? void 0 : items.find(item => item.type === "field" && item.name === name);
}

function supportsNativeLabel(tagName) {
  return tagName === "input" || tagName === "textarea" || tagName === "select" || tagName === "meter" || tagName === "progress";
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label for a form field. If the field is not a
 * native input, select or textarea element, the hook will return props to
 * render a `span` element. Instead of relying on the `htmlFor` prop, it'll rely
 * on the `aria-labelledby` attribute on the form field. Clicking on the label
 * will move focus to the field even if it's not a native input.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({ defaultValues: { email: "" } });
 * const props = useFormLabel({ state, name: state.names.email });
 * <Form state={state}>
 *   <Role {...props}>Email</Role>
 *   <FormInput name={state.names.email} />
 * </Form>
 * ```
 */


const useFormLabel = createHook(_ref => {
  var _state;

  let {
    state,
    name: nameProp,
    getItem: getItemProp,
    ...props
  } = _ref;
  const name = "" + nameProp;
  state = useStore(state || FormContext, [useCallback(s => findField(s.items, name), [name])]);
  const ref = useRef(null);
  const id = useId(props.id);
  const getItem = useCallback(item => {
    const nextItem = { ...item,
      id,
      name,
      type: "label"
    };

    if (getItemProp) {
      return getItemProp(nextItem);
    }

    return nextItem;
  }, [id, name, getItemProp]);
  const field = findField((_state = state) == null ? void 0 : _state.items, name);
  const fieldTagName = useTagName(field == null ? void 0 : field.ref, "input");
  const isNativeLabel = supportsNativeLabel(fieldTagName);
  const onClickProp = useEventCallback(props.onClick);
  const onClick = useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    if (isNativeLabel) return;
    const fieldElement = field == null ? void 0 : field.ref.current;
    if (!fieldElement) return;
    queueMicrotask(() => {
      const focusableElement = getFirstTabbableIn(fieldElement, true, true);
      focusableElement == null ? void 0 : focusableElement.focus();
      focusableElement == null ? void 0 : focusableElement.click();
    });
  }, [onClickProp, isNativeLabel, field]);
  props = {
    id,
    // @ts-expect-error
    as: isNativeLabel ? "label" : "span",
    htmlFor: isNativeLabel ? field == null ? void 0 : field.id : undefined,
    ...props,
    ref: useForkRef(ref, props.ref),
    onClick
  };

  if (!isNativeLabel) {
    props = { ...props,
      style: {
        cursor: "default",
        ...props.style
      }
    };
  }

  props = useCollectionItem({
    state,
    ...props,
    getItem
  });
  return props;
});
/**
 * A component that renders a label for a form field. If the field is not a
 * native input, select or textarea element, the component will render a `span`
 * element. Instead of relying on the `htmlFor` prop, it'll rely on the
 * `aria-labelledby` attribute on the form field. Clicking on the label will
 * move focus to the field even if it's not a native input.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({ defaultValues: { email: "" } });
 * <Form state={form}>
 *   <FormLabel name={form.names.email}>Email</Role>
 *   <FormInput name={form.names.email} />
 * </Form>
 * ```
 */

const FormLabel = createMemoComponent(props => {
  const htmlProps = useFormLabel(props);
  return createElement("label", htmlProps);
});

export { FormLabel, useFormLabel };
