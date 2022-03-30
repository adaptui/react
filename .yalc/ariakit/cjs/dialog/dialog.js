'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dom = require('ariakit-utils/dom');
var events = require('ariakit-utils/events');
var focus = require('ariakit-utils/focus');
var hooks = require('ariakit-utils/hooks');
var misc = require('ariakit-utils/misc');
var platform = require('ariakit-utils/platform');
var system = require('ariakit-utils/system');
var disclosure_disclosureContent = require('../disclosure/disclosure-content.js');
var focusable_focusable = require('../focusable/focusable.js');
var heading_headingLevel = require('../heading/heading-level.js');
var portal_portal = require('../portal/portal.js');
var jsxRuntime = require('react/jsx-runtime');
var dialogContext = require('../dialog-context-f7057db5.js');

function usePreviousMouseDownRef(enabled) {
  const previousMouseDownRef = react.useRef();
  react.useEffect(() => {
    if (!enabled) return;

    const onMouseDown = event => {
      previousMouseDownRef.current = event.target;
    };

    return events.addGlobalEventListener("mousedown", onMouseDown);
  }, [enabled]);
  return previousMouseDownRef;
}

function DialogBackdrop(_ref) {
  var _state$contentElement;

  let {
    state,
    backdrop,
    backdropProps,
    hideOnInteractOutside = true,
    hideOnEscape = true,
    children
  } = _ref;
  const ref = react.useRef(null);
  const onClickProp = hooks.useEventCallback(backdropProps == null ? void 0 : backdropProps.onClick);
  const onKeyDownProp = hooks.useEventCallback(backdropProps == null ? void 0 : backdropProps.onKeyDown);
  const previousMouseDownRef = usePreviousMouseDownRef(state.mounted);
  const Component = typeof backdrop !== "boolean" ? backdrop || "div" : "div";
  state = react.useMemo(() => ({ ...state,
    // Override the setContentElement method to prevent the backdrop from
    // overwriting the dialog's content element.
    setContentElement: misc.noop
  }), [state]);
  hooks.useSafeLayoutEffect(() => {
    const backdrop = ref.current;
    const dialog = state.contentElement;
    if (!backdrop) return;
    if (!dialog) return;
    backdrop.style.zIndex = getComputedStyle(dialog).zIndex;
  }, [state.contentElement]);
  const hideOnInteractOutsideProp = hooks.useBooleanEventCallback(hideOnInteractOutside);
  const onClick = react.useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    if (!events.isSelfTarget(event)) return;
    if (previousMouseDownRef.current !== event.currentTarget) return;
    if (!hideOnInteractOutsideProp(event)) return;
    event.stopPropagation();
    state.hide();
  }, [onClickProp, hideOnInteractOutsideProp, state.hide]);
  const hideOnEscapeProp = hooks.useBooleanEventCallback(hideOnEscape); // When hideOnInteractOutside is false and the backdrop is clicked, the
  // backdrop will receive focus (because we set the tabIndex on it). Therefore,
  // the Escape key will not be captured by the Dialog component. So we listen
  // to it here.

  const onKeyDown = react.useCallback(event => {
    onKeyDownProp(event);
    if (event.defaultPrevented) return;
    if (event.key !== "Escape") return;
    if (!events.isSelfTarget(event)) return;
    if (!hideOnEscapeProp(event)) return;
    state.hide();
  }, [onKeyDownProp, hideOnEscapeProp, state.hide]);
  const props = disclosure_disclosureContent.useDisclosureContent({
    state,
    id: undefined,
    role: "presentation",
    tabIndex: -1,
    ...backdropProps,
    ref: hooks.useForkRef(backdropProps == null ? void 0 : backdropProps.ref, ref),
    onClick,
    onKeyDown,
    style: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...(backdropProps == null ? void 0 : backdropProps.style)
    }
  });
  return /*#__PURE__*/jsxRuntime.jsx(Component, { ...props,
    "data-backdrop": (_state$contentElement = state.contentElement) == null ? void 0 : _state$contentElement.id,
    children: children
  });
}

