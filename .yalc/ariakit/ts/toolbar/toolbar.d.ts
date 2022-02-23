import { As, Props } from "ariakit-utils/types";
import { CompositeOptions } from "../composite/composite";
import { ToolbarState } from "./toolbar-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a toolbar element that groups interactive
 * elements together.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const state = useToolbarState();
 * const props = useToolbar({ state });
 * <Role {...props}>
 *   <ToolbarItem>Item 1</ToolbarItem>
 *   <ToolbarItem>Item 2</ToolbarItem>
 * </Role>
 * ```
 */
export declare const useToolbar: import("ariakit-utils/types").Hook<ToolbarOptions<"div">>;
/**
 * A component that renders a toolbar element that groups interactive elements
 * together.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarItem>Item 1</ToolbarItem>
 *   <ToolbarItem>Item 2</ToolbarItem>
 * </Toolbar>
 * ```
 */
export declare const Toolbar: import("ariakit-utils/types").Component<ToolbarOptions<"div">>;
export declare type ToolbarOptions<T extends As = "div"> = Omit<CompositeOptions<T>, "state"> & {
    /**
     * Object returned by the `useToolbarState` hook.
     */
    state: ToolbarState;
};
export declare type ToolbarProps<T extends As = "div"> = Props<ToolbarOptions<T>>;
