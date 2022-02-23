import { useRef, useState, useCallback } from 'react';
import { useSafeLayoutEffect, useEventCallback, useForkRef } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { usePopoverDisclosure } from '../popover/popover-disclosure.js';
import { useCompositeItem } from './composite-item.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a disclosure button for the `CompositeOverflow`
 * component. This hook should be used in a component that's wrapped with
 * a composite component.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * // This component should be wrapped with Composite
 * const props = useCompositeOverflowDisclosure();
 * <Role {...props}>+2 items</Role>
 * ```
 */
const useCompositeOverflowDisclosure = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const ref = useRef(null);
  const [shouldRegisterItem, setShouldRegisterItem] = useState(false);
  useSafeLayoutEffect(() => {
    state.disclosureRef.current = ref.current;
  });
  const onFocusProp = useEventCallback(props.onFocus);
  const onFocus = useCallback(event => {
    onFocusProp(event);
    if (event.defaultPrevented) return;
    setShouldRegisterItem(true);
  }, [onFocusProp]);
  const onBlurProp = useEventCallback(props.onBlur);
  const onBlur = useCallback(event => {
    onBlurProp(event);
    if (event.defaultPrevented) return;
    setShouldRegisterItem(false);
  }, [onBlurProp]);
  props = {
    "aria-hidden": !shouldRegisterItem,
    ...props,
    ref: useForkRef(props.ref, ref),
    onFocus,
    onBlur
  };
  props = useCompositeItem({ ...props,
    shouldRegisterItem
  });
  props = usePopoverDisclosure({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a disclosure button for the `CompositeOverflow`
 * component. This component should be wrapped with a composite component.
 * @see https://ariakit.org/components/composite
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

const CompositeOverflowDisclosure = createComponent(props => {
  const htmlProps = useCompositeOverflowDisclosure(props);
  return createElement("button", htmlProps);
});

export { CompositeOverflowDisclosure, useCompositeOverflowDisclosure };
