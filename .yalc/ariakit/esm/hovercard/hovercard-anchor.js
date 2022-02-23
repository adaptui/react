import { useRef, useEffect, useCallback } from 'react';
import { addGlobalEventListener } from 'ariakit-utils/events';
import { useEventCallback, useBooleanEventCallback, useForkRef } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useFocusable } from '../focusable/focusable.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an anchor element that will open a popover
 * (`Hovercard`) on hover.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const state = useHovercardState();
 * const props = useHovercardAnchor({ state });
 * <Role as="a" {...props}>@username</Role>
 * <Hovercard state={state}>Details</Hovercard>
 * ```
 */
const useHovercardAnchor = createHook(_ref => {
  let {
    state,
    showOnHover = true,
    ...props
  } = _ref;
  const disabled = props.disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
  const showTimeoutRef = useRef(0); // Clear the show timeout if the anchor is unmounted

  useEffect(() => () => window.clearTimeout(showTimeoutRef.current), []); // Clear the show timeout if the mouse leaves the anchor element. We're
  // using the native mouseleave event instead of React's onMouseLeave so we
  // bypass the event.stopPropagation() logic set on the Hovercard component
  // for when the mouse is moving toward the Hovercard.

  useEffect(() => {
    const onMouseLeave = event => {
      const element = state.anchorRef.current;
      if (!element) return;
      if (event.target !== element) return;
      window.clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = 0;
    };

    return addGlobalEventListener("mouseleave", onMouseLeave, true);
  }, [state.anchorRef]);
  const onMouseMoveProp = useEventCallback(props.onMouseMove);
  const showOnHoverProp = useBooleanEventCallback(showOnHover);
  const onMouseMove = useCallback(event => {
    state.anchorRef.current = event.currentTarget;
    onMouseMoveProp(event);
    if (disabled) return;
    if (event.defaultPrevented) return;
    if (showTimeoutRef.current) return;
    if (!showOnHoverProp(event)) return;
    showTimeoutRef.current = window.setTimeout(() => {
      showTimeoutRef.current = 0;
      state.show();
    }, state.showTimeout);
  }, [state.anchorRef, onMouseMoveProp, disabled, showOnHoverProp, state.show, state.showTimeout]);
  props = { ...props,
    ref: useForkRef(state.anchorRef, props.ref),
    onMouseMove
  };
  props = useFocusable(props);
  return props;
});
/**
 * A component that renders an anchor element that will open a popover
 * (`Hovercard`) on hover.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <HovercardAnchor state={hovercard}>@username</HovercardAnchor>
 * <Hovercard state={hovercard}>Details</Hovercard>
 * ```
 */

const HovercardAnchor = createComponent(props => {
  const htmlProps = useHovercardAnchor(props);
  return createElement("a", htmlProps);
});

export { HovercardAnchor, useHovercardAnchor };
