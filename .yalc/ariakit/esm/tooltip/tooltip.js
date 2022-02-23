import { useState, useEffect } from 'react';
import { addGlobalEventListener } from 'ariakit-utils/events';
import { useForkRef, useSafeLayoutEffect, useBooleanEventCallback, useWrapElement } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useDisclosureContent } from '../disclosure/disclosure-content.js';
import { T as TooltipContext } from '../__utils-30a60887.js';
import { jsx } from 'react/jsx-runtime';
import { usePortal } from '../portal/portal.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a tooltip element.
 * @see https://ariakit.org/components/tooltip
 * @example
 * ```jsx
 * const state = useToolTipState();
 * const props = useTooltip({ state });
 * <TooltipAnchor state={state}>Anchor</TooltipAnchor>
 * <Role {...props}>Tooltip</Role>
 * ```
 */
const useTooltip = createHook(_ref => {
  let {
    state,
    portal = true,
    hideOnEscape = true,
    hideOnControl = false,
    wrapperProps,
    ...props
  } = _ref;
  const [portalNode, setPortalNode] = useState(null);
  const portalRef = useForkRef(setPortalNode, props.portalRef);
  const popoverRef = state.popoverRef; // When the tooltip is rendered within a portal, we need to wait for the
  // portalNode to be created so we can update the tooltip position.

  useSafeLayoutEffect(() => {
    if (!portalNode) return;
    if (!state.mounted) return;
    state.render();
  }, [portalNode, state.mounted, state.render]); // Makes sure the wrapper element that's passed to popper has the same
  // z-index as the popover element so users only need to set the z-index
  // once.

  useSafeLayoutEffect(() => {
    const wrapper = popoverRef.current;
    const tooltip = state.contentElement;
    if (!wrapper) return;
    if (!tooltip) return;
    wrapper.style.zIndex = getComputedStyle(tooltip).zIndex;
  }, [popoverRef, state.contentElement]);
  const hideOnEscapeProp = useBooleanEventCallback(hideOnEscape);
  const hideOnControlProp = useBooleanEventCallback(hideOnControl); // Hide on Escape/Control

  useEffect(() => {
    if (!state.visible) return;
    return addGlobalEventListener("keydown", event => {
      if (event.defaultPrevented) return;
      const isEscape = event.key === "Escape" && hideOnEscapeProp(event);
      const isControl = event.key === "Control" && hideOnControlProp(event);

      if (isEscape || isControl) {
        state.hide();
      }
    });
  }, [state.visible, hideOnEscapeProp, hideOnControlProp, state.hide]);
  props = useWrapElement(props, element => /*#__PURE__*/jsx("div", {
    role: "presentation",
    ...wrapperProps,
    // Avoid the wrapper from taking space when used within a flexbox
    // container with the gap property.
    style: {
      position: "fixed",
      ...(wrapperProps == null ? void 0 : wrapperProps.style)
    },
    ref: popoverRef,
    children: element
  }), [popoverRef, wrapperProps]);
  props = useWrapElement(props, element => /*#__PURE__*/jsx(TooltipContext.Provider, {
    value: state,
    children: element
  }), [state]);
  props = {
    role: "tooltip",
    ...props
  };
  props = useDisclosureContent({
    state,
    ...props
  });
  props = usePortal({
    portal,
    ...props,
    portalRef,
    preserveTabOrder: false
  });
  return props;
});
/**
 * A component that renders a tooltip element.
 * @see https://ariakit.org/components/tooltip
 * @example
 * ```jsx
 * const tooltip = useTooltipState();
 * <TooltipAnchor state={tooltip}>Anchor</TooltipAnchor>
 * <Tooltip state={tooltip}>Tooltip</Tooltip>
 * ```
 */

const Tooltip = createComponent(props => {
  const htmlProps = useTooltip(props);
  return createElement("div", htmlProps);
});

export { Tooltip, useTooltip };