// We don't need to walk through certain tags.
const ignoreTags = ["SCRIPT", "STYLE"];
function isValidElement(element, ignoredElements) {
  if (ignoreTags.includes(element.tagName)) return false;
  return !ignoredElements.some(enabledElement => enabledElement && dom.contains(element, enabledElement));
}
function walkTreeOutside(elements, callback) {
  for (let element of elements) {
    const document = dom.getDocument(element); // Loops through the parent elements and then through each of their
    // children.

    while ((_element = element) != null && _element.parentElement && element !== document.body) {
      var _element;

      for (const child of element.parentElement.children) {
        if (isValidElement(child, elements)) {
          callback(child);
        }
      }

      element = element.parentElement;
    }
  }
}

function disableElement$1(element) {
  const previousAriaHidden = element.getAttribute("aria-hidden") || "";
  element.setAttribute("aria-hidden", "true");

  const enableElement = () => {
    if (previousAriaHidden) {
      element.setAttribute("aria-hidden", previousAriaHidden);
    } else {
      element.removeAttribute("aria-hidden");
    }
  };

  return enableElement;
}

function disableAccessibilityTreeOutside() {
  const cleanups = [];

  for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
    elements[_key] = arguments[_key];
  }

  walkTreeOutside(elements, element => {
    cleanups.unshift(disableElement$1(element));
  });

  const restoreAccessibilityTree = () => {
    cleanups.forEach(fn => fn());
  };

  return restoreAccessibilityTree;
}

function disableElement(element) {
  if (!("style" in element)) return misc.noop;
  const previousPointerEvents = element.style.pointerEvents;
  element.style.pointerEvents = "none";

  const enableElement = () => {
    element.style.pointerEvents = previousPointerEvents != null ? previousPointerEvents : "";
  };

  return enableElement;
}

function disablePointerEventsOutside() {
  const cleanups = [];

  for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
    elements[_key] = arguments[_key];
  }

  walkTreeOutside(elements, element => {
    cleanups.unshift(disableElement(element));
  });

  const restorePointerEvents = () => {
    cleanups.forEach(fn => fn());
  };

  return restorePointerEvents;
}

function prependHiddenDismiss(container, onClick) {
  const document = dom.getDocument(container);
  const button = document.createElement("button");
  button.type = "button";
  button.tabIndex = -1;
  button.textContent = "Dismiss popup"; // Visually hidden styles

  button.style.border = "0px";
  button.style.clip = "rect(0 0 0 0)";
  button.style.height = "1px";
  button.style.margin = "-1px";
  button.style.overflow = "hidden";
  button.style.padding = "0px";
  button.style.position = "absolute";
  button.style.whiteSpace = "nowrap";
  button.style.width = "1px";
  button.addEventListener("click", onClick);
  container.prepend(button);

  const removeHiddenDismiss = () => {
    button.removeEventListener("click", onClick);
    button.remove();
  };

  return removeHiddenDismiss;
}

/**
 * When the focused child gets removed from the DOM, we make sure to move focus
 * to the dialog.
 */
function useFocusOnChildUnmount(dialogRef, state) {
  react.useEffect(() => {
    if (!state.visible) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const observer = new MutationObserver(_ref => {
      let [mutation] = _ref;
      if (!mutation) return; // If target is not dialog, then this observer was triggered by a nested
      // dialog, so we just ignore it here and let the nested dialog handle it.

      if (mutation.target !== dialog) return;
      const document = dom.getDocument(dialog);
      const activeElement = dom.getActiveElement(dialog); // We can check if the current focused element is the document body.

      if (activeElement === document.body) {
        dialog.focus();
      }
    });
    observer.observe(dialog, {
      childList: true,
      subtree: true
    });
    return () => observer.disconnect();
  }, [state.visible, dialogRef]);
}

function isInDocument(target) {
  if (target.tagName === "HTML") return true;
  return dom.contains(dom.getDocument(target).body, target);
}

function isDisclosure(disclosure, target) {
  if (dom.contains(disclosure, target)) return true;
  const activeId = target.getAttribute("aria-activedescendant");

  if (activeId) {
    const activeElement = dom.getDocument(disclosure).getElementById(activeId);

    if (activeElement) {
      return dom.contains(disclosure, activeElement);
    }
  }

  return false;
}

function dialogContains(target) {
  return dialogRef => {
    var _dialogRef$current;

    const dialog = dialogRef.current;
    if (!dialog) return false;
    if (dom.contains(dialog, target)) return true;

    if (target.getAttribute("data-backdrop") === ((_dialogRef$current = dialogRef.current) == null ? void 0 : _dialogRef$current.id)) {
      return true;
    }

    return false;
  };
}

