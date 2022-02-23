import { As, Options, Props } from "ariakit-utils/types";
declare type HeadingElements = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
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
export declare const useHeading: import("ariakit-utils/types").Hook<HeadingOptions<HeadingElements>>;
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
export declare const Heading: import("ariakit-utils/types").Component<HeadingOptions<HeadingElements>>;
export declare type HeadingOptions<T extends As = HeadingElements> = Options<T>;
export declare type HeadingProps<T extends As = HeadingElements> = Props<HeadingOptions<T>>;
export {};
