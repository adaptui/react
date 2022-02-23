'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var system = require('ariakit-utils/system');
var checkbox_checkboxCheck = require('../checkbox/checkbox-check.js');
var __utils = require('../__utils-601a5088.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a checkmark inside a `MenuItemCheckbox` or
 * `MenuItemRadio` components. This hook must be used in a component that's
 * wrapped with one of those components or the `checked` prop must be explicitly
 * passed to the component.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const props = useMenuItemCheck({ checked: true });
 * <Role {...props} />
 * ```
 */
const useMenuItemCheck = system.createHook(_ref => {
  var _checked;

  let {
    state,
    checked,
    ...props
  } = _ref;
  const context = react.useContext(__utils.MenuItemCheckedContext);
  checked = (_checked = checked) != null ? _checked : context;
  props = checkbox_checkboxCheck.useCheckboxCheck({ ...props,
    checked
  });
  return props;
});
/**
 * A component that renders a checkmark inside a `MenuItemCheckbox` or
 * `MenuItemRadio` components. This component must be wrapped with one of those
 * components or the `checked` prop must be explicitly passed to the component.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState({
 *   defaultValues: { apple: true, orange: false },
 * });
 * <MenuButton state={menu}>Fruits</MenuButton>
 * <Menu state={menu}>
 *   <MenuItemCheckbox name="apple">
 *     <MenuItemCheck />
 *     Apple
 *   </MenuItemCheckbox>
 *   <MenuItemCheckbox name="orange">
 *     <MenuItemCheck />
 *     Orange
 *   </MenuItemCheckbox>
 * </Menu>
 * ```
 */

const MenuItemCheck = system.createComponent(props => {
  const htmlProps = useMenuItemCheck(props);
  return system.createElement("span", htmlProps);
});

exports.MenuItemCheck = MenuItemCheck;
exports.useMenuItemCheck = useMenuItemCheck;
