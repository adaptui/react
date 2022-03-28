'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var composite_compositeGroup = require('../composite/composite-group.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu group.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuGroup({ state });
 * <MenuButton state={state}>Recent Items</MenuButton>
 * <Menu state={state}>
 *   <Role {...props}>
 *     <MenuGroupLabel>Applications</MenuGroupLabel>
 *     <MenuItem>Google Chrome.app</MenuItem>
 *     <MenuItem>Safari.app</MenuItem>
 *   </Role>
 * </Menu>
 * ```
 */
const useMenuGroup = system.createHook(props => {
  props = composite_compositeGroup.useCompositeGroup(props);
  return props;
});
/**
 * A component that renders a menu group.
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

const MenuGroup = system.createComponent(props => {
  const htmlProps = useMenuGroup(props);
  return system.createElement("div", htmlProps);
});

exports.MenuGroup = MenuGroup;
exports.useMenuGroup = useMenuGroup;