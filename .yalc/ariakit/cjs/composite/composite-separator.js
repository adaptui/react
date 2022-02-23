'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var separator_separator = require('../separator/separator.js');
var __utils = require('../__utils-57ccda4f.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a separator for composite items.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeSeparator({ state });
 * <Composite state={state}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <Role {...props} />
 *   <CompositeItem>Item 2</CompositeItem>
 * </Composite>
 * ```
 */
const useCompositeSeparator = system.createHook(_ref => {
  var _state;

  let {
    state,
    ...props
  } = _ref;
  state = store.useStore(state || __utils.CompositeContext, ["orientation"]);
  const orientation = ((_state = state) == null ? void 0 : _state.orientation) === "horizontal" ? "vertical" : "horizontal";
  props = separator_separator.useSeparator({ ...props,
    orientation
  });
  return props;
});
/**
 * A component that renders a separator for composite items.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeSeparator />
 *   <CompositeItem>Item 2</CompositeItem>
 * </Composite>
 * ```
 */

const CompositeSeparator = system.createComponent(props => {
  const htmlProps = useCompositeSeparator(props);
  return system.createElement("hr", htmlProps);
});

exports.CompositeSeparator = CompositeSeparator;
exports.useCompositeSeparator = useCompositeSeparator;
