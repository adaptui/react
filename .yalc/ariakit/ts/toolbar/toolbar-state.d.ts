import { CompositeState, CompositeStateProps } from "../composite/composite-state";
/**
 * Provides state for the `Toolbar` component.
 * @example
 * ```jsx
 * const toolbar = useToolbarState();
 * <Toolbar state={toolbar}>
 *   <ToolbarItem>Item 1</ToolbarItem>
 *   <ToolbarItem>Item 2</ToolbarItem>
 *   <ToolbarItem>Item 3</ToolbarItem>
 * </Toolbar>
 * ```
 */
export declare function useToolbarState({ orientation, focusLoop, ...props }?: ToolbarStateProps): ToolbarState;
export declare type ToolbarState = CompositeState;
export declare type ToolbarStateProps = CompositeStateProps;
