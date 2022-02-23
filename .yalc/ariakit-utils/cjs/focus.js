'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dom = require('./dom.js');

const selector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), " + "textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], " + "iframe, object, embed, area[href], audio[controls], video[controls], " + "[contenteditable]:not([contenteditable='false'])";

function hasNegativeTabIndex(element) {
  const tabIndex = parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
/**
 * Checks whether `element` is focusable or not.
 * @example
 * isFocusable(document.querySelector("input")); // true
 * isFocusable(document.querySelector("input[tabindex='-1']")); // true
 * isFocusable(document.querySelector("input[hidden]")); // false
 * isFocusable(document.querySelector("input:disabled")); // false
 */


function isFocusable(element) {
  return dom.matches(element, selector) && dom.isVisible(element);
}
/**
 * Checks whether `element` is tabbable or not.
 * @example
 * isTabbable(document.querySelector("input")); // true
 * isTabbable(document.querySelector("input[tabindex='-1']")); // false
 * isTabbable(document.querySelector("input[hidden]")); // false
 * isTabbable(document.querySelector("input:disabled")); // false
 */

function isTabbable(element) {
  return isFocusable(element) && !hasNegativeTabIndex(element);
}
/**
 * Returns all the focusable elements in `container`.
 */

function getAllFocusableIn(container, includeContainer) {
  const elements = Array.from(container.querySelectorAll(selector));

  if (includeContainer) {
    elements.unshift(container);
  }

  const focusableElements = elements.filter(isFocusable);
  focusableElements.forEach((element, i) => {
    if (dom.isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      focusableElements.splice(i, 1, ...getAllFocusableIn(frameBody));
    }
  });
  return focusableElements;
}
/**
 * Returns all the focusable elements in the document.
 */

function getAllFocusable(includeBody) {
  return getAllFocusableIn(document.body, includeBody);
}
/**
 * Returns the first focusable element in `container`.
 */

function getFirstFocusableIn(container, includeContainer) {
  const [first] = getAllFocusableIn(container, includeContainer);
  return first || null;
}
/**
 * Returns the first focusable element in the document.
 */

function getFirstFocusable(includeBody) {
  return getFirstFocusableIn(document.body, includeBody);
}
/**
 * Returns all the tabbable elements in `container`, including the container
 * itself.
 */

function getAllTabbableIn(container, includeContainer, fallbackToFocusable) {
  const elements = Array.from(container.querySelectorAll(selector));
  const tabbableElements = elements.filter(isTabbable);

  if (includeContainer && isTabbable(container)) {
    tabbableElements.unshift(container);
  }

  tabbableElements.forEach((element, i) => {
    if (dom.isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getAllTabbableIn(frameBody, false, fallbackToFocusable);
      tabbableElements.splice(i, 1, ...allFrameTabbable);
    }
  });

  if (!tabbableElements.length && fallbackToFocusable) {
    return elements;
  }

  return tabbableElements;
}
/**
 * Returns all the tabbable elements in the document.
 */

function getAllTabbable(fallbackToFocusable) {
  return getAllTabbableIn(document.body, false, fallbackToFocusable);
}
/**
 * Returns the first tabbable element in `container`, including the container
 * itself if it's tabbable.
 */

function getFirstTabbableIn(container, includeContainer, fallbackToFocusable) {
  const [first] = getAllTabbableIn(container, includeContainer, fallbackToFocusable);
  return first || null;
}
/**
 * Returns the first tabbable element in the document.
 */

function getFirstTabbable(fallbackToFocusable) {
  return getFirstTabbableIn(document.body, false, fallbackToFocusable);
}
/**
 * Returns the last tabbable element in `container`, including the container
 * itself if it's tabbable.
 */

function getLastTabbableIn(container, includeContainer, fallbackToFocusable) {
  const allTabbable = getAllTabbableIn(container, includeContainer, fallbackToFocusable);
  return allTabbable[allTabbable.length - 1] || null;
}
/**
 * Returns the last tabbable element in the document.
 */

function getLastTabbable(fallbackToFocusable) {
  return getLastTabbableIn(document.body, false, fallbackToFocusable);
}
/**
 * Returns the next tabbable element in `container`.
 */

function getNextTabbableIn(container, includeContainer, fallbackToFirst, fallbackToFocusable) {
  const activeElement = dom.getActiveElement(container);
  const allFocusable = getAllFocusableIn(container, includeContainer);
  const activeIndex = allFocusable.indexOf(activeElement);
  const nextFocusableElements = allFocusable.slice(activeIndex + 1);
  return nextFocusableElements.find(isTabbable) || (fallbackToFirst ? allFocusable.find(isTabbable) : null) || (fallbackToFocusable ? nextFocusableElements[0] : null) || null;
}
/**
 * Returns the next tabbable element in the document.
 */

function getNextTabbable(fallbackToFirst, fallbackToFocusable) {
  return getNextTabbableIn(document.body, false, fallbackToFirst, fallbackToFocusable);
}
/**
 * Returns the previous tabbable element in `container`.
 *
 */

function getPreviousTabbableIn(container, includeContainer, fallbackToLast, fallbackToFocusable) {
  const activeElement = dom.getActiveElement(container);
  const allFocusable = getAllFocusableIn(container, includeContainer).reverse();
  const activeIndex = allFocusable.indexOf(activeElement);
  const previousFocusableElements = allFocusable.slice(activeIndex + 1);
  return previousFocusableElements.find(isTabbable) || (fallbackToLast ? allFocusable.find(isTabbable) : null) || (fallbackToFocusable ? previousFocusableElements[0] : null) || null;
}
/**
 * Returns the previous tabbable element in the document.
 */

function getPreviousTabbable(fallbackToFirst, fallbackToFocusable) {
  return getPreviousTabbableIn(document.body, false, fallbackToFirst, fallbackToFocusable);
}
/**
 * Returns the closest focusable element.
 */

function getClosestFocusable(element) {
  while (element && !isFocusable(element)) {
    element = dom.closest(element, selector);
  }

  return element || null;
}
/**
 * Checks if `element` has focus. Elements that are referenced by
 * `aria-activedescendant` are also considered.
 * @example
 * hasFocus(document.getElementById("id"));
 */

function hasFocus(element) {
  const activeElement = dom.getActiveElement(element);
  if (!activeElement) return false;
  if (activeElement === element) return true;
  const activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  return activeDescendant === element.id;
}
/**
 * Checks if `element` has focus within. Elements that are referenced by
 * `aria-activedescendant` are also considered.
 * @example
 * hasFocusWithin(document.getElementById("id"));
 */

function hasFocusWithin(element) {
  const activeElement = dom.getActiveElement(element);
  if (!activeElement) return false;
  if (dom.contains(element, activeElement)) return true;
  const activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  if (!("id" in element)) return false;
  if (activeDescendant === element.id) return true;
  return !!element.querySelector("#" + CSS.escape(activeDescendant));
}
/**
 * Focus on an element only if it's not already focused.
 */

function focusIfNeeded(element) {
  if (!hasFocusWithin(element) && isFocusable(element)) {
    element.focus();
  }
}
/**
 * Disable focus on `element`.
 */

function disableFocus(element) {
  var _element$getAttribute;

  const currentTabindex = (_element$getAttribute = element.getAttribute("tabindex")) != null ? _element$getAttribute : "";
  element.setAttribute("data-tabindex", currentTabindex);
  element.setAttribute("tabindex", "-1");
}
/**
 * Makes elements inside container not tabbable.
 */

function disableFocusIn(container, includeContainer) {
  const tabbableElements = getAllTabbableIn(container, includeContainer);
  tabbableElements.forEach(disableFocus);
}
/**
 * Restores tabbable elements inside container that were affected by
 * disableFocusIn.
 */

function restoreFocusIn(container) {
  const elements = container.querySelectorAll("[data-tabindex]");

  const restoreTabIndex = element => {
    const tabindex = element.getAttribute("data-tabindex");
    element.removeAttribute("data-tabindex");

    if (tabindex) {
      element.setAttribute("tabindex", tabindex);
    } else {
      element.removeAttribute("tabindex");
    }
  };

  if (container.hasAttribute("data-tabindex")) {
    restoreTabIndex(container);
  }

  elements.forEach(restoreTabIndex);
}
/**
 * Ensures `element` will receive focus if it's not already.
 * @example
 * ensureFocus(document.activeElement); // does nothing
 *
 * const element = document.querySelector("input");
 *
 * ensureFocus(element); // focuses element
 * ensureFocus(element, { preventScroll: true }); // focuses element preventing scroll jump
 *
 * function isActive(el) {
 *   return el.dataset.active === "true";
 * }
 *
 * ensureFocus(document.querySelector("[data-active='true']"), { isActive }); // does nothing
 *
 * @returns {number} `requestAnimationFrame` call ID so it can be passed to `cancelAnimationFrame` if needed.
 */

function ensureFocus(element, _temp) {
  let {
    preventScroll,
    isActive = hasFocus
  } = _temp === void 0 ? {} : _temp;
  // TODO: Try to use queueMicrotask before requestAnimationFrame and dispatch
  // focus events if the element is not focusable?
  if (isActive(element)) return -1;
  element.focus({
    preventScroll
  });
  if (isActive(element)) return -1;
  return requestAnimationFrame(() => {
    element.focus({
      preventScroll
    });
  });
}

exports.disableFocus = disableFocus;
exports.disableFocusIn = disableFocusIn;
exports.ensureFocus = ensureFocus;
exports.focusIfNeeded = focusIfNeeded;
exports.getAllFocusable = getAllFocusable;
exports.getAllFocusableIn = getAllFocusableIn;
exports.getAllTabbable = getAllTabbable;
exports.getAllTabbableIn = getAllTabbableIn;
exports.getClosestFocusable = getClosestFocusable;
exports.getFirstFocusable = getFirstFocusable;
exports.getFirstFocusableIn = getFirstFocusableIn;
exports.getFirstTabbable = getFirstTabbable;
exports.getFirstTabbableIn = getFirstTabbableIn;
exports.getLastTabbable = getLastTabbable;
exports.getLastTabbableIn = getLastTabbableIn;
exports.getNextTabbable = getNextTabbable;
exports.getNextTabbableIn = getNextTabbableIn;
exports.getPreviousTabbable = getPreviousTabbable;
exports.getPreviousTabbableIn = getPreviousTabbableIn;
exports.hasFocus = hasFocus;
exports.hasFocusWithin = hasFocusWithin;
exports.isFocusable = isFocusable;
exports.isTabbable = isTabbable;
exports.restoreFocusIn = restoreFocusIn;
