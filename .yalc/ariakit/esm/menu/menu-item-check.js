import { useContext } from 'react';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCheckboxCheck } from '../checkbox/checkbox-check.js';
import { b as MenuItemCheckedContext } from '../__utils-07f4a93f.js';

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
const useMenuItemCheck = createHook(_ref => {
  var _checked;

  let {
    state,
    checked,
    ...props
  } = _ref;
  const context = useContext(MenuItemCheckedContext);
  checked = (_checked = checked) != null ? _checked : context;
  props = useCheckboxCheck({ ...props,
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

const MenuItemCheck = createComponent(props => {
  const htmlProps = useMenuItemCheck(props);
  return createElement("span", htmlProps);
});

export { MenuItemCheck, useMenuItemCheck };
