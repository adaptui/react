'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-701b405e.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a heading element. The element type (or the
 * `aria-level` prop, if the element type is not a native heading) is determined
 * by the context level provided by the parent `HeadingLevel` component.
 * @see https://ariakit.org/components/heading
 * @example
 * ```jsx
 * const props = useHeading();
 * <Role {...props}>Heading</Role>
 * ```
 */
const useHeading = system.createHook(props => {
  const ref = react.useRef(null);
  const level = react.useContext(__utils.HeadingContext) || 1;
  const as = "h" + level;
  const tagName = hooks.useTagName(ref, props.as || as);
  const isNativeHeading = react.useMemo(() => !!tagName && /^h\d$/.test(tagName), [tagName]);
  props = {
    as,
    role: !isNativeHeading ? "heading" : undefined,
    "aria-level": !isNativeHeading ? level : undefined,
    ...props,
    ref: hooks.useForkRef(ref, props.ref)
  };
  return props;
});
/**
 * A component that renders a heading element. The element type (or the
 * `aria-level` prop, if the element type is not a native heading) is determined
 * by the context level provided by the parent `HeadingLevel` component.
 * @see https://ariakit.org/components/heading
 * @example
 * ```jsx
 * <HeadingLevel>
 *   <Heading>Heading 1</Heading>
 *   <HeadingLevel>
 *     <Heading>Heading 2</Heading>
 *   </HeadingLevel>
 * </HeadingLevel>
 * ```
 */

const Heading = system.createComponent(props => {
  const htmlProps = useHeading(props);
  return system.createElement("h1", htmlProps);
});

exports.Heading = Heading;
exports.useHeading = useHeading;
