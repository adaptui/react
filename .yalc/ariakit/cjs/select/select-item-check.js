'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var system = require('ariakit-utils/system');
var checkbox_checkboxCheck = require('../checkbox/checkbox-check.js');
var __utils = require('../__utils-87932646.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a checkmark inside a `SelectItem` component. This
 * hook must be used in a component that's wrapped with `SelectItem` or the
 * `checked` prop must be explicitly passed to the component.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const props = useSelectItemCheck({ checked: true });
 * <Role {...props} />
 * ```
 */
const useSelectItemCheck = system.createHook(_ref => {
  var _checked;

  let {
    state,
    checked,
    ...props
  } = _ref;
  const context = react.useContext(__utils.SelectItemCheckedContext);
  checked = (_checked = checked) != null ? _checked : context;
  props = checkbox_checkboxCheck.useCheckboxCheck({ ...props,
    checked
  });
  return props;
});
/**
 * A component that renders a checkmark inside a `SelectItem` component. This
 * component must be wrapped with `SelectItem` or the `checked` prop must be
 * explicitly passed to the component.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectItem value="Apple">
 *     <SelectItemCheck />
 *     Apple
 *   </SelectItem>
 *   <SelectItem value="Orange">
 *     <SelectItemCheck />
 *     Orange
 *   </SelectItem>
 * </SelectPopover>
 * ```
 */

const SelectItemCheck = system.createComponent(props => {
  const htmlProps = useSelectItemCheck(props);
  return system.createElement("span", htmlProps);
});

exports.SelectItemCheck = SelectItemCheck;
exports.useSelectItemCheck = useSelectItemCheck;
