import { useCompositeState } from '../composite/composite-state.js';

/**
 * Provides state for the `MenuBar` component.
 * @example
 * ```jsx
 * const menu = useMenuBarState();
 * <MenuBar state={menu} />
 * ```
 */

function useMenuBarState(_temp) {
  let {
    orientation = "horizontal",
    focusLoop = true,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const composite = useCompositeState({
    orientation,
    focusLoop,
    ...props
  });
  return composite;
}

export { useMenuBarState };
