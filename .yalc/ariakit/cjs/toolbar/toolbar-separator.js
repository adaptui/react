'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var composite_compositeSeparator = require('../composite/composite-separator.js');

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
const useToolbarSeparator = system.createHook(props => {
  props = composite_compositeSeparator.useCompositeSeparator(props);
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

const ToolbarSeparator = system.createComponent(props => {
  const htmlProps = useToolbarSeparator(props);
  return system.createElement("hr", htmlProps);
});

exports.ToolbarSeparator = ToolbarSeparator;
exports.useToolbarSeparator = useToolbarSeparator;
