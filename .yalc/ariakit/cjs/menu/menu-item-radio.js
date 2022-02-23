'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var radio_radio = require('../radio/radio.js');
var __utils = require('../__utils-601a5088.js');
var menu_menuItem = require('./menu-item.js');
var jsxRuntime = require('react/jsx-runtime');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu item radio inside a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState({ defaultValues: { fruit: "apple" } });
 * const apple = useMenuItemRadio({ state, name: "fruit", value: "apple" });
 * const orange = useMenuItemRadio({ state, name: "fruit", value: "orange" });
 * <MenuButton state={state}>Fruit</MenuButton>
 * <Menu state={state}>
 *   <Role {...apple}>Apple</Role>
 *   <Role {...orange}>Orange</Role>
 * </Menu>
 * ```
 */
const useMenuItemRadio = system.createHook(_ref => {
  var _state2, _checked, _state3;

  let {
    state,
    name,
    value,
    checked,
    onChange: onChangeProp,
    hideOnClick = false,
    ...props
  } = _ref;
  state = store.useStore(state || __utils.MenuContext, ["setValue", react.useCallback(s => s.values[name], [name])]);
  const onChangeCallback = hooks.useEventCallback(onChangeProp);
  const onChange = react.useCallback(event => {
    var _state;

    onChangeCallback(event);
    if (event.defaultPrevented) return;
    (_state = state) == null ? void 0 : _state.setValue(name, value);
  }, [onChangeCallback, (_state2 = state) == null ? void 0 : _state2.setValue, name, value]);
  checked = (_checked = checked) != null ? _checked : ((_state3 = state) == null ? void 0 : _state3.values[name]) === value;
  props = hooks.useWrapElement(props, element => /*#__PURE__*/jsxRuntime.jsx(__utils.MenuItemCheckedContext.Provider, {
    value: !!checked,
    children: element
  }), [checked]);
  props = {
    role: "menuitemradio",
    ...props
  };
  props = radio_radio.useRadio({
    value,
    checked,
    onChange,
    clickOnEnter: true,
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
 * A component that renders a menu item radio inside a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState({ defaultValues: { fruit: "apple" } });
 * <MenuButton state={menu}>Fruit</MenuButton>
 * <Menu state={menu}>
 *   <MenuItemRadio name="fruit" value="apple">
 *     Apple
 *   </MenuItemRadio>
 *   <MenuItemRadio name="fruit" value="orange">
 *     Orange
 *   </MenuItemRadio>
 * </Menu>
 * ```
 */

const MenuItemRadio = store.createMemoComponent(props => {
  const htmlProps = useMenuItemRadio(props);
  return system.createElement("div", htmlProps);
});

exports.MenuItemRadio = MenuItemRadio;
exports.useMenuItemRadio = useMenuItemRadio;
