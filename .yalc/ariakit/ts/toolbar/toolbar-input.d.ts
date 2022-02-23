import { As, Props } from "ariakit-utils/types";
import { CompositeInputOptions } from "../composite/composite-input";
import { ToolbarItemOptions } from "./toolbar-item";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an input as a toolbar item.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const state = useToolbarState();
 * const props = useToolbarInput({ state });
 * <Toolbar state={state}>
 *   <Role {...props} />
 * </Toolbar>
 * ```
 */
export declare const useToolbarInput: import("ariakit-utils/types").Hook<ToolbarInputOptions<"input">>;
/**
 * A component that renders an input as a toolbar item.
 * @see https://ariakit.org/components/toolbar
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarInput />
 * </Toolbar>
 * ```
 */
export declare const ToolbarInput: import("ariakit-utils/types").Component<ToolbarInputOptions<"input">>;
export declare type ToolbarInputOptions<T extends As = "input"> = Omit<CompositeInputOptions<T>, "state"> & ToolbarItemOptions<T>;
export declare type ToolbarInputProps<T extends As = "input"> = Props<ToolbarInputOptions<T>>;
