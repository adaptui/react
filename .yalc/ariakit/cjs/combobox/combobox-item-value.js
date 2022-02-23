'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var misc = require('ariakit-utils/misc');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-c0893fb8.js');
var jsxRuntime = require('react/jsx-runtime');

function normalizeValue(value) {
  return misc.normalizeString(value).toLowerCase();
}

function splitValue(itemValue, userValue) {
  userValue = normalizeValue(userValue);
  let index = normalizeValue(itemValue).indexOf(userValue);
  const parts = [];

  while (index !== -1) {
    if (index !== 0) {
      parts.push( /*#__PURE__*/jsxRuntime.jsx("span", {
        "data-autocomplete-value": "",
        children: itemValue.substr(0, index)
      }, parts.length));
    }

    parts.push( /*#__PURE__*/jsxRuntime.jsx("span", {
      "data-user-value": "",
      children: itemValue.substr(index, userValue.length)
    }, parts.length));
    itemValue = itemValue.substr(index + userValue.length);
    index = normalizeValue(itemValue).indexOf(userValue);
  }

  if (itemValue) {
    parts.push( /*#__PURE__*/jsxRuntime.jsx("span", {
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


const useComboboxItemValue = system.createHook(_ref => {
  var _state2;

  let {
    state,
    value,
    ...props
  } = _ref;
  state = store.useStore(state || __utils.ComboboxContext, ["value"]);
  const context = react.useContext(__utils.ComboboxItemValueContext);
  const itemValue = value != null ? value : context;
  const children = react.useMemo(() => {
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

const ComboboxItemValue = system.createComponent(props => {
  const htmlProps = useComboboxItemValue(props);
  return system.createElement("span", htmlProps);
});

exports.ComboboxItemValue = ComboboxItemValue;
exports.useComboboxItemValue = useComboboxItemValue;
