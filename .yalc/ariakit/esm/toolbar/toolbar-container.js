import { createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCompositeContainer } from '../composite/composite-container.js';
import { useToolbarItem } from './toolbar-item.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a container for interactive widgets inside
 * toolbar items.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const state = useToolbarState();
 * const props = useToolbarContainer({ state });
 * <Toolbar state={state}>
 *   <Role {...props}>
 *     <input type="text" />
 *   </Role>
 * </Toolbar>
 * ```
 */

const useToolbarContainer = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = useCompositeContainer({
    state,
    ...props
  });
  props = useToolbarItem({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a container for interactive widgets inside toolbar
 * items.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarContainer>
 *     <input type="text" />
 *   </ToolbarContainer>
 * </Toolbar>
 * ```
 */

const ToolbarContainer = createMemoComponent(props => {
  const htmlProps = useToolbarContainer(props);
  return createElement("div", htmlProps);
});

export { ToolbarContainer, useToolbarContainer };
