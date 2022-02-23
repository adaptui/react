import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useDialogDismiss } from '../dialog/dialog-dismiss.js';

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
const usePopoverDismiss = createHook(props => {
  props = useDialogDismiss(props);
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

const PopoverDismiss = createComponent(props => {
  const htmlProps = usePopoverDismiss(props);
  return createElement("button", htmlProps);
});

export { PopoverDismiss, usePopoverDismiss };
