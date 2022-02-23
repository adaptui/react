import { useContext } from 'react';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { usePopoverArrow } from '../popover/popover-arrow.js';
import { T as TooltipContext } from '../__utils-30a60887.js';

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
const useTooltipArrow = createHook(_ref => {
  let {
    state,
    size = 16,
    ...props
  } = _ref;
  // We need to get the tooltip state here because Tooltip is not using the
  // Popover component, so PopoverArrow can't access the popover context.
  const context = useContext(TooltipContext);
  state = state || context;
  props = usePopoverArrow({
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

const TooltipArrow = createComponent(props => {
  const htmlProps = useTooltipArrow(props);
  return createElement("div", htmlProps);
});

export { TooltipArrow, useTooltipArrow };
