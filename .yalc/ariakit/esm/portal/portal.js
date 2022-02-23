import { useRef, useContext, useState, useEffect } from 'react';
import { getDocument } from 'ariakit-utils/dom';
import { isFocusEventOutside } from 'ariakit-utils/events';
import { getNextTabbable, getPreviousTabbable, restoreFocusIn, disableFocusIn } from 'ariakit-utils/focus';
import { useForkRef, useSafeLayoutEffect, useWrapElement } from 'ariakit-utils/hooks';
import { setRef } from 'ariakit-utils/misc';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { createPortal } from 'react-dom';
import { PortalContext } from './portal-context.js';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { FocusTrap } from '../focus-trap/focus-trap.js';

function getRootElement(element) {
  return getDocument(element).body;
}

function getPortalElement(element, portalElement) {
  if (!portalElement) {
    return getDocument(element).createElement("div");
  }

  if (typeof portalElement === "function") {
    return portalElement(element);
  }

  return portalElement;
}

function getRandomId(prefix) {
  if (prefix === void 0) {
    prefix = "id";
  }

  return "" + (prefix ? prefix + "-" : "") + Math.random().toString(36).substr(2, 6);
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element using `ReactDOM.createPortal`.
 * @see https://ariakit.org/components/portal
 * @example
 * ```jsx
 * const props = usePortal();
 * <Role {...props}>Content</Role>
 * ```
 */


const usePortal = createHook(_ref => {
  let {
    preserveTabOrder,
    portalElement,
    portalRef,
    portal = true,
    ...props
  } = _ref;
  const ref = useRef(null);
  const refProp = useForkRef(ref, props.ref);
  const context = useContext(PortalContext);
  const [portalNode, setPortalNode] = useState(null);
  const beforeOutsideRef = useRef(null);
  const beforeInsideRef = useRef(null);
  const afterInsideRef = useRef(null);
  const afterOutsideRef = useRef(null); // Create the portal node and attach it to the DOM.

  useSafeLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!portal) return;
    const portalEl = getPortalElement(element, portalElement); // TODO: Warn about portals as the document.body element.

    if (!portalEl) return; // If the portal element is not in the DOM, append it to the root element,
    // which can be either the parent portal or the document.body element,
    // that's returned by the getRootElement function.

    const isPortalInDocument = portalEl.isConnected;

    if (!isPortalInDocument) {
      const rootElement = context || getRootElement(element);
      rootElement.appendChild(portalEl);
    } // If the portal element doesn't have an id already, set one.


    if (!portalEl.id) {
      // Use the element's id so rendering <Portal id="some-id" /> will
      // produce predictable results.
      portalEl.id = element.id ? element.id + "-portal" : getRandomId();
    } // Set the internal portal node state and the portalRef prop.


    setPortalNode(portalEl);
    setRef(portalRef, portalEl); // If the portal element was already in the document, we don't need to
    // remove it when the element is unmounted, so we just return.

    if (isPortalInDocument) return; // Otherwise, we need to remove the portal from the DOM.

    return () => {
      portalEl.remove();
      setPortalNode(null);
      setRef(portalRef, null);
    };
  }, [portal, portalElement, context, portalRef]); // When preserveTabOrder is true, make sure elements inside the portal
  // element are tabbable only when the portal has already been focused,
  // either by tabbing into a focus trap element outside or using the mouse.

  useEffect(() => {
    if (!portalNode) return;
    if (!preserveTabOrder) return;
    let raf = 0;

    const onFocus = event => {
      if (isFocusEventOutside(event)) {
        const focusing = event.type === "focusin";
        if (focusing) return restoreFocusIn(portalNode); // Wait for the next frame to allow tabindex changes after the focus
        // event.

        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          disableFocusIn(portalNode, true);
        });
      }
    }; // Listen to the event on the capture phase so they run before the focus
    // trap elements onFocus prop is called.


    portalNode.addEventListener("focusin", onFocus, true);
    portalNode.addEventListener("focusout", onFocus, true);
    return () => {
      portalNode.removeEventListener("focusin", onFocus, true);
      portalNode.removeEventListener("focusout", onFocus, true);
    };
  }, [portalNode, preserveTabOrder]);
  props = useWrapElement(props, element => {
    element =
    /*#__PURE__*/
    // While the portal node is not in the DOM, we need to pass the
    // current context to the portal context, otherwise it's going to
    // reset to the body element on nested portals.
    jsx(PortalContext.Provider, {
      value: portalNode || context,
      children: element
    });
    if (!portal) return element;

    if (!portalNode) {
      // If the element should be rendered within a portal, but the portal
      // node is not yet in the DOM, we'll return an empty div element. We
      // assign the id to the element so we can use it to set the portal id
      // later on. We're using position: fixed here so that the browser
      // doesn't add margin to the element when setting gap on a parent
      // element.
      return /*#__PURE__*/jsx("span", {
        ref: refProp,
        id: props.id,
        style: {
          position: "fixed"
        }
      });
    }

    element = /*#__PURE__*/jsxs(Fragment, {
      children: [preserveTabOrder && portalNode && /*#__PURE__*/jsx(FocusTrap, {
        ref: beforeInsideRef,
        onFocus: event => {
          if (isFocusEventOutside(event, portalNode)) {
            var _getNextTabbable;

            (_getNextTabbable = getNextTabbable()) == null ? void 0 : _getNextTabbable.focus();
          } else {
            var _beforeOutsideRef$cur;

            (_beforeOutsideRef$cur = beforeOutsideRef.current) == null ? void 0 : _beforeOutsideRef$cur.focus();
          }
        }
      }), element, preserveTabOrder && portalNode && /*#__PURE__*/jsx(FocusTrap, {
        ref: afterInsideRef,
        onFocus: event => {
          if (isFocusEventOutside(event, portalNode)) {
            var _getPreviousTabbable;

            (_getPreviousTabbable = getPreviousTabbable()) == null ? void 0 : _getPreviousTabbable.focus();
          } else {
            var _afterOutsideRef$curr;

            (_afterOutsideRef$curr = afterOutsideRef.current) == null ? void 0 : _afterOutsideRef$curr.focus();
          }
        }
      })]
    });

    if (portalNode) {
      element = /*#__PURE__*/createPortal(element, portalNode);
    }

    element = /*#__PURE__*/jsxs(Fragment, {
      children: [preserveTabOrder && portalNode && /*#__PURE__*/jsx(FocusTrap, {
        ref: beforeOutsideRef,
        onFocus: event => {
          if (isFocusEventOutside(event, portalNode)) {
            var _beforeInsideRef$curr;

            (_beforeInsideRef$curr = beforeInsideRef.current) == null ? void 0 : _beforeInsideRef$curr.focus();
          } else {
            var _getPreviousTabbable2;

            (_getPreviousTabbable2 = getPreviousTabbable()) == null ? void 0 : _getPreviousTabbable2.focus();
          }
        }
      }), preserveTabOrder &&
      /*#__PURE__*/
      // We're using position: fixed here so that the browser doesn't
      // add margin to the element when setting gap on a parent element.
      jsx("span", {
        "aria-owns": portalNode == null ? void 0 : portalNode.id,
        style: {
          position: "fixed"
        }
      }), element, preserveTabOrder && portalNode && /*#__PURE__*/jsx(FocusTrap, {
        ref: afterOutsideRef,
        onFocus: event => {
          if (isFocusEventOutside(event, portalNode)) {
            var _afterInsideRef$curre;

            (_afterInsideRef$curre = afterInsideRef.current) == null ? void 0 : _afterInsideRef$curre.focus();
          } else {
            var _getNextTabbable2;

            (_getNextTabbable2 = getNextTabbable()) == null ? void 0 : _getNextTabbable2.focus();
          }
        }
      })]
    });
    return element;
  }, [portalNode, context, portal, props.id, preserveTabOrder]);
  props = { ...props,
    ref: refProp
  };
  return props;
});
/**
 * A component that renders an element using `ReactDOM.createPortal`.
 * @see https://ariakit.org/components/portal
 * @example
 * ```jsx
 * <Portal>Content</Portal>
 * ```
 */

const Portal = createComponent(props => {
  const htmlProps = usePortal(props);
  return createElement("div", htmlProps);
});

export { Portal, usePortal };
