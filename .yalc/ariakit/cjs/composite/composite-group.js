'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var group_group = require('../group/group.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a composite group.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeGroup({ state });
 * <Composite state={state}>
 *   <Role {...props}>
 *     <CompositeGroupLabel>Label</CompositeGroupLabel>
 *     <CompositeItem>Item 1</CompositeItem>
 *     <CompositeItem>Item 2</CompositeItem>
 *   </Role>
 * </Composite>
 * ```
 */
const useCompositeGroup = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = group_group.useGroup(props);
  return props;
});
/**
 * A component that renders a composite group.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeGroup>
 *     <CompositeGroupLabel>Label</CompositeGroupLabel>
 *     <CompositeItem>Item 1</CompositeItem>
 *     <CompositeItem>Item 2</CompositeItem>
 *   </CompositeGroup>
 * </Composite>
 * ```
 */

const CompositeGroup = system.createComponent(props => {
  const htmlProps = useCompositeGroup(props);
  return system.createElement("div", htmlProps);
});

exports.CompositeGroup = CompositeGroup;
exports.useCompositeGroup = useCompositeGroup;
