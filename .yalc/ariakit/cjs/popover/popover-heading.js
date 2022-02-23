'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var dialog_dialogHeading = require('../dialog/dialog-heading.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a heading element for a popover. This hook must
 * be used in a component that's wrapped with `Popover` so the `aria-labelledby`
 * prop is properly set on the popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * // This component must be wrapped with Popover
 * const props = usePopoverHeading();
 * <Role {...props}>Heading</Role>
 * ```
 */
const usePopoverHeading = system.createHook(props => {
  props = dialog_dialogHeading.useDialogHeading(props);
  return props;
});
/**
 * A component that renders a heading in a popover. This component must be
 * wrapped with `Popover` so the `aria-labelledby` prop is properly set on the
 * popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <Popover state={popover}>
 *   <PopoverHeading>Heading</PopoverHeading>
 * </Popover>
 * ```
 */

const PopoverHeading = system.createComponent(props => {
  const htmlProps = usePopoverHeading(props);
  return system.createElement("h1", htmlProps);
});

exports.PopoverHeading = PopoverHeading;
exports.usePopoverHeading = usePopoverHeading;