function useEventOutside(_ref) {
  let {
    type,
    listener,
    dialogRef,
    nestedDialogs,
    disclosureRef,
    enabled,
    capture
  } = _ref;
  const callListener = hooks.useEventCallback(listener);
  const nestedDialogsRef = hooks.useLiveRef(nestedDialogs);
  react.useEffect(() => {
    if (!enabled) return;

    const onEvent = event => {
      const container = dialogRef.current;
      const disclosure = disclosureRef == null ? void 0 : disclosureRef.current;
      const target = event.target;
      if (!container) return; // When an element is unmounted right after it receives focus, the focus
      // event is triggered after that, when the element isn't part of the
      // current document anymore. We just ignore it.

      if (!isInDocument(target)) return; // Event inside dialog

      if (dom.contains(container, target)) return; // Event on disclosure

      if (disclosure && isDisclosure(disclosure, target)) return; // Event on focus trap

      if (target.hasAttribute("data-focus-trap")) return; // Event inside a nested dialog

      if (nestedDialogsRef.current.some(dialogContains(target))) return;
      callListener(event);
    };

    return events.addGlobalEventListener(type, onEvent, capture);
  }, [enabled, dialogRef, disclosureRef, callListener, capture]);
}

function shouldHideOnInteractOutside(hideOnInteractOutside, event) {
  if (typeof hideOnInteractOutside === "function") {
    return hideOnInteractOutside(event);
  }

  return !!hideOnInteractOutside;
}

function useHideOnInteractOutside(dialogRef, nestedDialogs, _ref2) {
  let {
    state,
    modal,
    hideOnInteractOutside,
    enabled = state.visible
  } = _ref2;
  const previousMouseDownRef = usePreviousMouseDownRef(enabled);
  const props = {
    disclosureRef: state.disclosureRef,
    enabled,
    dialogRef,
    nestedDialogs,
    capture: true
  };
  useEventOutside({ ...props,
    type: "mousedown",
    listener: event => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (modal && !shouldHideOnInteractOutside(hideOnInteractOutside, event)) {
        // If the dialog is modal and the user clicked outside the dialog, but
        // shouldHideOnInteractOutside is false, we don't hide the dialog, but
        // ensure focus is placed on it. Otherwise the focus might end up on an
        // element outside of the dialog or the body element itself.
        focus.ensureFocus(dialog);
        event.preventDefault();
        event.stopPropagation();
      }
    }
  });
  useEventOutside({ ...props,
    type: "click",
    listener: event => {
      if (!shouldHideOnInteractOutside(hideOnInteractOutside, event)) {
        if (!modal) return;
        event.preventDefault();
        event.stopPropagation();
        return;
      } // Make sure the element that has been clicked is the same that last
      // triggered the mousedown event. This prevents the dialog from closing
      // by dragging the cursor (for example, selecting some text inside the
      // dialog and releasing the mouse outside of it).


      if (previousMouseDownRef.current === event.target) {
        state.hide();
      }
    }
  });
  useEventOutside({ ...props,
    type: "focusin",
    listener: event => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (!shouldHideOnInteractOutside(hideOnInteractOutside, event)) {
        if (!modal) return; // Same as the mousedown listener.

        focus.ensureFocus(dialog);
        event.preventDefault();
        event.stopPropagation();
        return;
      } // Fix for https://github.com/ariakit/ariakit/issues/619


      if (event.target === dom.getDocument(dialog)) return;
      state.hide();
    }
  });
  useEventOutside({ ...props,
    type: "contextmenu",
    listener: event => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (!shouldHideOnInteractOutside(hideOnInteractOutside, event)) {
        if (!modal) return; // Same as the mousedown listener.

        focus.ensureFocus(dialog);
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      state.hide();
    }
  });
}

function useHideOnUnmount(dialogRef, state) {
  // Hides the dialog in the state when the component gets unmounted.
  react.useEffect(() => {
    const element = dialogRef.current; // If the ref isn't set in the first place, we don't need to do anything.
    // This can be the case when the useDialog hook is used, but the props are
    // not passed to any element.

    if (!element) return;
    return () => {
      if (!dialogRef.current) {
        state.hide();
      }
    };
  }, [dialogRef, state.hide]);
}

