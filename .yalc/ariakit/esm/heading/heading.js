import { useRef, useContext, useMemo } from 'react';
import { useTagName, useForkRef } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { H as HeadingContext } from '../__utils-5a52896b.js';

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
const useHeading = createHook(props => {
  const ref = useRef(null);
  const level = useContext(HeadingContext) || 1;
  const as = "h" + level;
  const tagName = useTagName(ref, props.as || as);
  const isNativeHeading = useMemo(() => !!tagName && /^h\d$/.test(tagName), [tagName]);
  props = {
    as,
    role: !isNativeHeading ? "heading" : undefined,
    "aria-level": !isNativeHeading ? level : undefined,
    ...props,
    ref: useForkRef(ref, props.ref)
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

const Heading = createComponent(props => {
  const htmlProps = useHeading(props);
  return createElement("h1", htmlProps);
});

export { Heading, useHeading };
