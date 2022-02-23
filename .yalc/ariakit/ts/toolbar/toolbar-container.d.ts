import { As, Props } from "ariakit-utils/types";
import { CompositeContainerOptions } from "../composite/composite-container";
import { ToolbarItemOptions } from "./toolbar-item";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a container for interactive widgets inside
 * toolbar items.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const state = useToolbarState();
 * const props = useToolbarContainer({ state });
 * <Toolbar state={state}>
 *   <Role {...props}>
 *     <input type="text" />
 *   </Role>
 * </Toolbar>
 * ```
 */
export declare const useToolbarContainer: import("ariakit-utils/types").Hook<ToolbarContainerOptions<"div">>;
/**
 * A component that renders a container for interactive widgets inside toolbar
 * items.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarContainer>
 *     <input type="text" />
 *   </ToolbarContainer>
 * </Toolbar>
 * ```
 */
export declare const ToolbarContainer: import("ariakit-utils/types").Component<ToolbarContainerOptions<"div">>;
export declare type ToolbarContainerOptions<T extends As = "div"> = Omit<CompositeContainerOptions<T>, "state"> & ToolbarItemOptions<T>;
export declare type ToolbarContainerProps<T extends As = "div"> = Props<ToolbarContainerOptions<T>>;
