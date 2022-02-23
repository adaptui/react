'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var events = require('ariakit-utils/events');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var disclosure_disclosureContent = require('../disclosure/disclosure-content.js');
var __utils = require('../__utils-04c64183.js');
var jsxRuntime = require('react/jsx-runtime');
var portal_portal = require('../portal/portal.js');

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
const useTooltip = system.createHook(_ref => {
  let {
    state,
    portal = true,
    hideOnEscape = true,
    hideOnControl = false,
    wrapperProps,
    ...props
  } = _ref;
  const [portalNode, setPortalNode] = react.useState(null);
  const portalRef = hooks.useForkRef(setPortalNode, props.portalRef);
  const popoverRef = state.popoverRef; // When the tooltip is rendered within a portal, we need to wait for the
  // portalNode to be created so we can update the tooltip position.

  hooks.useSafeLayoutEffect(() => {
    if (!portalNode) return;
    if (!state.mounted) return;
    state.render();
  }, [portalNode, state.mounted, state.render]); // Makes sure the wrapper element that's passed to popper has the same
  // z-index as the popover element so users only need to set the z-index
  // once.

  hooks.useSafeLayoutEffect(() => {
    const wrapper = popoverRef.current;
    const tooltip = state.contentElement;
    if (!wrapper) return;
    if (!tooltip) return;
    wrapper.style.zIndex = getComputedStyle(tooltip).zIndex;
  }, [popoverRef, state.contentElement]);
  const hideOnEscapeProp = hooks.useBooleanEventCallback(hideOnEscape);
  const hideOnControlProp = hooks.useBooleanEventCallback(hideOnControl); // Hide on Escape/Control

  react.useEffect(() => {
    if (!state.visible) return;
    return events.addGlobalEventListener("keydown", event => {
      if (event.defaultPrevented) return;
      const isEscape = event.key === "Escape" && hideOnEscapeProp(event);
      const isControl = event.key === "Control" && hideOnControlProp(event);

      if (isEscape || isControl) {
        state.hide();
      }
    });
  }, [state.visible, hideOnEscapeProp, hideOnControlProp, state.hide]);
  props = hooks.useWrapElement(props, element => /*#__PURE__*/jsxRuntime.jsx("div", {
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
  props = hooks.useWrapElement(props, element => /*#__PURE__*/jsxRuntime.jsx(__utils.TooltipContext.Provider, {
    value: state,
    children: element
  }), [state]);
  props = {
    role: "tooltip",
    ...props
  };
  props = disclosure_disclosureContent.useDisclosureContent({
    state,
    ...props
  });
  props = portal_portal.usePortal({
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

const Tooltip = system.createComponent(props => {
  const htmlProps = useTooltip(props);
  return system.createElement("div", htmlProps);
});

exports.Tooltip = Tooltip;
exports.useTooltip = useTooltip;
