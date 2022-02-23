'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_compositeContainer = require('../composite/composite-container.js');
var toolbar_toolbarItem = require('./toolbar-item.js');

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

const useToolbarContainer = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = composite_compositeContainer.useCompositeContainer({
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

const ToolbarContainer = store.createMemoComponent(props => {
  const htmlProps = useToolbarContainer(props);
  return system.createElement("div", htmlProps);
});

exports.ToolbarContainer = ToolbarContainer;
exports.useToolbarContainer = useToolbarContainer;
