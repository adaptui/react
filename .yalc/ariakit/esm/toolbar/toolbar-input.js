import { createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCompositeInput } from '../composite/composite-input.js';
import { useToolbarItem } from './toolbar-item.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an input as a toolbar item.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const state = useToolbarState();
 * const props = useToolbarInput({ state });
 * <Toolbar state={state}>
 *   <Role {...props} />
 * </Toolbar>
 * ```
 */

const useToolbarInput = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = useCompositeInput({
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
 * A component that renders an input as a toolbar item.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarInput />
 * </Toolbar>
 * ```
 */

const ToolbarInput = createMemoComponent(props => {
  const htmlProps = useToolbarInput(props);
  return createElement("input", htmlProps);
});

export { ToolbarInput, useToolbarInput };