const NestedDialogsContext = /*#__PURE__*/react.createContext({});
/**
 * Handles nested dialogs.
 */

function useNestedDialogs(dialogRef, _ref) {
  let {
    state,
    modal
  } = _ref;
  const context = react.useContext(NestedDialogsContext);
  const [nestedDialogs, setNestedDialogs] = react.useState([]);
  const [visibleModals, setVisibleModals] = react.useState([]);
  const addDialog = react.useCallback(ref => {
    const removeFromContext = context.addDialog == null ? void 0 : context.addDialog(ref);
    setNestedDialogs(dialogs => [...dialogs, ref]);
    return () => {
      removeFromContext == null ? void 0 : removeFromContext();
      setNestedDialogs(dialogs => dialogs.filter(dialog => dialog !== ref));
    };
  }, [context.addDialog]);
  const showModal = react.useCallback(ref => {
    const hideModal = context.showModal == null ? void 0 : context.showModal(ref);
    setVisibleModals(modals => [...modals, ref]);
    return () => {
      hideModal == null ? void 0 : hideModal();
      setVisibleModals(modals => modals.filter(modal => modal !== ref));
    };
  }, [context.showModal]); // If this is a nested dialog, add it to the context.

  hooks.useSafeLayoutEffect(() => {
    return context.addDialog == null ? void 0 : context.addDialog(dialogRef);
  }, [context.addDialog, dialogRef]);
  hooks.useSafeLayoutEffect(() => {
    if (!modal) return;
    if (!state.visible) return;
    return context.showModal == null ? void 0 : context.showModal(dialogRef);
  }, [modal, state.visible, context.showModal, dialogRef]); // Close all nested dialogs when parent dialog closes.

  hooks.useSafeLayoutEffect(() => {
    if (context.visible === false && state.visible) {
      state.hide();
    }
  }, [context.visible, state.visible, state.hide]); // Provider

  const providerValue = react.useMemo(() => ({
    visible: state.visible,
    addDialog,
    showModal
  }), [state.visible, addDialog, showModal]);
  const wrapElement = react.useCallback(element => /*#__PURE__*/jsxRuntime.jsx(NestedDialogsContext.Provider, {
    value: providerValue,
    children: element
  }), [providerValue]);
  return {
    nestedDialogs,
    visibleModals,
    wrapElement
  };
}

function usePreventBodyScroll(enabled) {
  hooks.useSafeLayoutEffect(() => {
    if (!enabled) return;
    const {
      documentElement
    } = document;
    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = documentElement.style.overflow;
    const previousPaddingRight = documentElement.style.paddingRight;
    documentElement.style.overflow = "hidden";
    documentElement.style.paddingRight = scrollBarWidth + "px";
    return () => {
      documentElement.style.overflow = previousOverflow;
      documentElement.style.paddingRight = previousPaddingRight;
    };
  }, [enabled]);
}

const isSafariOrFirefoxOnAppleDevice = platform.isApple() && (platform.isSafari() || platform.isFirefox());

function isBackdrop(dialog, element) {
  const id = dialog.id;
  if (!id) return;
  return element.getAttribute("data-backdrop") === id;
}

function isInDialog(element) {
  return dialogRef => dialogRef.current && dom.contains(dialogRef.current, element);
}

