'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');

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
const useSeparator = system.createHook(_ref => {
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

const Separator = system.createComponent(props => {
  const htmlProps = useSeparator(props);
  return system.createElement("hr", htmlProps);
});

exports.Separator = Separator;
exports.useSeparator = useSeparator;
