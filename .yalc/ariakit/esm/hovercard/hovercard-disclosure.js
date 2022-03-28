import { useState, useEffect, useCallback } from 'react';
import { contains } from 'ariakit-utils/dom';
import { addGlobalEventListener } from 'ariakit-utils/events';
import { useEventCallback, useForkRef } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useDialogDisclosure } from '../dialog/dialog-disclosure.js';
import { jsx } from 'react/jsx-runtime';
import { useVisuallyHidden } from '../visually-hidden/visually-hidden.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a hidden disclosure button that will be visible
 * when the hovercard anchor element (`HovercardAnchor`) receives keyboard
 * focus. The user can then navigate to the button to open the hovercard when
 * using the keyboard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const state = useHovercardState();
 * const props = useHovercardDisclosure({ state });
 * <HovercardAnchor state={state}>@username</HovercardAnchor>
 * <Role {...props} />
 * <Hovercard state={state}>Details</Hovercard>
 * ```
 */
const useHovercardDisclosure = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const [visible, setVisible] = useState(false); // Listens to blur events on the whole document and hides the hovercard
  // disclosure if either the hovercard, the anchor or the disclosure button
  // itself loses focus.

  useEffect(() => {
    if (!visible) return;

    const onBlur = event => {
      const nextActiveElement = event.relatedTarget;

      if (nextActiveElement) {
        const anchor = state.anchorRef.current;
        const popover = state.popoverRef.current;
        const disclosure = state.disclosureRef.current;
        if (anchor && contains(anchor, nextActiveElement)) return;
        if (popover && contains(popover, nextActiveElement)) return;
        if (disclosure && contains(disclosure, nextActiveElement)) return; // When the portal prop is set to true on the Hovercard component,
        // it's going to render focus trap elements outside of the portal.
        // These elements may transfer focus to the disclosure button, so we
        // also ignore them here.

        if (nextActiveElement.hasAttribute("data-focus-trap")) return;
      }

      setVisible(false);
    };

    return addGlobalEventListener("focusout", onBlur, true);
  }, [visible, state.anchorRef, state.popoverRef, state.disclosureRef]); // Shows the hovercard disclosure when the anchor receives keyboard focus.

  useEffect(() => {
    const anchor = state.anchorRef.current;
    if (!anchor) return;
    const observer = new MutationObserver(() => {
      if (!anchor.hasAttribute("data-focus-visible")) return;
      setVisible(true);
    });
    observer.observe(anchor, {
      attributeFilter: ["data-focus-visible"]
    });
    return () => observer.disconnect();
  }, [state.anchorRef]);
  const onClickProp = useEventCallback(props.onClick); // By default, hovercards don't receive focus when they are shown. When the
  // disclosure element is clicked, though, we want it to behave like a
  // popover, so we set the autoFocusOnShow prop to true.

  const onClick = useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    state.setAutoFocusOnShow(true);
  }, [onClickProp, state.setAutoFocusOnShow]);
  const onFocusProp = useEventCallback(props.onFocus); // Since the disclosure button is only visually hidden, it may receive focus
  // when the user tabs to it. So we make sure it's visible when that happens.

  const onFocus = useCallback(event => {
    onFocusProp(event);
    if (event.defaultPrevented) return;
    setVisible(true);
  }, [onFocusProp]);
  const {
    style
  } = useVisuallyHidden();

  if (!visible) {
    props = { ...props,
      style: { ...style,
        ...props.style
      }
    };
  }

  const children = /*#__PURE__*/jsx("svg", {
    display: "block",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5pt",
    viewBox: "0 0 16 16",
    height: "1em",
    width: "1em",
    children: /*#__PURE__*/jsx("polyline", {
      points: "4,6 8,10 12,6"
    })
  });

  props = {
    children,
    ...props,
    ref: useForkRef(state.disclosureRef, props.ref),
    onClick,
    onFocus
  };
  props = useDialogDisclosure({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a hidden disclosure button that will be visible when
 * the hovercard anchor element (`HovercardAnchor`) receives keyboard focus. The
 * user can then navigate to the button to open the hovercard when using the
 * keyboard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <HovercardAnchor state={hovercard}>@username</HovercardAnchor>
 * <HovercardDisclosure state={hovercard} />
 * <Hovercard state={hovercard}>Details</Hovercard>
 * ```
 */

const HovercardDisclosure = createComponent(props => {
  const htmlProps = useHovercardDisclosure(props);
  return createElement("button", htmlProps);
});

export { HovercardDisclosure, useHovercardDisclosure };