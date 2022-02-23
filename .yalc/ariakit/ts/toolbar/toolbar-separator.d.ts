import { As, Props } from "ariakit-utils/types";
import { CompositeSeparatorOptions } from "../composite/composite-separator";
import { ToolbarState } from "./toolbar-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a separator for toolbar items.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const state = useToolbarState();
 * const props = useToolbarSeparator({ state });
 * <Toolbar state={state}>
 *   <ToolbarItem>Item 1</ToolbarItem>
 *   <Role {...props} />
 *   <ToolbarItem>Item 2</ToolbarItem>
 * </Toolbar>
 * ```
 */
export declare const useToolbarSeparator: import("ariakit-utils/types").Hook<ToolbarSeparatorOptions<"hr">>;
/**
 * A component that renders a separator for toolbar items.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarItem>Item 1</ToolbarItem>
 *   <ToolbarSeparator />
 *   <ToolbarItem>Item 2</ToolbarItem>
 * </Toolbar>
 * ```
 */
export declare const ToolbarSeparator: import("ariakit-utils/types").Component<ToolbarSeparatorOptions<"hr">>;
export declare type ToolbarSeparatorOptions<T extends As = "hr"> = Omit<CompositeSeparatorOptions<T>, "state"> & {
    /**
     * Object returned by the `useToolbarState` hook. If not provided, the parent
     * `Toolbar` component's context will be used.
     */
    state?: ToolbarState;
};
export declare type ToolbarSeparatorProps<T extends As = "hr"> = Props<ToolbarSeparatorOptions<T>>;
