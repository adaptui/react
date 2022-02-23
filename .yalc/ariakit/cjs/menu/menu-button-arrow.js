'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var popover_popoverDisclosureArrow = require('../popover/popover-disclosure-arrow.js');

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
const useMenuButtonArrow = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = popover_popoverDisclosureArrow.usePopoverDisclosureArrow({
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

const MenuButtonArrow = system.createComponent(props => {
  const htmlProps = useMenuButtonArrow(props);
  return system.createElement("span", htmlProps);
});

exports.MenuButtonArrow = MenuButtonArrow;
exports.useMenuButtonArrow = useMenuButtonArrow;
