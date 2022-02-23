'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var popover_popoverArrow = require('../popover/popover-arrow.js');

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
const useMenuArrow = system.createHook(props => {
  return popover_popoverArrow.usePopoverArrow(props);
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

const MenuArrow = system.createComponent(props => {
  const htmlProps = useMenuArrow(props);
  return system.createElement("div", htmlProps);
});

exports.MenuArrow = MenuArrow;
exports.useMenuArrow = useMenuArrow;
