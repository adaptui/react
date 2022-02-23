'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component. When applying the props returned by this hook to a
 * component, the component will be visually hidden, but still accessible to
 * screen readers.
 * @see https://ariakit.org/components/visually-hidden
 * @example
 * ```jsx
 * const props = useVisuallyHidden();
 * <a href="#">
 *   Learn more<Role {...props}> about the Solar System</Role>.
 * </a>
 * ```
 */
const useVisuallyHidden = system.createHook(props => {
  props = { ...props,
    style: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
      ...props.style
    }
  };
  return props;
});
/**
 * A component that renders an element that's visually hidden, but still
 * accessible to screen readers.
 * @see https://ariakit.org/components/visually-hidden
 * @example
 * ```jsx
 * <a href="#">
 *   Learn more<VisuallyHidden> about the Solar System</VisuallyHidden>.
 * </a>
 * ```
 */

const VisuallyHidden = system.createComponent(props => {
  const htmlProps = useVisuallyHidden(props);
  return system.createElement("span", htmlProps);
});

exports.VisuallyHidden = VisuallyHidden;
exports.useVisuallyHidden = useVisuallyHidden;
