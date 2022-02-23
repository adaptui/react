import { As, Options, Props } from "ariakit-utils/types";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a group element.
 * @see https://ariakit.org/components/group
 * @example
 * ```jsx
 * const props = useGroup();
 * <Role {...props}>Group</Role>
 * ```
 */
export declare const useGroup: import("ariakit-utils/types").Hook<GroupOptions<"div">>;
/**
 * A component that renders a group element.
 * @see https://ariakit.org/components/group
 * @example
 * ```jsx
 * <Group>Group</Group>
 * ```
 */
export declare const Group: import("ariakit-utils/types").Component<GroupOptions<"div">>;
export declare type GroupOptions<T extends As = "div"> = Options<T>;
export declare type GroupProps<T extends As = "div"> = Props<GroupOptions<T>>;
