import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useHovercardDescription } from '../hovercard/hovercard-description.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a description element for a menu. This hook must
 * be used in a component that's wrapped with `Menu` so the `aria-describedby`
 * prop is properly set on the menu element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * // This component must be wrapped with Menu
 * const props = useMenuDescription();
 * <Role {...props}>Description</Role>
 * ```
 */
const useMenuDescription = createHook(props => {
  props = useHovercardDescription(props);
  return props;
});
/**
 * A component that renders a description in a menu. This component must be
 * wrapped with `Menu` so the `aria-describedby` prop is properly set on the
 * menu element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <Menu state={menu}>
 *   <MenuDescription>Description</MenuDescription>
 * </Menu>
 * ```
 */

const MenuDescription = createComponent(props => {
  const htmlProps = useMenuDescription(props);
  return createElement("p", htmlProps);
});

export { MenuDescription, useMenuDescription };
