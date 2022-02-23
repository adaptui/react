import { createHook, createComponent, createElement } from 'ariakit-utils/system';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an abstract element that supports the `as` prop,
 * `children` as a function and a `wrapElement` prop that can be used to wrap
 * the underlying element with React Portal, Context or other component types.
 * @see https://ariakit.org/components/role
 * @example
 * ```jsx
 * const props = useRole();
 * <Role {...props} />
 * ```
 */
const useRole = createHook(props => {
  return props;
});
/**
 * A component that renders an abstract element that supports the `as` prop,
 * `children` as a function and a `wrapElement` prop that can be used to wrap
 * the underlying element with React Portal, Context or other component types.
 * @see https://ariakit.org/components/role
 * @example
 * ```jsx
 * <Role as="div" />
 * ```
 */

const Role = createComponent(props => {
  return createElement("div", props);
});

export { Role, useRole };
