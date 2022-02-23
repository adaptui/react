'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-57ccda4f.js');
var jsxRuntime = require('react/jsx-runtime');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a composite row. Wrapping `CompositeItem`
 * elements within rows will create a two-dimensional composite widget, such as
 * a grid.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeRow({ state });
 * <Composite state={state}>
 *   <Role {...props}>
 *     <CompositeItem>Item 1</CompositeItem>
 *     <CompositeItem>Item 2</CompositeItem>
 *     <CompositeItem>Item 3</CompositeItem>
 *   </Role>
 * </Composite>
 * ```
 */
const useCompositeRow = system.createHook(_ref => {
  var _state2;

  let {
    state,
    ...props
  } = _ref;
  const context = react.useContext(__utils.CompositeContext);
  state = state || context;
  const ref = react.useRef(null);
  const id = hooks.useId(props.id);
  const providerValue = react.useMemo(() => {
    var _state;

    return {
      id,
      baseRef: (_state = state) == null ? void 0 : _state.baseRef
    };
  }, [id, (_state2 = state) == null ? void 0 : _state2.baseRef]);
  props = hooks.useWrapElement(props, element => /*#__PURE__*/jsxRuntime.jsx(__utils.CompositeRowContext.Provider, {
    value: providerValue,
    children: element
  }), [providerValue]);
  props = {
    id,
    ...props,
    ref: hooks.useForkRef(ref, props.ref)
  };
  return props;
});
/**
 * A component that renders a composite row. Wrapping `CompositeItem` elements
 * within `CompositeRow` will create a two-dimensional composite widget, such
 * as a grid.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeRow>
 *     <CompositeItem>Item 1.1</CompositeItem>
 *     <CompositeItem>Item 1.2</CompositeItem>
 *     <CompositeItem>Item 1.3</CompositeItem>
 *   </CompositeRow>
 *   <CompositeRow>
 *     <CompositeItem>Item 2.1</CompositeItem>
 *     <CompositeItem>Item 2.2</CompositeItem>
 *     <CompositeItem>Item 2.3</CompositeItem>
 *   </CompositeRow>
 * </Composite>
 * ```
 */

const CompositeRow = system.createComponent(props => {
  const htmlProps = useCompositeRow(props);
  return system.createElement("div", htmlProps);
});

exports.CompositeRow = CompositeRow;
exports.useCompositeRow = useCompositeRow;
