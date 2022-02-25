import { useCallback } from 'react';
import { useEventCallback, useWrapElement } from 'ariakit-utils/hooks';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useRadio } from '../radio/radio.js';
import { a as MenuContext, b as MenuItemCheckedContext } from '../__utils-aac2c931.js';
import { useMenuItem } from './menu-item.js';
import { jsx } from 'react/jsx-runtime';

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
const useMenuItemRadio = createHook(_ref => {
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
  state = useStore(state || MenuContext, ["setValue", useCallback(s => s.values[name], [name])]);
  const onChangeCallback = useEventCallback(onChangeProp);
  const onChange = useCallback(event => {
    var _state;

    onChangeCallback(event);
    if (event.defaultPrevented) return;
    (_state = state) == null ? void 0 : _state.setValue(name, value);
  }, [onChangeCallback, (_state2 = state) == null ? void 0 : _state2.setValue, name, value]);
  checked = (_checked = checked) != null ? _checked : ((_state3 = state) == null ? void 0 : _state3.values[name]) === value;
  props = useWrapElement(props, element => /*#__PURE__*/jsx(MenuItemCheckedContext.Provider, {
    value: !!checked,
    children: element
  }), [checked]);
  props = {
    role: "menuitemradio",
    ...props
  };
  props = useRadio({
    value,
    checked,
    onChange,
    ...props
  });
  props = useMenuItem({
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

const MenuItemRadio = createMemoComponent(props => {
  const htmlProps = useMenuItemRadio(props);
  return createElement("div", htmlProps);
});

export { MenuItemRadio, useMenuItemRadio };
