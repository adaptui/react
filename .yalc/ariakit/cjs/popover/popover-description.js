'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var dialog_dialogDescription = require('../dialog/dialog-description.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a description element for a popover. This hook
 * must be used in a component that's wrapped with `Popover` so the
 * `aria-describedby` prop is properly set on the popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * // This component must be wrapped with Popover
 * const props = usePopoverDescription();
 * <Role {...props}>Description</Role>
 * ```
 */
const usePopoverDescription = system.createHook(props => {
  props = dialog_dialogDescription.useDialogDescription(props);
  return props;
});
/**
 * A component that renders a description in a popover. This component must be
 * wrapped with `Popover` so the `aria-describedby` prop is properly set on the
 * popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <Popover state={popover}>
 *   <PopoverDescription>Description</PopoverDescription>
 * </Popover>
 * ```
 */

const PopoverDescription = system.createComponent(props => {
  const htmlProps = usePopoverDescription(props);
  return system.createElement("p", htmlProps);
});

exports.PopoverDescription = PopoverDescription;
exports.usePopoverDescription = usePopoverDescription;
