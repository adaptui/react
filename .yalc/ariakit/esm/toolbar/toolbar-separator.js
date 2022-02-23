import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCompositeSeparator } from '../composite/composite-separator.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a separator for toolbar items.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const state = useToolbarState();
 * const props = useToolbarSeparator({ state });
 * <Toolbar state={state}>
 *   <ToolbarItem>Item 1</ToolbarItem>
 *   <Role {...props} />
 *   <ToolbarItem>Item 2</ToolbarItem>
 * </Toolbar>
 * ```
 */
const useToolbarSeparator = createHook(props => {
  props = useCompositeSeparator(props);
  return props;
});
/**
 * A component that renders a separator for toolbar items.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarItem>Item 1</ToolbarItem>
 *   <ToolbarSeparator />
 *   <ToolbarItem>Item 2</ToolbarItem>
 * </Toolbar>
 * ```
 */

const ToolbarSeparator = createComponent(props => {
  const htmlProps = useToolbarSeparator(props);
  return createElement("hr", htmlProps);
});

export { ToolbarSeparator, useToolbarSeparator };
