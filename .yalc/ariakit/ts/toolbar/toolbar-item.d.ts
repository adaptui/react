import { As, Props } from "ariakit-utils/types";
import { CompositeItemOptions } from "../composite/composite-item";
import { ToolbarState } from "./toolbar-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an interactive element in a toolbar.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const state = useToolbarState();
 * const props = useToolbarItem({ state });
 * <Toolbar state={state}>
 *   <Role {...props}>Item</Role>
 * </Toolbar>
 * ```
 */
export declare const useToolbarItem: import("ariakit-utils/types").Hook<ToolbarItemOptions<"button">>;
/**
 * A component that renders an interactive element in a toolbar.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarItem>Item</ToolbarItem>
 * </Toolbar>
 * ```
 */
export declare const ToolbarItem: import("ariakit-utils/types").Component<ToolbarItemOptions<"button">>;
export declare type ToolbarItemOptions<T extends As = "button"> = Omit<CompositeItemOptions<T>, "state"> & {
    /**
     * Object returned by the `useToolbarState` hook. If not provided, the parent
     * `Toolbar` component's context will be used.
     */
    state?: ToolbarState;
};
export declare type ToolbarItemProps<T extends As = "button"> = Props<ToolbarItemOptions<T>>;
