import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useControlledState, useLiveRef } from 'ariakit-utils/hooks';

/**
 * Provides state for the `Disclosure` components.
 * @example
 * ```jsx
 * const disclosure = useDisclosureState();
 * <Disclosure state={disclosure}>Disclosure</Disclosure>
 * <DisclosureContent state={disclosure}>Content</DisclosureContent>
 * ```
 */
function useDisclosureState(_temp) {
  var _props$defaultVisible;

  let {
    animated = false,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const disclosureRef = useRef(null);
  const [visible, setVisible] = useControlledState((_props$defaultVisible = props.defaultVisible) != null ? _props$defaultVisible : false, props.visible, props.setVisible);
  const [contentElement, setContentElement] = useState(null);
  const [animating, setAnimating] = useState(false);
  const visibleRef = useLiveRef(visible);
  const mounted = visible || animating;

  if (animated && !animating && visibleRef.current !== visible) {
    setAnimating(true);
  }

  useEffect(() => {
    if (typeof animated === "number" && animating) {
      const timeout = setTimeout(() => setAnimating(false), animated);
      return () => clearTimeout(timeout);
    } // TODO: warn when 8 seconds have been passed


    return; // We're also listening to the visible state here although it's not used in
    // the effect. This is so we can clear previous timeouts and avoid hiding
    // the content when the disclosure button gets clicked several times in
    // sequence.
  }, [animated, animating, visible]);
  const show = useCallback(() => setVisible(true), [setVisible]);
  const hide = useCallback(() => setVisible(false), [setVisible]);
  const toggle = useCallback(() => setVisible(v => !v), [setVisible]);
  const stopAnimation = useCallback(() => setAnimating(false), []);
  const state = useMemo(() => ({
    disclosureRef,
    visible,
    mounted,
    animated,
    animating,
    contentElement,
    setContentElement,
    setVisible,
    show,
    hide,
    toggle,
    stopAnimation
  }), [visible, mounted, animated, animating, contentElement, setContentElement, setVisible, show, hide, toggle, stopAnimation]);
  return state;
}

export { useDisclosureState };
