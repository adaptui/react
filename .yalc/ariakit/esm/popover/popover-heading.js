import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useDialogHeading } from '../dialog/dialog-heading.js';

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
const usePopoverHeading = createHook(props => {
  props = useDialogHeading(props);
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

const PopoverHeading = createComponent(props => {
  const htmlProps = usePopoverHeading(props);
  return createElement("h1", htmlProps);
});

export { PopoverHeading, usePopoverHeading };
