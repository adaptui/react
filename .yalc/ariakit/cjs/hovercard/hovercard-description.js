'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var popover_popoverDescription = require('../popover/popover-description.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a description element for a hovercard. This hook
 * must be used in a component that's wrapped with `Hovercard` so the
 * `aria-describedby` prop is properly set on the hovercard element.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * // This component must be wrapped with Hovercard
 * const props = useHovercardDescription();
 * <Role {...props}>Description</Role>
 * ```
 */
const useHovercardDescription = system.createHook(props => {
  props = popover_popoverDescription.usePopoverDescription(props);
  return props;
});
/**
 * A component that renders a description in a hovercard. This component must be
 * wrapped with `Hovercard` so the `aria-describedby` prop is properly set on
 * the hovercard element.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <Hovercard state={hovercard}>
 *   <HovercardDescription>Description</HovercardDescription>
 * </Hovercard>
 * ```
 */

const HovercardDescription = system.createComponent(props => {
  const htmlProps = useHovercardDescription(props);
  return system.createElement("p", htmlProps);
});

exports.HovercardDescription = HovercardDescription;
exports.useHovercardDescription = useHovercardDescription;
