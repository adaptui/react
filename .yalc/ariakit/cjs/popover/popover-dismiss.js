'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var dialog_dialogDismiss = require('../dialog/dialog-dismiss.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that hides a popover.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const state = usePopoverState();
 * const props = usePopoverDismiss({ state });
 * <Popover state={state}>
 *   <Role {...props} />
 * </Popover>
 * ```
 */
const usePopoverDismiss = system.createHook(props => {
  props = dialog_dialogDismiss.useDialogDismiss(props);
  return props;
});
/**
 * A component that renders a button that hides a popover.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <Popover state={popover}>
 *   <PopoverDismiss />
 * </Popover>
 * ```
 */

const PopoverDismiss = system.createComponent(props => {
  const htmlProps = usePopoverDismiss(props);
  return system.createElement("button", htmlProps);
});

exports.PopoverDismiss = PopoverDismiss;
exports.usePopoverDismiss = usePopoverDismiss;
