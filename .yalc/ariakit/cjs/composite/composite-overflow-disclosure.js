'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var popover_popoverDisclosure = require('../popover/popover-disclosure.js');
var composite_compositeItem = require('./composite-item.js');

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
const useCompositeOverflowDisclosure = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const ref = react.useRef(null);
  const [shouldRegisterItem, setShouldRegisterItem] = react.useState(false);
  hooks.useSafeLayoutEffect(() => {
    state.disclosureRef.current = ref.current;
  });
  const onFocusProp = hooks.useEventCallback(props.onFocus);
  const onFocus = react.useCallback(event => {
    onFocusProp(event);
    if (event.defaultPrevented) return;
    setShouldRegisterItem(true);
  }, [onFocusProp]);
  const onBlurProp = hooks.useEventCallback(props.onBlur);
  const onBlur = react.useCallback(event => {
    onBlurProp(event);
    if (event.defaultPrevented) return;
    setShouldRegisterItem(false);
  }, [onBlurProp]);
  props = {
    "aria-hidden": !shouldRegisterItem,
    ...props,
    ref: hooks.useForkRef(props.ref, ref),
    onFocus,
    onBlur
  };
  props = composite_compositeItem.useCompositeItem({ ...props,
    shouldRegisterItem
  });
  props = popover_popoverDisclosure.usePopoverDisclosure({
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

const CompositeOverflowDisclosure = system.createComponent(props => {
  const htmlProps = useCompositeOverflowDisclosure(props);
  return system.createElement("button", htmlProps);
});

exports.CompositeOverflowDisclosure = CompositeOverflowDisclosure;
exports.useCompositeOverflowDisclosure = useCompositeOverflowDisclosure;
