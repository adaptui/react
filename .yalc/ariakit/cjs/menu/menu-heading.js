'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var hovercard_hovercardHeading = require('../hovercard/hovercard-heading.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a heading element for a menu. This hook must be
 * used in a component that's wrapped with `Menu` so the `aria-labelledby` prop
 * is properly set on the menu element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * // This component must be wrapped with Menu
 * const props = useMenuHeading();
 * <Role {...props}>Heading</Role>
 * ```
 */
const useMenuHeading = system.createHook(props => {
  props = hovercard_hovercardHeading.useHovercardHeading(props);
  return props;
});
/**
 * A component that renders a heading in a menu. This component must be wrapped
 * with `Menu` so the `aria-labelledby` prop is properly set on the menu
 * element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <Menu state={menu}>
 *   <MenuHeading>Heading</MenuHeading>
 * </Menu>
 * ```
 */

const MenuHeading = system.createComponent(props => {
  const htmlProps = useMenuHeading(props);
  return system.createElement("h1", htmlProps);
});

exports.MenuHeading = MenuHeading;
exports.useMenuHeading = useMenuHeading;
