import { contains } from './dom.js';

/**
 * Returns `true` if `event` has been fired within a React Portal element.
 */

function isPortalEvent(event) {
  return !contains(event.currentTarget, event.target);
}
/**
 * Returns `true` if `event.target` and `event.currentTarget` are the same.
 */

function isSelfTarget(event) {
  return event.target === event.currentTarget;
}
/**
 * Creates and dispatches an event.
 * @example
 * fireEvent(document.getElementById("id"), "blur", {
 *   bubbles: true,
 *   cancelable: true,
 * });
 */

function fireEvent(element, type, eventInit) {
  const event = new Event(type, eventInit);
  return element.dispatchEvent(event);
}
/**
 * Creates and dispatches a blur event.
 * @example
 * fireBlurEvent(document.getElementById("id"));
 */

function fireBlurEvent(element, eventInit) {
  const event = new FocusEvent("blur", eventInit);
  const defaultAllowed = element.dispatchEvent(event);
  const bubbleInit = { ...eventInit,
    bubbles: true
  };
  element.dispatchEvent(new FocusEvent("focusout", bubbleInit));
  return defaultAllowed;
}
/**
 * Creates and dispatches a keyboard event.
 * @example
 * fireKeyboardEvent(document.getElementById("id"), "keydown", {
 *   key: "ArrowDown",
 *   shiftKey: true,
 * });
 */

function fireKeyboardEvent(element, type, eventInit) {
  const event = new KeyboardEvent(type, eventInit);
  return element.dispatchEvent(event);
}
/**
 * Creates and dispatches a click event.
 * @example
 * fireClickEvent(document.getElementById("id"));
 */

function fireClickEvent(element, eventInit) {
  const event = typeof PointerEvent !== "undefined" ? new PointerEvent("click", eventInit) : new MouseEvent("click", eventInit);
  return element.dispatchEvent(event);
}
/**
 * Checks whether the focus/blur event is happening from/to outside of the
 * container element.
 * @example
 * const element = document.getElementById("id");
 * element.addEventListener("blur", (event) => {
 *   if (isFocusEventOutside(event)) {
 *     // ...
 *   }
 * });
 */

function isFocusEventOutside(event, container) {
  const containerElement = container || event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !contains(containerElement, relatedTarget);
}
/**
 * Runs a callback on the next animation frame, but before a certain event.
 */

function queueBeforeEvent(element, type, callback) {
  const raf = requestAnimationFrame(() => {
    element.removeEventListener(type, callImmediately, true);
    callback();
  });

  const callImmediately = () => {
    cancelAnimationFrame(raf);
    callback();
  }; // By listening to the event in the capture phase, we make sure the callback
  // is fired before the respective React events.


  element.addEventListener(type, callImmediately, {
    once: true,
    capture: true
  });
  return raf;
}
/**
 * Adds a global event listener, including on child frames.
 */

function addGlobalEventListener(type, listener, options, scope) {
  if (scope === void 0) {
    scope = window;
  }

  // Prevent errors from "sandbox" frames.
  try {
    scope.document.addEventListener(type, listener, options);
  } catch (e) {}

  const listeners = [];

  for (let i = 0; i < scope.frames.length; i += 1) {
    const frameWindow = scope.frames[i];

    if (frameWindow) {
      listeners.push(addGlobalEventListener(type, listener, options, frameWindow));
    }
  }

  const removeEventListener = () => {
    try {
      scope.document.removeEventListener(type, listener, options);
    } catch (e) {}

    listeners.forEach(listener => listener());
  };

  return removeEventListener;
}

export { addGlobalEventListener, fireBlurEvent, fireClickEvent, fireEvent, fireKeyboardEvent, isFocusEventOutside, isPortalEvent, isSelfTarget, queueBeforeEvent };
