import { createHook, createComponent, createElement } from 'ariakit-utils/system';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a separator element.
 * @see https://ariakit.org/components/separator
 * @example
 * ```jsx
 * const props = useSeparator({ orientation: "horizontal" });
 * <Role {...props} />
 * ```
 */
const useSeparator = createHook(_ref => {
  let {
    orientation = "horizontal",
    ...props
  } = _ref;
  props = {
    role: "separator",
    "aria-orientation": orientation,
    ...props
  };
  return props;
});
/**
 * A component that renders a separator element.
 * @see https://ariakit.org/components/separator
 * @example
 * ```jsx
 * <Separator orientation="horizontal" />
 * ```
 */

const Separator = createComponent(props => {
  const htmlProps = useSeparator(props);
  return createElement("hr", htmlProps);
});

export { Separator, useSeparator };
