import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { usePopoverArrow } from '../popover/popover-arrow.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow inside the menu element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuArrow({ state });
 * <MenuButton state={state}>Menu</MenuButton>
 * <Menu state={state}>
 *   <Role {...props} />
 * </Menu>
 * ```
 */
const useMenuArrow = createHook(props => {
  return usePopoverArrow(props);
});
/**
 * A component that renders an arrow inside the menu element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <MenuButton state={menu}>Menu</MenuButton>
 * <Menu state={menu}>
 *   <MenuArrow />
 * </Menu>
 * ```
 */

const MenuArrow = createComponent(props => {
  const htmlProps = useMenuArrow(props);
  return createElement("div", htmlProps);
});

export { MenuArrow, useMenuArrow };
