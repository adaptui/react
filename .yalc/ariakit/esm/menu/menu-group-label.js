import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCompositeGroupLabel } from '../composite/composite-group-label.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a menu group. This hook must be used
 * in a component that's wrapped with `MenuGroup` so the `aria-labelledby`
 * prop is properly set on the menu group element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * // This component must be wrapped with MenuGroup
 * const props = useMenuGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */
const useMenuGroupLabel = createHook(props => {
  props = useCompositeGroupLabel(props);
  return props;
});
/**
 * A component that renders a label in a menu group. This component must be
 * wrapped with `MenuGroup` so the `aria-labelledby` prop is properly set
 * on the menu group element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <MenuButton state={menu}>Recent Items</MenuButton>
 * <Menu state={menu}>
 *   <MenuGroup>
 *     <MenuGroupLabel>Applications</MenuGroupLabel>
 *     <MenuItem>Google Chrome.app</MenuItem>
 *     <MenuItem>Safari.app</MenuItem>
 *   </MenuGroup>
 * </Menu>
 * ```
 */

const MenuGroupLabel = createComponent(props => {
  const htmlProps = useMenuGroupLabel(props);
  return createElement("div", htmlProps);
});

export { MenuGroupLabel, useMenuGroupLabel };
