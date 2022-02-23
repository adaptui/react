'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var popover_popoverArrow = require('../popover/popover-arrow.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow element in a hovercard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const state = useHovercardState();
 * const props = useHovercardArrow({ state });
 * <Hovercard state={state}>
 *   <Role {...props} />
 *   Details
 * </Hovercard>
 * ```
 */
const useHovercardArrow = system.createHook(props => {
  props = popover_popoverArrow.usePopoverArrow(props);
  return props;
});
/**
 * A component that renders an arrow element in a hovercard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <HovercardAnchor state={hovercard}>@username</HovercardAnchor>
 * <Hovercard state={hovercard}>
 *   <HovercardArrow />
 *   Details
 * </Hovercard>
 * ```
 */

const HovercardArrow = system.createComponent(props => {
  const htmlProps = useHovercardArrow(props);
  return system.createElement("div", htmlProps);
});

exports.HovercardArrow = HovercardArrow;
exports.useHovercardArrow = useHovercardArrow;
