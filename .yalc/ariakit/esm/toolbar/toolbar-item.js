import { createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCompositeItem } from '../composite/composite-item.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an interactive element in a toolbar.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const state = useToolbarState();
 * const props = useToolbarItem({ state });
 * <Toolbar state={state}>
 *   <Role {...props}>Item</Role>
 * </Toolbar>
 * ```
 */
const useToolbarItem = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = useCompositeItem({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders an interactive element in a toolbar.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarItem>Item</ToolbarItem>
 * </Toolbar>
 * ```
 */

const ToolbarItem = createMemoComponent(props => {
  const htmlProps = useToolbarItem(props);
  return createElement("button", htmlProps);
});

export { ToolbarItem, useToolbarItem };
