'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dom = require('ariakit-utils/dom');
var events = require('ariakit-utils/events');
var focus = require('ariakit-utils/focus');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-57ccda4f.js');

let mouseMoving = false;

function hasMouseMovement(event) {
  return event.movementX || event.movementY || process.env.NODE_ENV === "test";
}

function setMouseMoving(event) {
  if (!hasMouseMovement(event)) return;
  mouseMoving = true;
}

function resetMouseMoving() {
  mouseMoving = false;
}

function getMouseDestination(event) {
  const relatedTarget = event.relatedTarget;

  if ((relatedTarget == null ? void 0 : relatedTarget.nodeType) === Node.ELEMENT_NODE) {
    return relatedTarget;
  }

  return null;
}

function hoveringInside(event) {
  const nextElement = getMouseDestination(event);
  if (!nextElement) return false;
  return dom.contains(event.currentTarget, nextElement);
}

function movingToAnotherItem(event) {
  const dest = getMouseDestination(event);
  if (!dest) return false;
  const item = dom.closest(dest, "[data-composite-hover]");
  return !!item;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element in a composite widget that receives
 * focus on mouse move and loses focus to the composite base element on mouse
 * leave. This should be combined with the `CompositeItem` component, the
 * `useCompositeItem` hook or any component/hook that uses them underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeHover({ state });
 * <CompositeItem state={state} {...props}>Item</CompositeItem>
 * ```
 */


const useCompositeHover = system.createHook(_ref => {
  var _state3, _state4, _state7, _state8;

  let {
    state,
    focusOnHover = true,
    ...props
  } = _ref;
  state = store.useStore(state || __utils.CompositeContext, ["setActiveId", "baseRef"]);
  const focusOnHoverProp = hooks.useBooleanEventCallback(focusOnHover);
  const onMouseMoveProp = hooks.useEventCallback(props.onMouseMove);
  react.useEffect(() => {
    // We're not returning the event listener cleanup function here because we
    // may lose some events if this component is unmounted, but others are
    // still mounted.
    events.addGlobalEventListener("mousemove", setMouseMoving, true);
    events.addGlobalEventListener("keydown", resetMouseMoving, true);
    events.addGlobalEventListener("scroll", resetMouseMoving, true);
  }, []);
  const onMouseMove = react.useCallback(event => {
    var _state2;

    onMouseMoveProp(event);
    if (event.defaultPrevented) return;
    if (!hasMouseMovement(event)) return;
    if (!focusOnHoverProp(event)) return; // If we're hovering over an item that doesn't have DOM focus, we move
    // focus to the composite element. We're doing this here before setting
    // the active id because the composite element will automatically set
    // the active id to null when it receives focus.

    if (!focus.hasFocusWithin(event.currentTarget)) {
      var _state, _state$baseRef$curren;

      (_state = state) == null ? void 0 : (_state$baseRef$curren = _state.baseRef.current) == null ? void 0 : _state$baseRef$curren.focus();
    }

    (_state2 = state) == null ? void 0 : _state2.setActiveId(event.currentTarget.id);
  }, [onMouseMoveProp, focusOnHoverProp, (_state3 = state) == null ? void 0 : _state3.baseRef, (_state4 = state) == null ? void 0 : _state4.setActiveId]);
  const onMouseLeaveProp = hooks.useEventCallback(props.onMouseLeave);
  const onMouseLeave = react.useCallback(event => {
    var _state5, _state6, _state6$baseRef$curre;

    onMouseLeaveProp(event);
    if (event.defaultPrevented) return;
    if (!mouseMoving) return;
    if (hoveringInside(event)) return;
    if (movingToAnotherItem(event)) return;
    if (!focusOnHoverProp(event)) return;
    (_state5 = state) == null ? void 0 : _state5.setActiveId(null); // Move focus to the composite element.

    (_state6 = state) == null ? void 0 : (_state6$baseRef$curre = _state6.baseRef.current) == null ? void 0 : _state6$baseRef$curre.focus();
  }, [onMouseLeaveProp, focusOnHoverProp, (_state7 = state) == null ? void 0 : _state7.setActiveId, (_state8 = state) == null ? void 0 : _state8.baseRef]);
  props = {
    "data-composite-hover": "",
    ...props,
    onMouseMove,
    onMouseLeave
  };
  return props;
});
/**
 * A component that renders an element in a composite widget that receives focus
 * on mouse move and loses focus to the composite base element on mouse leave.
 * This should be combined with the `CompositeItem` component, the
 * `useCompositeItem` hook or any component/hook that uses them underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeHover as={CompositeItem}>Item</CompositeHover>
 * </Composite>
 * ```
 */

const CompositeHover = store.createMemoComponent(props => {
  const htmlProps = useCompositeHover(props);
  return system.createElement("div", htmlProps);
});

exports.CompositeHover = CompositeHover;
exports.useCompositeHover = useCompositeHover;
