import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { usePopoverArrow } from '../popover/popover-arrow.js';

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
const useHovercardArrow = createHook(props => {
  props = usePopoverArrow(props);
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

const HovercardArrow = createComponent(props => {
  const htmlProps = useHovercardArrow(props);
  return createElement("div", htmlProps);
});

export { HovercardArrow, useHovercardArrow };
