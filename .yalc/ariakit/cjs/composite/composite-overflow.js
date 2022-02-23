'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var popover_popover = require('../popover/popover.js');

// Hiding the popover with `display: none` would prevent the hidden items to
// be focused, so we just make it transparent and disable pointer events.
const hiddenStyle = {
  opacity: 0,
  pointerEvents: "none"
};
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a popover that will contain the overflow items in a
 * composite collection.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeOverflowState();
 * const props = useCompositeOverflow({ state });
 * <Role {...props}>
 *   <CompositeItem>Item 3</CompositeItem>
 *   <CompositeItem>Item 4</CompositeItem>
 * </Role>
 * ```
 */

const useCompositeOverflow = system.createHook(_ref => {
  let {
    state,
    backdropProps: backdropPropsProp,
    wrapperProps: wrapperPropsProp,
    portal = false,
    ...props
  } = _ref;
  const onFocusProp = hooks.useEventCallback(props.onFocus);
  const onFocus = react.useCallback(event => {
    onFocusProp(event);
    if (event.defaultPrevented) return;
    state.show();
  }, [onFocusProp, state.show]);

  const getStyle = styleProp => state.mounted ? styleProp : { ...hiddenStyle,
    ...styleProp
  };

  const backdropProps = {
    hidden: false,
    ...backdropPropsProp,
    style: getStyle(backdropPropsProp == null ? void 0 : backdropPropsProp.style)
  };
  const wrapperProps = { ...wrapperPropsProp,
    style: getStyle(wrapperPropsProp == null ? void 0 : wrapperPropsProp.style)
  };
  props = {
    role: "presentation",
    hidden: false,
    focusable: false,
    ...props,
    onFocus
  };
  props = popover_popover.usePopover({
    state,
    backdropProps,
    wrapperProps,
    portal,
    ...props
  });
  return props;
});
/**
 * A component that renders a popover that will contain the overflow items in a
 * composite collection.
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

const CompositeOverflow = system.createComponent(props => {
  const htmlProps = useCompositeOverflow(props);
  return system.createElement("div", htmlProps);
});

exports.CompositeOverflow = CompositeOverflow;
exports.useCompositeOverflow = useCompositeOverflow;
