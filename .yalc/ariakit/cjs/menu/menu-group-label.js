'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var composite_compositeGroupLabel = require('../composite/composite-group-label.js');

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
const useMenuGroupLabel = system.createHook(props => {
  props = composite_compositeGroupLabel.useCompositeGroupLabel(props);
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

const MenuGroupLabel = system.createComponent(props => {
  const htmlProps = useMenuGroupLabel(props);
  return system.createElement("div", htmlProps);
});

exports.MenuGroupLabel = MenuGroupLabel;
exports.useMenuGroupLabel = useMenuGroupLabel;
