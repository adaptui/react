import { As, Options, Props } from "ariakit-utils/types";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a group. This hook must be used in a
 * component that's wrapped with `Group` so the `aria-labelledby` prop is
 * properly set on the group element.
 * @see https://ariakit.org/components/group
 * @example
 * ```jsx
 * // This component must be wrapped with Group
 * const props = useGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */
export declare const useGroupLabel: import("ariakit-utils/types").Hook<GroupLabelOptions<"div">>;
/**
 * A component that renders a label in a group. This component must be wrapped
 * with `Group` so the `aria-labelledby` prop is properly set on the group
 * element.
 * @see https://ariakit.org/components/group
 * @example
 * ```jsx
 * <Group>
 *   <GroupLabel>Label</GroupLabel>
 * </Group>
 * ```
 */
export declare const GroupLabel: import("ariakit-utils/types").Component<GroupLabelOptions<"div">>;
export declare type GroupLabelOptions<T extends As = "div"> = Options<T>;
export declare type GroupLabelProps<T extends As = "div"> = Props<GroupLabelOptions<T>>;
