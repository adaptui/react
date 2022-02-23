'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var system = require('ariakit-utils/system');
var popover_popoverArrow = require('../popover/popover-arrow.js');
var __utils = require('../__utils-04c64183.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow inside a tooltip element.
 * @see https://ariakit.org/components/tooltip
 * @example
 * ```jsx
 * const state = useToolTipState();
 * const props = useTooltipArrow({ state });
 * <TooltipAnchor state={state}>Anchor</TooltipAnchor>
 * <Tooltip state={state}>
 *   <Role {...props} />
 *   Tooltip
 * </Tooltip>
 * ```
 */
const useTooltipArrow = system.createHook(_ref => {
  let {
    state,
    size = 16,
    ...props
  } = _ref;
  // We need to get the tooltip state here because Tooltip is not using the
  // Popover component, so PopoverArrow can't access the popover context.
  const context = react.useContext(__utils.TooltipContext);
  state = state || context;
  props = popover_popoverArrow.usePopoverArrow({
    state,
    size,
    ...props
  });
  return props;
});
/**
 * A component that renders an arrow inside a `Tooltip` component.
 * @see https://ariakit.org/components/tooltip
 * @example
 * ```jsx
 * const tooltip = useTooltipState();
 * <TooltipAnchor state={tooltip}>Anchor</TooltipAnchor>
 * <Tooltip state={tooltip}>
 *   <TooltipArrow />
 *   Tooltip
 * </Tooltip>
 * ```
 */

const TooltipArrow = system.createComponent(props => {
  const htmlProps = useTooltipArrow(props);
  return system.createElement("div", htmlProps);
});

exports.TooltipArrow = TooltipArrow;
exports.useTooltipArrow = useTooltipArrow;
