'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_compositeItem = require('../composite/composite-item.js');

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
const useToolbarItem = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = composite_compositeItem.useCompositeItem({
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

const ToolbarItem = store.createMemoComponent(props => {
  const htmlProps = useToolbarItem(props);
  return system.createElement("button", htmlProps);
});

exports.ToolbarItem = ToolbarItem;
exports.useToolbarItem = useToolbarItem;
