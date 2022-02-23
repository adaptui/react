import { useRef, useEffect, useState, useCallback } from 'react';
import { isButton } from 'ariakit-utils/dom';
import { addGlobalEventListener, isPortalEvent, queueBeforeEvent, isSelfTarget, isFocusEventOutside } from 'ariakit-utils/events';
import { isFocusable, focusIfNeeded } from 'ariakit-utils/focus';
import { useEventCallback, useSafeLayoutEffect, useTagName, useForkRef } from 'ariakit-utils/hooks';
import { queueMicrotask } from 'ariakit-utils/misc';
import { isApple, isSafari, isFirefox } from 'ariakit-utils/platform';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';

const isSafariOrFirefoxOnAppleDevice = isApple() && (isSafari() || isFirefox());
const alwaysFocusVisibleInputTypes = ["text", "search", "url", "tel", "email", "password", "number", "date", "month", "week", "time", "datetime", "datetime-local"];

function isAlwaysFocusVisible(element) {
  const {
    tagName,
    readOnly,
    type
  } = element;
  if (tagName === "TEXTAREA" && !readOnly) return true;
  if (tagName === "SELECT" && !readOnly) return true;

  if (tagName === "INPUT" && !readOnly) {
    return alwaysFocusVisibleInputTypes.includes(type);
  }

  if (element.isContentEditable) return true;
  const role = element.getAttribute("role");
  if (role === "combobox") return true;
  return false;
}

function getLabels(element) {
  if ("labels" in element) {
    return element.labels;
  }

  return null;
}

function isNativeCheckboxOrRadio(element) {
  const tagName = element.tagName.toLowerCase();

  if (tagName === "input" && element.type) {
    return element.type === "radio" || element.type === "checkbox";
  }

  return false;
}

function isNativeTabbable(tagName) {
  if (!tagName) return true;
  return tagName === "button" || tagName === "input" || tagName === "select" || tagName === "textarea" || tagName === "a";
}

function supportsDisabledAttribute(tagName) {
  if (!tagName) return true;
  return tagName === "button" || tagName === "input" || tagName === "select" || tagName === "textarea";
}

function getTabIndex(focusable, trulyDisabled, nativeTabbable, supportsDisabled, tabIndexProp) {
  if (!focusable) {
    return tabIndexProp;
  }

  if (trulyDisabled) {
    if (nativeTabbable && !supportsDisabled) {
      // Anchor, audio and video tags don't support the `disabled` attribute.
      // We must pass tabIndex={-1} so they don't receive focus on tab.
      return -1;
    } // Elements that support the `disabled` attribute don't need tabIndex.


    return;
  }

  if (nativeTabbable) {
    // If the element is enabled and it's natively tabbable, we don't need to
    // specify a tabIndex attribute unless it's explicitly set by the user.
    return tabIndexProp;
  } // If the element is enabled and is not natively tabbable, we have to
  // fallback tabIndex={0}.


  return tabIndexProp || 0;
}

