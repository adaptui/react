import { useCallback } from 'react';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { M as MenuContext } from '../__utils-07f4a93f.js';
import { useMenuItem } from './menu-item.js';
import { useCheckboxState } from '../checkbox/checkbox-state.js';
import { useCheckbox } from '../checkbox/checkbox.js';

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
const useMenuItemCheckbox = createHook(_ref => {
  var _state2, _state3;

  let {
    state,
    name,
    checked,
    defaultChecked,
    hideOnClick = false,
    ...props
  } = _ref;
  state = useStore(state || MenuContext, ["setValue", useCallback(s => s.values[name], [name])]);
  const setValue = useCallback(value => {
    var _state;

    return (_state = state) == null ? void 0 : _state.setValue(name, value);
  }, [(_state2 = state) == null ? void 0 : _state2.setValue, name]);
  const checkboxState = useCheckboxState({
    value: (_state3 = state) == null ? void 0 : _state3.values[name],
    setValue
  });
  props = {
    role: "menuitemcheckbox",
    ...props
  };
  props = useCheckbox({
    state: checkboxState,
    checked,
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

const MenuItemCheckbox = createMemoComponent(props => {
  const htmlProps = useMenuItemCheckbox(props);
  return createElement("div", htmlProps);
});

export { MenuItemCheckbox, useMenuItemCheckbox };
