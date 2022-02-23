import { useState, useRef, useEffect, useCallback } from 'react';
import { isSelfTarget } from 'ariakit-utils/events';
import { useId, useEventCallback, useForkRef } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that can be shown or hidden.
 * @see https://ariakit.org/components/disclosure
 * @example
 * ```jsx
 * const state = useDisclosureState();
 * const props = useDisclosureContent({ state });
 * <Disclosure state={state}>Disclosure</Disclosure>
 * <Role {...props}>Content</Role>
 * ```
 */
const useDisclosureContent = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const id = useId(props.id);
  const [transition, setTransition] = useState(null);
  const raf = useRef(0);
  useEffect(() => {
    if (!state.animated) {
      setTransition(null);
      return;
    } // Double RAF is needed so the browser has enough time to paint the
    // default styles before processing the `data-enter` attribute. Otherwise
    // it wouldn't be considered a transition.
    // See https://github.com/ariakit/ariakit/issues/643


    raf.current = requestAnimationFrame(() => {
      raf.current = requestAnimationFrame(() => {
        if (state.visible) {
          setTransition("enter");
        } else if (state.animating) {
          setTransition("leave");
        } else {
          setTransition(null);
        }
      });
    });
    return () => cancelAnimationFrame(raf.current);
  }, [state.animated, state.visible, state.animating]);
  const onEnd = useCallback(event => {
    if (event.defaultPrevented) return;
    if (!isSelfTarget(event)) return;
    if (!state.animating) return; // Ignores number animated

    if (state.animated === true) {
      state.stopAnimation();
    }
  }, [state.animated, state.animating, state.stopAnimation]);
  const onTransitionEndProp = useEventCallback(props.onTransitionEnd);
  const onTransitionEnd = useCallback(event => {
    onTransitionEndProp(event);
    onEnd(event);
  }, [onTransitionEndProp, onEnd]);
  const onAnimationEndProp = useEventCallback(props.onAnimationEnd);
  const onAnimationEnd = useCallback(event => {
    onAnimationEndProp(event);
    onEnd(event);
  }, [onAnimationEndProp, onEnd]);
  const style = state.mounted || props.hidden === false ? props.style : { ...props.style,
    display: "none"
  };
  props = {
    id,
    "data-enter": transition === "enter" ? "" : undefined,
    "data-leave": transition === "leave" ? "" : undefined,
    hidden: !state.mounted,
    ...props,
    ref: useForkRef(id ? state.setContentElement : null, props.ref),
    onTransitionEnd,
    onAnimationEnd,
    style
  };
  return props;
});
/**
 * A component that renders an element that can be shown or hidden.
 * @see https://ariakit.org/components/disclosure
 * @example
 * ```jsx
 * const disclosure = useDisclosureState();
 * <Disclosure state={disclosure}>Disclosure</Disclosure>
 * <DisclosureContent state={disclosure}>Content</DisclosureContent>
 * ```
 */

const DisclosureContent = createComponent(props => {
  const htmlProps = useDisclosureContent(props);
  return createElement("div", htmlProps);
});

export { DisclosureContent, useDisclosureContent };
