import { useWrapElement } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useComposite } from '../composite/composite.js';
import { createContext } from 'react';
import { jsx } from 'react/jsx-runtime';

const ToolbarContext = /*#__PURE__*/createContext(undefined);

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
const useToolbar = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const orientation = state.orientation === "both" ? undefined : state.orientation;
  props = useWrapElement(props, element => /*#__PURE__*/jsx(ToolbarContext.Provider, {
    value: state,
    children: element
  }), [state]);
  props = {
    role: "toolbar",
    "aria-orientation": orientation,
    ...props
  };
  props = useComposite({
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

const Toolbar = createComponent(props => {
  const htmlProps = useToolbar(props);
  return createElement("div", htmlProps);
});

export { Toolbar, useToolbar };
