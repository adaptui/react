import { As, Options, Props } from "ariakit-utils/types";
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
export declare const useSeparator: import("ariakit-utils/types").Hook<SeparatorOptions<"hr">>;
/**
 * A component that renders a separator element.
 * @see https://ariakit.org/components/separator
 * @example
 * ```jsx
 * <Separator orientation="horizontal" />
 * ```
 */
export declare const Separator: import("ariakit-utils/types").Component<SeparatorOptions<"hr">>;
export declare type SeparatorOptions<T extends As = "hr"> = Options<T> & {
    /**
     * The orientation of the separator.
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical";
};
export declare type SeparatorProps<T extends As = "hr"> = Props<SeparatorOptions<T>>;