function useDisableEvent(eventProp, disabled) {
  const onEventProp = useEventCallback(eventProp);
  return useCallback(event => {
    onEventProp(event);
    if (event.defaultPrevented) return;

    if (disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  }, [onEventProp, disabled]);
} // isKeyboardModality should be true by defaault.


let isKeyboardModality = true;

function onGlobalMouseDown(event) {
  const target = event.target;

  if (target && "hasAttribute" in target) {
    // If the target element is already focus-visible, we keep the keyboard
    // modality.
    if (!target.hasAttribute("data-focus-visible")) {
      isKeyboardModality = false;
    }
  }
}

function onGlobalKeyDown(event) {
  if (event.metaKey) return;
  if (event.ctrlKey) return;
  isKeyboardModality = true;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that can be focused.
 * @see https://ariakit.org/components/focusable
 * @example
 * ```jsx
 * const props = useFocusable();
 * <Role {...props}>Focusable</Role>
 * ```
 */


const useFocusable = createHook(_ref => {
  let {
    focusable = true,
    accessibleWhenDisabled,
    autoFocus,
    onFocusVisible,
    ...props
  } = _ref;
  const ref = useRef(null); // Add global event listeners to determine whether the user is using a
  // keyboard to navigate the site or not.

  useEffect(() => {
    if (!focusable) return;
    addGlobalEventListener("mousedown", onGlobalMouseDown, true);
    addGlobalEventListener("keydown", onGlobalKeyDown, true);
  }, [focusable]); // Safari and Firefox on Apple devices don't focus on checkboxes or radio
  // buttons when their labels are clicked. This effect will make sure the
  // focusable element is focused on label click.

  if (isSafariOrFirefoxOnAppleDevice) {
    useEffect(() => {
      if (!focusable) return;
      const element = ref.current;
      if (!element) return;
      if (!isNativeCheckboxOrRadio(element)) return;
      const labels = getLabels(element);
      if (!labels) return;

      const onMouseUp = () => queueMicrotask(() => element.focus());

      labels.forEach(label => label.addEventListener("mouseup", onMouseUp));
      return () => {
        labels.forEach(label => label.removeEventListener("mouseup", onMouseUp));
      };
    }, [focusable]);
  }

  const disabled = focusable && props.disabled;
  const trulyDisabled = !!disabled && !accessibleWhenDisabled;
  const [focusVisible, setFocusVisible] = useState(false); // When the focusable element is disabled, it doesn't trigger a blur event
  // so we can't set focusVisible to false there. Instead, we have to do it
  // here by checking the element's disabled attribute.

  useEffect(() => {
    if (!focusable) return;

    if (trulyDisabled && focusVisible) {
      setFocusVisible(false);
    }
  }, [focusable, trulyDisabled, focusVisible]); // When an element that has focus becomes hidden, it doesn't trigger a blur
  // event so we can't set focusVisible to false there. We observe the element
  // and check if it's still focusable. Otherwise, we set focusVisible to
  // false.

  useEffect(() => {
    if (!focusable) return;
    if (!focusVisible) return;
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(() => {
      if (!isFocusable(element)) {
        setFocusVisible(false);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [focusable, focusVisible]); // Disable events when the element is disabled.

  const onKeyPressCapture = useDisableEvent(props.onKeyPressCapture, disabled);
  const onMouseDownCapture = useDisableEvent(props.onMouseDownCapture, disabled);
  const onClickCapture = useDisableEvent(props.onClickCapture, disabled);
  const onMouseDownProp = useEventCallback(props.onMouseDown);
  const onMouseDown = useCallback(event => {
    onMouseDownProp(event);
    if (event.defaultPrevented) return;
    if (!focusable) return;
    const element = event.currentTarget; // Safari and Firefox on MacOS don't focus on buttons on mouse down like
    // other browsers/platforms. Instead, they focus on the closest
    // focusable ancestor element, which is ultimately the body element. So
    // we make sure to give focus to the tabbable element on mouse down so
    // it works consistently across browsers.

    if (!isSafariOrFirefoxOnAppleDevice) return;
    if (isPortalEvent(event)) return;
    if (!isButton(element) && !isNativeCheckboxOrRadio(element)) return; // We can't focus right away after on mouse down, otherwise it would
    // prevent drag events from happening. So we queue the focus to the next
    // animation frame, but always before the next mouseup event. The
    // mouseup event might happen before the next animation frame on touch
    // devices or by tapping on a MacBook's trackpad, for example.

    queueBeforeEvent(element, "mouseup", () => focusIfNeeded(element));
  }, [onMouseDownProp, focusable]);
  const onFocusVisibleProp = useEventCallback(onFocusVisible);
  const onFocusVisibleEvent = useCallback(event => {
    onFocusVisibleProp(event);
    if (event.defaultPrevented) return;
    if (!focusable) return;
    setFocusVisible(true);
  }, [onFocusVisibleProp, focusable]);
  const onKeyDownCaptureProp = useEventCallback(props.onKeyDownCapture);
  const onKeyDownCapture = useCallback(event => {
    onKeyDownCaptureProp(event);
    if (!focusable) return;
    if (event.metaKey) return;
    if (event.altKey) return;
    if (event.ctrlKey) return;
    if (!isSelfTarget(event)) return;

    if (!focusVisible && !event.defaultPrevented) {
      // Triggers onFocusVisible when the element has initially received
      // non-keyboard focus, but then a key has been pressed.
      onFocusVisibleEvent(event);
    }
  }, [onKeyDownCaptureProp, focusable, focusVisible, onFocusVisibleEvent]);
  const onFocusCaptureProp = useEventCallback(props.onFocusCapture);
  const onFocusCapture = useCallback(event => {
    onFocusCaptureProp(event);
    if (event.defaultPrevented) return;
    if (!focusable) return;

    if (!isSelfTarget(event)) {
      setFocusVisible(false);
      return;
    }

    if (isKeyboardModality || isAlwaysFocusVisible(event.target)) {
      onFocusVisibleEvent(event);
    } else {
      setFocusVisible(false);
    }
  }, [onFocusCaptureProp, focusable, onFocusVisibleEvent]);
  const onBlurProp = useEventCallback(props.onBlur); // Note: Can't use onBlurCapture here otherwise it will not work with
  // CompositeItem's with the virtualFocus state set to true.

  const onBlur = useCallback(event => {
    onBlurProp(event);
    if (!focusable) return;

    if (isFocusEventOutside(event)) {
      setFocusVisible(false);
    }
  }, [onBlurProp, focusable]); // The native autoFocus prop is problematic in many ways. For example, when
  // an element has the native autofocus attribute, the focus event will be
  // triggered before React effects (even layout effects) and before refs are
  // assigned. This means we won't have access to the element's ref or
  // anything else that's set up by React effects on the onFocus event. So we
  // don't pass the autoFocus prop to the element and instead manually focus
  // the element when it's mounted. The order in which this effect runs also
  // matters. It must be declared here after all the event callbacks above so
  // the event callback effects run before this one. See
  // https://twitter.com/diegohaz/status/1408180632933388289

  useSafeLayoutEffect(() => {
    if (!focusable) return;

    if (autoFocus) {
      var _ref$current;

      (_ref$current = ref.current) == null ? void 0 : _ref$current.focus();
    }
  }, [focusable, autoFocus]);
  const tagName = useTagName(ref, props.as);
  const nativeTabbable = focusable && isNativeTabbable(tagName);
  const supportsDisabled = focusable && supportsDisabledAttribute(tagName);
  const style = trulyDisabled ? {
    pointerEvents: "none",
    ...props.style
  } : props.style;
  props = {
    "data-focus-visible": focusable && focusVisible ? "" : undefined,
    "aria-disabled": disabled ? true : undefined,
    ...props,
    ref: useForkRef(ref, props.ref),
    style,
    tabIndex: getTabIndex(focusable, trulyDisabled, nativeTabbable, supportsDisabled, props.tabIndex),
    disabled: supportsDisabled && trulyDisabled ? true : undefined,
    // TODO: Test Focusable contentEditable.
    contentEditable: disabled ? undefined : props.contentEditable,
    onKeyPressCapture,
    onClickCapture,
    onMouseDownCapture,
    onMouseDown,
    onKeyDownCapture,
    onFocusCapture,
    onBlur
  };
  return props;
});
/**
 * A component that renders an element that can be focused.
 * @see https://ariakit.org/components/focusable
 * @example
 * ```jsx
 * <Focusable>Focusable</Focusable>
 * ```
 */

const Focusable = createComponent(props => {
  props = useFocusable(props);
  return createElement("div", props);
});

export { Focusable, useFocusable };
