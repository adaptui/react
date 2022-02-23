'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var composite_compositeState = require('../composite/composite-state.js');

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
  const composite = composite_compositeState.useCompositeState({
    orientation,
    focusLoop,
    ...props
  });
  return composite;
}

exports.useMenuBarState = useMenuBarState;
