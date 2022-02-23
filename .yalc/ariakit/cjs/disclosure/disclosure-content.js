'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var events = require('ariakit-utils/events');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');

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
const useDisclosureContent = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const id = hooks.useId(props.id);
  const [transition, setTransition] = react.useState(null);
  const raf = react.useRef(0);
  react.useEffect(() => {
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
  const onEnd = react.useCallback(event => {
    if (event.defaultPrevented) return;
    if (!events.isSelfTarget(event)) return;
    if (!state.animating) return; // Ignores number animated

    if (state.animated === true) {
      state.stopAnimation();
    }
  }, [state.animated, state.animating, state.stopAnimation]);
  const onTransitionEndProp = hooks.useEventCallback(props.onTransitionEnd);
  const onTransitionEnd = react.useCallback(event => {
    onTransitionEndProp(event);
    onEnd(event);
  }, [onTransitionEndProp, onEnd]);
  const onAnimationEndProp = hooks.useEventCallback(props.onAnimationEnd);
  const onAnimationEnd = react.useCallback(event => {
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
    ref: hooks.useForkRef(id ? state.setContentElement : null, props.ref),
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

const DisclosureContent = system.createComponent(props => {
  const htmlProps = useDisclosureContent(props);
  return system.createElement("div", htmlProps);
});

exports.DisclosureContent = DisclosureContent;
exports.useDisclosureContent = useDisclosureContent;
