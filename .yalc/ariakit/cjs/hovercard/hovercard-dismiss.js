'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var popover_popoverDismiss = require('../popover/popover-dismiss.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that hides a hovercard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const state = useHovercardState();
 * const props = useHovercardDismiss({ state });
 * <Hovercard state={state}>
 *   <Role {...props} />
 * </Hovercard>
 * ```
 */
const useHovercardDismiss = system.createHook(props => {
  props = popover_popoverDismiss.usePopoverDismiss(props);
  return props;
});
/**
 * A component that renders a button that hides a hovercard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <Hovercard state={hovercard}>
 *   <HovercardDismiss />
 * </Hovercard>
 * ```
 */

const HovercardDismiss = system.createComponent(props => {
  const htmlProps = useHovercardDismiss(props);
  return system.createElement("button", htmlProps);
});

exports.HovercardDismiss = HovercardDismiss;
exports.useHovercardDismiss = useHovercardDismiss;
