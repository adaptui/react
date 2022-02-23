'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var collection_collectionItem = require('../collection/collection-item.js');
var __utils = require('../__utils-02ec402c.js');
var button_button = require('../button/button.js');

function getFirstFieldsByName(items, name) {
  if (!items) return [];
  const fields = [];

  for (const item of items) {
    if (item.type !== "field") continue;
    if (!item.name.startsWith(name)) continue;
    const nameWithIndex = item.name.replace(/(\.\d+)\..+$/, "$1");
    const regex = new RegExp("^" + nameWithIndex);

    if (!fields.some(i => regex.test(i.name))) {
      fields.push(item);
    }
  }

  return fields;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that will push items to an array field
 * in the form when clicked.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({
 *   defaultValues: {
 *     languages: ["JavaScript", "PHP"],
 *   },
 * });
 * const props = useFormPush({
 *   state,
 *   name: state.names.languages,
 *   value: "",
 * });
 * <Form state={state}>
 *   {state.values.languages.map((_, i) => (
 *     <FormInput key={i} name={state.names.languages[i]} />
 *   ))}
 *   <Role {...props}>Add new language</Role>
 * </Form>
 * ```
 */


const useFormPush = system.createHook(_ref => {
  var _state2, _state4;

  let {
    state,
    value,
    name: nameProp,
    getItem: getItemProp,
    autoFocusOnClick = true,
    ...props
  } = _ref;
  const name = "" + nameProp;
  state = store.useStore(state || __utils.FormContext, ["pushValue", "items"]);
  const [shouldFocus, setShouldFocus] = react.useState(false);
  react.useEffect(() => {
    var _state, _items;

    if (!shouldFocus) return;
    const items = getFirstFieldsByName((_state = state) == null ? void 0 : _state.items, name);
    const element = items == null ? void 0 : (_items = items[items.length - 1]) == null ? void 0 : _items.ref.current;
    if (!element) return;
    element.focus();
    setShouldFocus(false);
  }, [shouldFocus, (_state2 = state) == null ? void 0 : _state2.items, name]);
  const getItem = react.useCallback(item => {
    const nextItem = { ...item,
      type: "button",
      name
    };

    if (getItemProp) {
      return getItemProp(nextItem);
    }

    return nextItem;
  }, [name, getItemProp]);
  const onClickProp = hooks.useEventCallback(props.onClick);
  const valueRef = hooks.useLiveRef(value);
  const onClick = react.useCallback(event => {
    var _state3;

    onClickProp(event);
    if (event.defaultPrevented) return;
    (_state3 = state) == null ? void 0 : _state3.pushValue(name, valueRef.current);
    if (!autoFocusOnClick) return;
    setShouldFocus(true);
  }, [onClickProp, (_state4 = state) == null ? void 0 : _state4.pushValue, name, valueRef, autoFocusOnClick]);
  props = { ...props,
    onClick
  };
  props = button_button.useButton(props);
  props = collection_collectionItem.useCollectionItem({
    state,
    ...props,
    getItem
  });
  return props;
});
/**
 * A component that renders a button that will push items to an array value in
 * the form state when clicked.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({
 *   defaultValues: {
 *     languages: ["JavaScript", "PHP"],
 *   },
 * });
 * <Form state={form}>
 *   {form.values.languages.map((_, i) => (
 *     <FormInput key={i} name={form.names.languages[i]} />
 *   ))}
 *   <FormPush name={form.names.languages} value="">
 *     Add new language
 *   </FormPush>
 * </Form>
 * ```
 */

const FormPush = system.createComponent(props => {
  const htmlProps = useFormPush(props);
  return system.createElement("button", htmlProps);
});

exports.FormPush = FormPush;
exports.useFormPush = useFormPush;
