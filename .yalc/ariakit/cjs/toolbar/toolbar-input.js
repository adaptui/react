'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_compositeInput = require('../composite/composite-input.js');
var toolbar_toolbarItem = require('./toolbar-item.js');

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

const useToolbarInput = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = composite_compositeInput.useCompositeInput({
    state,
    ...props
  });
  props = toolbar_toolbarItem.useToolbarItem({
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

const ToolbarInput = store.createMemoComponent(props => {
  const htmlProps = useToolbarInput(props);
  return system.createElement("input", htmlProps);
});

exports.ToolbarInput = ToolbarInput;
exports.useToolbarInput = useToolbarInput;
