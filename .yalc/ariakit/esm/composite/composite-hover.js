import { useEffect, useCallback } from 'react';
import { contains, closest } from 'ariakit-utils/dom';
import { addGlobalEventListener } from 'ariakit-utils/events';
import { hasFocusWithin } from 'ariakit-utils/focus';
import { useBooleanEventCallback, useEventCallback } from 'ariakit-utils/hooks';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { C as CompositeContext } from '../__utils-7da92179.js';

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
  return contains(event.currentTarget, nextElement);
}

function movingToAnotherItem(event) {
  const dest = getMouseDestination(event);
  if (!dest) return false;
  const item = closest(dest, "[data-composite-hover]");
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


const useCompositeHover = createHook(_ref => {
  var _state3, _state4, _state7, _state8;

  let {
    state,
    focusOnHover = true,
    ...props
  } = _ref;
  state = useStore(state || CompositeContext, ["setActiveId", "baseRef"]);
  const focusOnHoverProp = useBooleanEventCallback(focusOnHover);
  const onMouseMoveProp = useEventCallback(props.onMouseMove);
  useEffect(() => {
    // We're not returning the event listener cleanup function here because we
    // may lose some events if this component is unmounted, but others are
    // still mounted.
    addGlobalEventListener("mousemove", setMouseMoving, true);
    addGlobalEventListener("keydown", resetMouseMoving, true);
    addGlobalEventListener("scroll", resetMouseMoving, true);
  }, []);
  const onMouseMove = useCallback(event => {
    var _state2;

    onMouseMoveProp(event);
    if (event.defaultPrevented) return;
    if (!hasMouseMovement(event)) return;
    if (!focusOnHoverProp(event)) return; // If we're hovering over an item that doesn't have DOM focus, we move
    // focus to the composite element. We're doing this here before setting
    // the active id because the composite element will automatically set
    // the active id to null when it receives focus.

    if (!hasFocusWithin(event.currentTarget)) {
      var _state, _state$baseRef$curren;

      (_state = state) == null ? void 0 : (_state$baseRef$curren = _state.baseRef.current) == null ? void 0 : _state$baseRef$curren.focus();
    }

    (_state2 = state) == null ? void 0 : _state2.setActiveId(event.currentTarget.id);
  }, [onMouseMoveProp, focusOnHoverProp, (_state3 = state) == null ? void 0 : _state3.baseRef, (_state4 = state) == null ? void 0 : _state4.setActiveId]);
  const onMouseLeaveProp = useEventCallback(props.onMouseLeave);
  const onMouseLeave = useCallback(event => {
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

const CompositeHover = createMemoComponent(props => {
  const htmlProps = useCompositeHover(props);
  return createElement("div", htmlProps);
});

export { CompositeHover, useCompositeHover };
