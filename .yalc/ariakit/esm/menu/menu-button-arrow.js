import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { usePopoverDisclosureArrow } from '../popover/popover-disclosure-arrow.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow pointing to the menu position, usually
 * inside a `MenuButton`.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuButtonArrow({ state });
 * <MenuButton state={state}>
 *   Edit
 *   <Role {...props} />
 * </MenuButton>
 * <Menu state={state}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Menu>
 * ```
 */
const useMenuButtonArrow = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = usePopoverDisclosureArrow({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders an arrow pointing to the menu position, usually
 * inside a `MenuButton`.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <MenuButton state={menu}>
 *   Edit
 *   <MenuButtonArrow />
 * </MenuButton>
 * <Menu state={menu}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Menu>
 * ```
 */

const MenuButtonArrow = createComponent(props => {
  const htmlProps = useMenuButtonArrow(props);
  return createElement("span", htmlProps);
});

export { MenuButtonArrow, useMenuButtonArrow };
