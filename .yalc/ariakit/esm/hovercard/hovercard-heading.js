import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { usePopoverHeading } from '../popover/popover-heading.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a heading element for a hovercard. This hook must
 * be used in a component that's wrapped with `Hovercard` so the
 * `aria-labelledby` prop is properly set on the hovercard element.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * // This component must be wrapped with Hovercard
 * const props = useHovercardHeading();
 * <Role {...props}>Heading</Role>
 * ```
 */
const useHovercardHeading = createHook(props => {
  props = usePopoverHeading(props);
  return props;
});
/**
 * A component that renders a heading in a hovercard. This component must be
 * wrapped with `Hovercard` so the `aria-labelledby` prop is properly set on the
 * hovercard element.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <Hovercard state={hovercard}>
 *   <HovercardHeading>Heading</HovercardHeading>
 * </Hovercard>
 * ```
 */

const HovercardHeading = createComponent(props => {
  const htmlProps = useHovercardHeading(props);
  return createElement("h1", htmlProps);
});

export { HovercardHeading, useHovercardHeading };
