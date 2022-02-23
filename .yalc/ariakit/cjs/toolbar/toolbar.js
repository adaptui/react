'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var composite_composite = require('../composite/composite.js');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

const ToolbarContext = /*#__PURE__*/react.createContext(undefined);

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a toolbar element that groups interactive
 * elements together.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const state = useToolbarState();
 * const props = useToolbar({ state });
 * <Role {...props}>
 *   <ToolbarItem>Item 1</ToolbarItem>
 *   <ToolbarItem>Item 2</ToolbarItem>
 * </Role>
 * ```
 */
const useToolbar = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const orientation = state.orientation === "both" ? undefined : state.orientation;
  props = hooks.useWrapElement(props, element => /*#__PURE__*/jsxRuntime.jsx(ToolbarContext.Provider, {
    value: state,
    children: element
  }), [state]);
  props = {
    role: "toolbar",
    "aria-orientation": orientation,
    ...props
  };
  props = composite_composite.useComposite({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a toolbar element that groups interactive elements
 * together.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarItem>Item 1</ToolbarItem>
 *   <ToolbarItem>Item 2</ToolbarItem>
 * </Toolbar>
 * ```
 */

const Toolbar = system.createComponent(props => {
  const htmlProps = useToolbar(props);
  return system.createElement("div", htmlProps);
});

exports.Toolbar = Toolbar;
exports.useToolbar = useToolbar;
