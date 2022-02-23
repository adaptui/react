import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useGroup } from '../group/group.js';

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
const useCompositeGroup = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = useGroup(props);
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

const CompositeGroup = createComponent(props => {
  const htmlProps = useCompositeGroup(props);
  return createElement("div", htmlProps);
});

export { CompositeGroup, useCompositeGroup };
