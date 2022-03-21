'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-6be0b335.js');
var menu_menuItem = require('./menu-item.js');
var checkbox_checkboxState = require('../checkbox/checkbox-state.js');
var checkbox_checkbox = require('../checkbox/checkbox.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu item checkbox inside a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState({ defaultValues: { apple: false } });
 * const props = useMenuItemCheckbox({ state, name: "apple" });
 * <MenuButton state={state}>Fruits</MenuButton>
 * <Menu state={state}>
 *   <Role {...props}>Apple</Role>
 * </Menu>
 * ```
 */
const useMenuItemCheckbox = system.createHook(_ref => {
  var _state2, _state3;

  let {
    state,
    name,
    checked,
    defaultChecked,
    hideOnClick = false,
    ...props
  } = _ref;
  state = store.useStore(state || __utils.MenuContext, ["setValue", react.useCallback(s => s.values[name], [name])]);
  const setValue = react.useCallback(value => {
    var _state;

    return (_state = state) == null ? void 0 : _state.setValue(name, value);
  }, [(_state2 = state) == null ? void 0 : _state2.setValue, name]);
  const checkboxState = checkbox_checkboxState.useCheckboxState({
    value: (_state3 = state) == null ? void 0 : _state3.values[name],
    setValue
  });
  props = {
    role: "menuitemcheckbox",
    ...props
  };
  props = checkbox_checkbox.useCheckbox({
    state: checkboxState,
    checked,
    ...props
  });
  props = menu_menuItem.useMenuItem({
    state,
    hideOnClick,
    ...props
  });
  return props;
});
/**
 * A component that renders a menu item checkbox inside a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState({ defaultValues: { apple: false } });
 * <MenuButton state={menu}>Fruits</MenuButton>
 * <Menu state={menu}>
 *   <MenuItemCheckbox name="apple">Apple</MenuItemCheckbox>
 * </Menu>
 * ```
 */

const MenuItemCheckbox = store.createMemoComponent(props => {
  const htmlProps = useMenuItemCheckbox(props);
  return system.createElement("div", htmlProps);
});

exports.MenuItemCheckbox = MenuItemCheckbox;
exports.useMenuItemCheckbox = useMenuItemCheckbox;