function isAlreadyFocusingAnotherElement(dialog, nestedDialogs) {
  const activeElement = dom.getActiveElement();
  if (!activeElement) return false;
  if (dom.contains(dialog, activeElement)) return false;
  if (isBackdrop(dialog, activeElement)) return false;
  if (nestedDialogs != null && nestedDialogs.some(isInDialog(activeElement))) return false;
  if (focus.isFocusable(activeElement)) return true;
  return false;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const state = useDialogState();
 * const props = useDialog({ state });
 * <Role {...props}>Dialog</Role>
 * ```
 */


const useDialog = system.createHook(_ref => {
  let {
    state,
    focusable = true,
    modal = true,
    portal = !!modal,
    backdrop = !!modal,
    backdropProps,
    hideOnEscape = true,
    hideOnInteractOutside = true,
    preventBodyScroll = !!modal,
    autoFocusOnShow = true,
    autoFocusOnHide = true,
    initialFocusRef,
    finalFocusRef,
    ...props
  } = _ref;
  const ref = react.useRef(null);
  const visibleRef = react.useRef(state.visible);
  const [portalNode, setPortalNode] = react.useState(null);
  const portalRef = hooks.useForkRef(setPortalNode, props.portalRef); // domReady can be also the portal node element so it's updated when the
  // portal node changes (like in between re-renders), triggering effects
  // again.

  const domReady = !portal || portalNode; // Sets preserveTabOrder to true only if the dialog is not a modal and is
  // visible.

  const preserveTabOrder = props.preserveTabOrder && !modal && state.mounted; // Sets disclosure ref. It needs to be a layout effect so we get the focused
  // element right before the dialog is mounted.

  hooks.useSafeLayoutEffect(() => {
    if (!state.mounted) return;
    const dialog = ref.current;
    const activeElement = dom.getActiveElement(dialog, true);

    if (activeElement && activeElement.tagName !== "BODY") {
      state.disclosureRef.current = activeElement;
    }
  }, [state.mounted]);
  const nested = useNestedDialogs(ref, {
    state,
    modal
  });
  const {
    nestedDialogs,
    visibleModals,
    wrapElement
  } = nested;
  const nestedDialogsRef = hooks.useLiveRef(nestedDialogs);
  usePreventBodyScroll(preventBodyScroll && state.mounted); // When the dialog is unmounted, we make sure to update the state.

  useHideOnUnmount(ref, state); // When a focused child element is removed, focus will be placed on the
  // document's body. This will focus on the dialog instead.

  useFocusOnChildUnmount(ref, state);
  useHideOnInteractOutside(ref, nestedDialogs, {
    state,
    modal,
    hideOnInteractOutside,
    enabled: state.visible
  }); // Safari and Firefox on Apple devices do not focus on native buttons on
  // mousedown. The DialogDisclosure component normalizes this behavior using
  // the useFocusable hook, but the disclosure button may use a custom
  // component, and not DialogDisclosure. In this case, we need to make sure
  // the disclosure button gets focused here.

  if (isSafariOrFirefoxOnAppleDevice) {
    react.useEffect(() => {
      if (!state.mounted) return;
      const disclosure = state.disclosureRef.current;
      if (!disclosure) return;
      if (!dom.isButton(disclosure)) return;

      const onMouseDown = () => {
        events.queueBeforeEvent(disclosure, "mouseup", () => focus.focusIfNeeded(disclosure));
      };

      disclosure.addEventListener("mousedown", onMouseDown);
      return () => {
        disclosure.removeEventListener("mousedown", onMouseDown);
      };
    }, [state.mounted, state.disclosureRef]);
  } // Renders a hidden dismiss button at the top of the modal dialog element.
  // So that screen reader users aren't trapped in the dialog when there's no
  // visible dismiss button.


  react.useEffect(() => {
    if (!state.mounted) return;
    if (!domReady) return;
    const dialog = ref.current;
    if (!dialog) return; // Usually, we only want to force the presence of a dismiss button if the
    // dialog is a modal. But, on Safari, since we're disabling the
    // accessibility tree outside, we need to ensure the user will be able to
    // close the dialog.

    if (modal || portal && preserveTabOrder && platform.isSafari()) {
      // If there's already a DialogDismiss component, it does nothing.
      const existingDismiss = dialog.querySelector("[data-dialog-dismiss]");
      if (existingDismiss) return;
      return prependHiddenDismiss(dialog, state.hide);
    }

    return;
  }, [state.mounted, domReady, modal, portal, preserveTabOrder, state.hide]); // Disables/enables the element tree around the modal dialog element.

  hooks.useSafeLayoutEffect(() => {
    // When the dialog is animating, we immediately restore the element tree
    // outside. This means the element tree will be enabled when the focus is
    // moved back to the disclosure element.
    if (state.animating) return;
    if (!state.visible) return; // If portal is enabled, we get the portalNode instead of the dialog
    // element. This will consider nested dialogs as they will be children of
    // the portal node, but not the dialog. This also accounts for the tiny
    // delay before the dialog element is appended to the portal node, and the
    // portal node is added to the DOM.

    const element = portal ? portalNode : ref.current;

    if (modal) {
      return misc.chain(disableAccessibilityTreeOutside(element), // When the backdrop is not visible, we also need to disable pointer
      // events outside of the modal dialog.
      !backdrop ? disablePointerEventsOutside(element) : null);
    } else if (portal && preserveTabOrder && platform.isSafari()) {
      // Usually, we only want to disable the accessibility tree outside if
      // the dialog is a modal. But the Portal component can't preserve the
      // tab order on Safari/VoiceOver. By allowing only the dialog/portal to
      // be accessible, we provide a similar tab order flow. We don't need to
      // disable pointer events because it's just for screen readers.
      return disableAccessibilityTreeOutside(element);
    }

    return;
  }, [state.animating, state.visible, portal, portalNode, modal, backdrop, preserveTabOrder]); // Auto focus on show.

  react.useEffect(() => {
    var _nestedDialogsRef$cur;

    if (state.animating) return;
    if (!state.visible) return;
    if (!autoFocusOnShow) return; // Makes sure to wait for the portalNode to be created before moving
    // focus. This is useful for when the Dialog component is unmounted
    // when hidden.

    if (!domReady) return; // If there are open nested dialogs, let them handle the focus.

    const isNestedDialogVisible = (_nestedDialogsRef$cur = nestedDialogsRef.current) == null ? void 0 : _nestedDialogsRef$cur.some(child => child.current && !child.current.hidden);
    if (isNestedDialogVisible) return;
    const dialog = ref.current;
    if (!dialog) return;
    const initialFocus = initialFocusRef == null ? void 0 : initialFocusRef.current;
    const element = initialFocus || // We have to fallback to the first focusable element otherwise portaled
    // dialogs with preserveTabOrder set to true will not receive focus
    // properly because the elements aren't tabbable until the dialog
    // receives focus.
    focus.getFirstTabbableIn(dialog, true, portal && preserveTabOrder) || dialog;
    focus.ensureFocus(element);
  }, [state.animating, state.visible, autoFocusOnShow, domReady, initialFocusRef, portal, preserveTabOrder]); // Auto focus on hide.

  react.useEffect(() => {
    const dialog = ref.current;
    const previouslyVisible = visibleRef.current;
    visibleRef.current = state.visible; // We only want to auto focus on hide if the dialog was visible before.

    if (!previouslyVisible) return;
    if (!autoFocusOnHide) return;
    if (!dialog) return; // A function so we can use it on the effect setup and cleanup phases.

    const focusOnHide = () => {
      const dialogs = nestedDialogsRef.current; // Hide was triggered by a click/focus on a tabbable element outside
      // the dialog or on another dialog. We won't change focus then.

      if (isAlreadyFocusingAnotherElement(dialog, dialogs)) return;
      const element = (finalFocusRef == null ? void 0 : finalFocusRef.current) || state.disclosureRef.current;

      if (element) {
        if (element.id) {
          const document = dom.getDocument(element);
          const selector = "[aria-activedescendant=\"" + element.id + "\"]";
          const composite = document.querySelector(selector); // If the element is an item in a composite widget that handles
          // focus with the `aria-activedescendant` attribute, we want to
          // focus on the composite element itself.

          if (composite) {
            focus.ensureFocus(composite);
            return;
          }
        }

        focus.ensureFocus(element);
      }
    };

    if (!state.visible) {
      // If this effect is running while state.visible is false, this means
      // that the Dialog component doesn't get unmounted when it's not
      // visible, so we can immediatelly move focus.
      return focusOnHide();
    } // Otherwise, we just return the focusOnHide function so it's going to
    // be executed when the Dialog component gets unmounted. This is useful
    // so we can support both mouting and unmouting Dialog components.


    return focusOnHide;
  }, [autoFocusOnHide, state.visible, finalFocusRef, state.disclosureRef]);
  const hideOnEscapeProp = hooks.useBooleanEventCallback(hideOnEscape); // Hide on Escape.

  react.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!domReady) return;
    if (!state.mounted) return;

    const onKeyDown = event => {
      const target = event.target;
      const disclosure = state.disclosureRef.current;
      if (event.key !== "Escape") return;
      if (event.defaultPrevented) return;
      if (!target) return; // This considers valid targets only the disclosure element or
      // descendants of the dialog element that are not descendants of nested
      // dialogs.

      const isValidTarget = () => {
        if (dom.contains(dialog, target)) {
          const dialogs = nestedDialogsRef.current; // Since this is a native DOM event, it won't be triggered by
          // keystrokes on nested dialogs inside portals. But we still need to
          // check if the target is inside a nested non-portal dialog.

          const inNestedDialog = dialogs.some(isInDialog(target));
          if (inNestedDialog) return false;
          return true;
        }

        if (disclosure && dom.contains(disclosure, target)) return true;
        return false;
      };

      if (isValidTarget() && hideOnEscapeProp(event)) {
        state.hide();
      }
    }; // We're attatching the listener to the document instead of the dialog
    // element so we can also listen to keystrokes on the disclosure element.
    // We can't do this on a onKeyDown prop on the disclosure element because
    // we don't have access to the hideOnEscape prop there.


    return events.addGlobalEventListener("keydown", onKeyDown);
  }, [domReady, state.mounted, state.disclosureRef, hideOnEscapeProp, state.hide]); // Wraps the element with the nested dialog context.

  props = hooks.useWrapElement(props, wrapElement, [wrapElement]); // Resets the heading levels inside the modal dialog so they start with h1.

  props = hooks.useWrapElement(props, element => /*#__PURE__*/jsxRuntime.jsx(heading_headingLevel.HeadingLevel, {
    level: modal ? 1 : undefined,
    children: element
  }), [modal]); // Focus traps.

  props = hooks.useWrapElement(props, element => {
    const renderFocusTrap = getTabbable => {
      if (state.visible && modal && !visibleModals.length) {
        return /*#__PURE__*/jsxRuntime.jsx("span", {
          tabIndex: 0,
          style: {
            position: "fixed",
            top: 0,
            left: 0
          },
          "aria-hidden": true,
          "data-focus-trap": "",
          onFocus: () => {
            const dialog = ref.current;
            if (!dialog) return;
            const tabbable = getTabbable(dialog, true);

            if (tabbable) {
              tabbable.focus();
            } else {
              // Fallbacks to the dialog element.
              dialog.focus();
            }
          }
        });
      }

      return null;
    };

    return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [renderFocusTrap(focus.getLastTabbableIn), element, renderFocusTrap(focus.getFirstTabbableIn)]
    });
  }, [state.visible, modal, visibleModals]); // Wraps the dialog with a backdrop element if the backdrop prop is truthy.

  props = hooks.useWrapElement(props, element => {
    if (backdrop) {
      return /*#__PURE__*/jsxRuntime.jsx(DialogBackdrop, {
        state: state,
        backdrop: backdrop,
        backdropProps: backdropProps,
        hideOnInteractOutside: hideOnInteractOutside,
        hideOnEscape: hideOnEscape,
        children: element
      });
    }

    return element;
  }, [state, backdrop, backdropProps, hideOnInteractOutside, hideOnEscape]);
  const [headingId, setHeadingId] = react.useState();
  const [descriptionId, setDescriptionId] = react.useState();
  props = hooks.useWrapElement(props, element => /*#__PURE__*/jsxRuntime.jsx(dialogContext.DialogContext.Provider, {
    value: state,
    children: /*#__PURE__*/jsxRuntime.jsx(dialogContext.DialogHeadingContext.Provider, {
      value: setHeadingId,
      children: /*#__PURE__*/jsxRuntime.jsx(dialogContext.DialogDescriptionContext.Provider, {
        value: setDescriptionId,
        children: element
      })
    })
  }), [state]);
  props = {
    "data-dialog": "",
    role: "dialog",
    tabIndex: focusable ? -1 : undefined,
    "aria-labelledby": headingId,
    "aria-describedby": descriptionId,
    ...props,
    ref: hooks.useForkRef(ref, props.ref)
  };
  props = disclosure_disclosureContent.useDisclosureContent({
    state,
    ...props
  });
  props = focusable_focusable.useFocusable({ ...props,
    focusable
  });
  props = portal_portal.usePortal({
    portal,
    ...props,
    portalRef,
    preserveTabOrder
  });
  return props;
});
/**
 * A component that renders a dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <button onClick={dialog.toggle}>Open dialog</button>
 * <Dialog state={dialog}>Dialog</Dialog>
 * ```
 */

const Dialog = system.createComponent(props => {
  const htmlProps = useDialog(props);
  return system.createElement("div", htmlProps);
});

exports.Dialog = Dialog;
exports.useDialog = useDialog;
