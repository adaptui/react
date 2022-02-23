'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var focus = require('ariakit-utils/focus');
var hooks = require('ariakit-utils/hooks');
var misc = require('ariakit-utils/misc');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var collection_collectionItem = require('../collection/collection-item.js');
var __utils = require('../__utils-02ec402c.js');

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


const useFormLabel = system.createHook(_ref => {
  var _state;

  let {
    state,
    name: nameProp,
    getItem: getItemProp,
    ...props
  } = _ref;
  const name = "" + nameProp;
  state = store.useStore(state || __utils.FormContext, [react.useCallback(s => findField(s.items, name), [name])]);
  const ref = react.useRef(null);
  const id = hooks.useId(props.id);
  const getItem = react.useCallback(item => {
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
  const fieldTagName = hooks.useTagName(field == null ? void 0 : field.ref, "input");
  const isNativeLabel = supportsNativeLabel(fieldTagName);
  const onClickProp = hooks.useEventCallback(props.onClick);
  const onClick = react.useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    if (isNativeLabel) return;
    const fieldElement = field == null ? void 0 : field.ref.current;
    if (!fieldElement) return;
    misc.queueMicrotask(() => {
      const focusableElement = focus.getFirstTabbableIn(fieldElement, true, true);
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
    ref: hooks.useForkRef(ref, props.ref),
    onClick
  };
  props = collection_collectionItem.useCollectionItem({
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

const FormLabel = store.createMemoComponent(props => {
  const htmlProps = useFormLabel(props);
  return system.createElement("label", htmlProps);
});

exports.FormLabel = FormLabel;
exports.useFormLabel = useFormLabel;
