import { usePopoverState } from '../popover/popover-state.js';

/**
 * Provides state for the `CompositeOverflow` components.
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * const overflow = useCompositeOverflowState();
 * <Composite state={composite}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 *   <CompositeOverflowDisclosure state={overflow}>
 *     +2 items
 *   </CompositeOverflowDisclosure>
 *   <CompositeOverflow state={overflow}>
 *     <CompositeItem>Item 3</CompositeItem>
 *     <CompositeItem>Item 4</CompositeItem>
 *   </CompositeOverflow>
 * </Composite>
 * ```
 */

function useCompositeOverflowState(props) {
  if (props === void 0) {
    props = {};
  }

  const state = usePopoverState(props);
  return state;
}

export { useCompositeOverflowState };
