'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var composite_compositeSeparator = require('../composite/composite-separator.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a separator for menu items.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuSeparator({ state });
 * <MenuButton state={state}>Edit</MenuButton>
 * <Menu state={state}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 *   <Role {...props} />
 *   <MenuItem>Cut</MenuItem>
 * </Menu>
 * ```
 */
const useMenuSeparator = system.createHook(props => {
  props = composite_compositeSeparator.useCompositeSeparator(props);
  return props;
});
/**
 * A component that renders a separator for menu items.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <MenuButton state={menu}>Edit</MenuButton>
 * <Menu state={menu}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 *   <MenuSeparator />
 *   <MenuItem>Cut</MenuItem>
 * </Menu>
 * ```
 */

const MenuSeparator = system.createComponent(props => {
  const htmlProps = useMenuSeparator(props);
  return system.createElement("hr", htmlProps);
});

exports.MenuSeparator = MenuSeparator;
exports.useMenuSeparator = useMenuSeparator;
