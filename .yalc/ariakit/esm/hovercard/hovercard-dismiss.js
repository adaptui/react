import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { usePopoverDismiss } from '../popover/popover-dismiss.js';

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
const useHovercardDismiss = createHook(props => {
  props = usePopoverDismiss(props);
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

const HovercardDismiss = createComponent(props => {
  const htmlProps = useHovercardDismiss(props);
  return createElement("button", htmlProps);
});

export { HovercardDismiss, useHovercardDismiss };
