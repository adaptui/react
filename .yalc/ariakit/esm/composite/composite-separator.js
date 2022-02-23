import { useStore } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useSeparator } from '../separator/separator.js';
import { C as CompositeContext } from '../__utils-7da92179.js';

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
const useCompositeSeparator = createHook(_ref => {
  var _state;

  let {
    state,
    ...props
  } = _ref;
  state = useStore(state || CompositeContext, ["orientation"]);
  const orientation = ((_state = state) == null ? void 0 : _state.orientation) === "horizontal" ? "vertical" : "horizontal";
  props = useSeparator({ ...props,
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

const CompositeSeparator = createComponent(props => {
  const htmlProps = useCompositeSeparator(props);
  return createElement("hr", htmlProps);
});

export { CompositeSeparator, useCompositeSeparator };
