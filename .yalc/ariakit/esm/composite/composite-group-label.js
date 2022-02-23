import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useGroupLabel } from '../group/group-label.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a composite group. This hook must be
 * used in a component that's wrapped with `CompositeGroup` so the
 * `aria-labelledby` prop is properly set on the composite group element.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * // This component must be wrapped with CompositeGroup
 * const props = useCompositeGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */
const useCompositeGroupLabel = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = useGroupLabel(props);
  return props;
});
/**
 * A component that renders a label in a composite group. This component must be
 * wrapped with `CompositeGroup` so the `aria-labelledby` prop is properly set
 * on the composite group element.
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

const CompositeGroupLabel = createComponent(props => {
  const htmlProps = useCompositeGroupLabel(props);
  return createElement("div", htmlProps);
});

export { CompositeGroupLabel, useCompositeGroupLabel };
