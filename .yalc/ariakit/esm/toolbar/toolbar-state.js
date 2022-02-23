import { useCompositeState } from '../composite/composite-state.js';

/**
 * Provides state for the `Toolbar` component.
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarItem>Item 1</ToolbarItem>
 *   <ToolbarItem>Item 2</ToolbarItem>
 *   <ToolbarItem>Item 3</ToolbarItem>
 * </Toolbar>
 * ```
 */

function useToolbarState(_temp) {
  let {
    orientation = "horizontal",
    focusLoop = true,
    ...props
  } = _temp === void 0 ? {} : _temp;
  return useCompositeState({
    orientation,
    focusLoop,
    ...props
  });
}

export { useToolbarState };
