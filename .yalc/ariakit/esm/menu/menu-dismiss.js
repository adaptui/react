import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useHovercardDismiss } from '../hovercard/hovercard-dismiss.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that hides a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuDismiss({ state });
 * <Menu state={state}>
 *   <Role {...props} />
 * </Menu>
 * ```
 */
const useMenuDismiss = createHook(props => {
  props = useHovercardDismiss(props);
  return props;
});
/**
 * A component that renders a button that hides a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <Menu state={menu}>
 *   <MenuDismiss />
 * </Menu>
 * ```
 */

const MenuDismiss = createComponent(props => {
  const htmlProps = useMenuDismiss(props);
  return createElement("button", htmlProps);
});

export { MenuDismiss, useMenuDismiss };
