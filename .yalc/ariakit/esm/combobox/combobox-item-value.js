import { useContext, useMemo } from 'react';
import { normalizeString } from 'ariakit-utils/misc';
import { useStore } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { C as ComboboxContext, a as ComboboxItemValueContext } from '../__utils-8b39082b.js';
import { jsx } from 'react/jsx-runtime';

function normalizeValue(value) {
  return normalizeString(value).toLowerCase();
}

function splitValue(itemValue, userValue) {
  userValue = normalizeValue(userValue);
  let index = normalizeValue(itemValue).indexOf(userValue);
  const parts = [];

  while (index !== -1) {
    if (index !== 0) {
      parts.push( /*#__PURE__*/jsx("span", {
        "data-autocomplete-value": "",
        children: itemValue.substr(0, index)
      }, parts.length));
    }

    parts.push( /*#__PURE__*/jsx("span", {
      "data-user-value": "",
      children: itemValue.substr(index, userValue.length)
    }, parts.length));
    itemValue = itemValue.substr(index + userValue.length);
    index = normalizeValue(itemValue).indexOf(userValue);
  }

  if (itemValue) {
    parts.push( /*#__PURE__*/jsx("span", {
      "data-autocomplete-value": "",
      children: itemValue
    }, parts.length));
  }

  return parts;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a value element inside a combobox item. The value
 * will be split into span elements and returned as the children prop. The
 * portions of the value that correspond to the state value will have a
 * `data-user-value` attribute. The other portions will have a
 * `data-autocomplete-value` attribute.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState({ value: "p" });
 * const props = useComboboxItemValue({ state, value: "Apple" });
 * <Role {...props} />
 * // This will result in the following DOM:
 * <span>
 *   <span data-autocomplete-value>A</span>
 *   <span data-user-value>p</span>
 *   <span data-user-value>p</span>
 *   <span data-autocomplete-value>le</span>
 * </span>
 * ```
 */


const useComboboxItemValue = createHook(_ref => {
  var _state2;

  let {
    state,
    value,
    ...props
  } = _ref;
  state = useStore(state || ComboboxContext, ["value"]);
  const context = useContext(ComboboxItemValueContext);
  const itemValue = value != null ? value : context;
  const children = useMemo(() => {
    var _state;

    return itemValue && (_state = state) != null && _state.value ? splitValue(itemValue, state.value) : itemValue;
  }, [itemValue, (_state2 = state) == null ? void 0 : _state2.value]);
  props = {
    children,
    ...props
  };
  return props;
});
/**
 * A component that renders a value element inside a combobox item. The value
 * will be split into span elements. The portions of the value that correspond
 * to the state value will have a `data-user-value` attribute. The other
 * portions will have a `data-autocomplete-value` attribute.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState({ value: "p" });
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem value="Apple">
 *     <ComboboxItemValue />
 *   </ComboboxItem>
 * </ComboboxPopover>
 * // The Apple item will have a value element that looks like this:
 * <span>
 *   <span data-autocomplete-value>A</span>
 *   <span data-user-value>p</span>
 *   <span data-user-value>p</span>
 *   <span data-autocomplete-value>le</span>
 * </span>
 * ```
 */

const ComboboxItemValue = createComponent(props => {
  const htmlProps = useComboboxItemValue(props);
  return createElement("span", htmlProps);
});

export { ComboboxItemValue, useComboboxItemValue };
