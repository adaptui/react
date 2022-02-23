import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useHovercardHeading } from '../hovercard/hovercard-heading.js';

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
const useMenuHeading = createHook(props => {
  props = useHovercardHeading(props);
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

const MenuHeading = createComponent(props => {
  const htmlProps = useMenuHeading(props);
  return createElement("h1", htmlProps);
});

export { MenuHeading, useMenuHeading };
